import React, { useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { useLocation, useNavigate } from "react-router-dom";
import { MAIN_IMAG_URL, updateBannerLogo } from "../api";
import UploadingImage from "./uploading/UploadingImage";

function EditBannerLogo() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // --------------------------------------------
  const [formData, setFormData] = useState({ preview: "" });
  // -----------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formDataFields = new FormData();

      if (image) {
        formDataFields.append("mainImgaeLink", image);
      }
      formDataFields.append("_id", formData._id);
      const response = await updateBannerLogo(formDataFields);
      setFormData({ preview: response?.data?.result?.mainImgaeLink });

      successToast("Updated");
      navigate("/admin/view-banner-client");
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
      } else {
        errorToast("An error occurred during login.");
      }
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    setFormData({ ...state, preview: "" });
    setImage(state?.mainImgaeLink);
  }, [state]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="px-4 flex-1">
        <div className="flex gap-3 items-center">
          <div className="w-[300px] h-[150px]  rounded-[20px]">
            <img
              src={
                formData.preview
                  ? formData.preview
                  : image
                  ? `${MAIN_IMAG_URL}/${image}`
                  : PlaceHolder
              }
              alt="placeholder"
              className=" w-full h-full object-cover "
            />
          </div>
          <div className="">
            <UploadingImage
              onError={(error) => {
                errorToast(error);
              }}
              previewUrl={(e) => {
                setFormData({ ...formData, preview: e });
              }}
              selectedFile={(file) => setImage(file)}
            />
          </div>
        </div>

        <div className="p-3 poppins-semibold text-lg">
          <button
            disabled={isLoading}
            type="submit"
            className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditBannerLogo;

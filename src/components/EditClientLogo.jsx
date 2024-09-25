import React, { useRef, useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { useLocation, useNavigate } from "react-router-dom";
import { MAIN_IMAG_URL, updateClientLogo } from "../api";
import UploadingImage from "./uploading/UploadingImage";

function EditClientLogo() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // --------------------------------------------
  const uploadImage = useRef(null);
  const [image, setImage] = useState("");
  // --------------------------------------------
  const [formData, setFormData] = useState({ preview: "" });
  //------------------------------------------------------------------
  const uploadImageButton = () => uploadImage.current.click();
  // -----------------------------------------------------------------

  // -----------------------------------------------
  const hanldeUploading = (e) => {
    const file = e.target.files;
    if (file.length > 0) {
      const [selectedFile] = file;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const srcData = fileReader.result;
        setFormData({ ...formData, mainImgaeLink: srcData });
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  // -------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formDataFields = new FormData();

      if (image) {
        formDataFields.append("mainImgaeLink", image);
      }
      formDataFields.append("_id", formData._id);
      const response = await updateClientLogo(formDataFields);
      setFormData({ preview: response?.data?.result?.mainImgaeLink });
      successToast("Updated");
      navigate("/admin/view-client");
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
      } else {
        errorToast("An error occurred during login.");
      }
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
              className=" w-full h-full object-contain "
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
          <div className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
            <button type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditClientLogo;

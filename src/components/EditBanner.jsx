import React, { useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editBannerSuccess, setLoading } from "../features/bannerSlice";
import { MAIN_IMAG_URL, updateBanner } from "../api";
import { setError } from "../features/propertiesSlice";
import { CiCircleRemove } from "react-icons/ci";
import UploadingImage from "./uploading/UploadingImage";

function EditBanner() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  // --------------------------------------------

  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    bannerHeadline: "",
    bannerSubtext: "",
    buttonText: "",
    buttonLink: "",
    preview: "",
  });
  const [image, setImage] = useState("");
  // -----------------------------------------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };

  // -------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formDataFields = new FormData();
      formDataFields.append("bannerSubtext", formData.bannerSubtext);
      formDataFields.append("buttonText", formData.buttonText);
      formDataFields.append("bannerHeadline", formData.bannerHeadline);
      if (image) {
        formDataFields.append("mainImgaeLink", image);
      }
      formDataFields.append("_id", formData._id);

      dispatch(setLoading());
      const response = await updateBanner(formDataFields);
      dispatch(editBannerSuccess());
      setFormData({ ...response?.data?.result });
      successToast("Updated");
      navigate("/admin/edit-banners");
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response.data.message);
      } else {
        dispatch(setError("An error occurred during login."));
        errorToast("An error occurred during login.");
      }
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    setFormData({ ...state });
    setImage(state.mainImgaeLink);
  }, [state]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="flex-1">
        {/* Banner Headline */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="bannerHeadline"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Banner Headline
          </label>
          <input
          disabled={isLoading}
            autoComplete=""
            value={formData.bannerHeadline}
            name="bannerHeadline"
            onChange={handleChange}
            type="text"
            id="bannerHeadline"
            placeholder="Find Your Dream Home Today"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Banner Subtext */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="bannerSubtext"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Banner Subtext
          </label>
          <input
          disabled={isLoading}
            autoComplete=""
            name="bannerSubtext"
            value={formData.bannerSubtext}
            onChange={handleChange}
            type="text"
            id="bannerSubtext"
            placeholder="Explore our curated collection of exquisite properties for sale and discover the perfect place to call home."
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Button Text */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="buttonText"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Button Text
          </label>
          <input
          disabled={isLoading}
            autoComplete=""
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            type="text"
            id="buttonText"
            placeholder="View All Propreties"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>
      </div>

      <div className="px-4 flex-1">
        {/*  Main image */}
        <h1 className="mb-3 text-4xl sf-medium font-medium">Media</h1>
        <h2 className="sf-medium text-sm mb-3">Main Image</h2>
        <div className="flex gap-3 items-center">
          <div className="w-80 h-64 relative  rounded-[20px] overflow-hidden">
            <img
              src={
                formData.preview
                  ? formData.preview
                  : image
                  ? `${MAIN_IMAG_URL}/${image}`
                  : PlaceHolder
              }
              alt="placeholder"
              className="w-full h-full object-cover "
            />
            {formData.preview && (
              <span
                onClick={removeImage}
                className=" absolute top-2 left-3  cursor-pointer"
              >
                {" "}
                <CiCircleRemove className="text-red-600 " size={24} />{" "}
              </span>
            )}
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

        {/* submit */}
        <div className="p-3 poppins-semibold text-lg">
          <button disabled={isLoading} type="submit" className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditBanner;

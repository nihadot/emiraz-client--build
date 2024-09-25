import { useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { addingClientLogo } from "../api";
import UploadingImage from "./uploading/UploadingImage";
function AddClientLogo() {
  // --------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  // --------------------------------------------

  // -----------------------------------------------------
  const [formData, setFormData] = useState({ preview: "" });
  // -----------------------------------------------------

  // -------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formDataFields = new FormData();

      if (image) {
        formDataFields.append("mainImgaeLink", image);
      }

      await addingClientLogo(formDataFields);
      successToast("Successfully added");
      setImage("");
      setFormData({ preview: "" });
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
        setIsLoading(false);
      } else {
        errorToast("An error occurred during login.");
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap ">
      <div className="px-4 flex-1">
        <div className="flex gap-3 items-center">
          <div className="w-[300px] h-[150px]  rounded-[20px]">
            <img
              src={formData.preview || PlaceHolder}
              alt="placeholder"
              className=" w-full h-full object-cover "
            />
          </div>
          <div className="">
            <UploadingImage
              isLoading={isLoading}
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

export default AddClientLogo;

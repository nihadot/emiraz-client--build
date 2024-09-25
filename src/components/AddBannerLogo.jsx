import { useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { addingBannerLogo } from "../api";
import UploadingImage from "./uploading/UploadingImage";
import { CiCircleRemove } from "react-icons/ci";
function AddBannerLogo() {
  // --------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  // --------------------------------------------
  const [formData,setFormData] = useState({preview:""})
  const [image, setImage] = useState("");
  // -----------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const formDataFields = new FormData();

      if (image) {
        formDataFields.append("mainImgaeLink", image);
      }

      await addingBannerLogo(formDataFields);
      successToast("Successfully added");
      setImage('')
      setFormData({preview:""})
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

  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap ">
      <div className="px-4 flex-1">
        <div className="flex gap-3 items-center">
          <div className="relative w-[300px] h-[150px]  rounded-[20px]">
            <img
              src={formData.preview || PlaceHolder}
              alt="placeholder"
              className=" w-full h-full rounded-[20px] object-cover "
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
          <button disabled={isLoading} type="submit" className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
            
              { isLoading ? 'loding...' : 'Save'}
            
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddBannerLogo;

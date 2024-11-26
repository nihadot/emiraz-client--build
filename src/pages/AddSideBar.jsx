import { useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import UploadingImage from "../components/uploading/UploadingImage";
import { CiCircleRemove } from "react-icons/ci";
import { addSideBanner } from "../api";
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "../api/localstorage-varibles";
import axios from "axios";
function AddSideBar() {
  // --------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  // --------------------------------------------
  const [formData, setFormData] = useState({ preview: "" });
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  // -----------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      let data = {};

      if(!name){
        errorToast("Please enter a name");
        return;
      }
      if(!image){
        errorToast("Please select an image");
        return;
      }

      data.name = name;


        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", CLOUDINARY_PERSISTENT); // Replace with your actual preset
        formData.append("folder", "city_images"); // Replace with your specific folder name
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,formData);
        const imageFile = {
          public_id : response.data.public_id,
          secure_url : response.data.secure_url,
          url : response.data.url,
          bytes : response.data.bytes,
          width : response.data.width,
          height : response.data.height,
        }
        data.imageFile = imageFile;



        await addSideBanner(data);
      successToast("Successfully added");
      setImage("");
      setName("")
      setTitle("")
      setFormData({ preview: "" });
      setIsLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error?.message || "An error occurred during the operation.";
      errorToast(errorMsg);
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap ">
      <div className="px-4 flex-1">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Add Side Banner</h1>
        </div>
        <div className="flex gap-3 items-center">

        <div className="">
            {/* name */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="name"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Name
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            type="text"
            id="name"
            placeholder="Name"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>



          {/* title */}
          {/* <div className="flex flex-col mt-3 gap-2 mx-3">
          <label
            htmlFor="title"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Title
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Title"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div> */}
        </div>

          <div className="w-[338px] h-[670px] relative ">
            <img
              src={formData.preview || PlaceHolder}
              alt="placeholder"
              className=" w-full h-full object-cover "
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
          <button
            disabled={isLoading}
            type="submit"
            className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer"
          >
            {isLoading ? "loding..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddSideBar;

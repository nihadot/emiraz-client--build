import React, { useRef, useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editBlogSuccess, setError, setLoading } from "../features/blogSlice";
import { MAIN_IMAG_URL, updateBlog } from "../api";
import { CiCircleRemove } from "react-icons/ci";
import UploadingImage from "./uploading/UploadingImage";

function EditBlogPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);

  // --------------------------------------------

  const [image, setImage] = useState("");
  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogBody: "",
    preview: "",
    date: "",
  });
  // -----------------------------------------------------
  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };
  //------------------------------------------------------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // -------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true)
      const formDataFields = new FormData();
      formDataFields.append("blogTitle", formData.blogTitle);
      formDataFields.append("blogBody", formData.blogBody);
      formDataFields.append("date", formData.date);

      if (image) {
        formDataFields.append("mainImgaeLink", image);
      }

      formDataFields.append("_id", formData._id);
      dispatch(setLoading());
      await updateBlog(formDataFields);
      dispatch(editBlogSuccess());
      successToast("Updated");
      navigate("/admin/edit-blogs");
      setIsLoading(false)
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response.data.message);
      } else {
        dispatch(setError("An error occurred during login."));
        errorToast("An error occurred during login.");
      }
      setIsLoading(false)
    }
  };

  React.useEffect(() => {
    setFormData({ ...state });
    setImage(state.mainImgaeLink);
  }, [state]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="flex-1">
        {/* Blog title */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="blogTitle"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Blog Title
          </label>
          <input
          disabled={isLoading}
            autoComplete=""
            value={formData.blogTitle}
            name="blogTitle"
            onChange={handleChange}
            type="text"
            id="blogTitle"
            placeholder="Discover the Essence of Luxury Living: Your Guide to Dubai Real Estate"
            title="Blog title"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="date"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Date
          </label>
          <input
          disabled={isLoading}
            autoComplete=""
            value={formData.date}
            defaultValue={formData.date}
            name="date"
            onChange={handleChange}
            type="date"
            id="date"
            title="Date"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Blog Body */}
        <div className="flex flex-col gap-2 mx-3 mt-3">
          <label
            htmlFor="blogBody"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Price (From in AED)
          </label>
          <textarea
          disabled={isLoading}
            name="blogBody"
            onChange={handleChange}
            value={formData.blogBody}
            id="blogBody"
            cols="30"
            rows="20"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
            placeholder="Wake up to the beauty of lush landscapes and elite golf courses, with the majestic Burj Khalifa and Dubai’s skyline painting the perfect morning scene at Parkside Hills. This premier living destination encapsulates the ideal blend of nature’s tranquility and the pulse of city life, fostering a community that values both unity and privacy. With a selection of 1-3 bedroom apartments that align with the luxurious lifestyle of Dubai Hills Estate, Parkside Hills apartments epitomizes smart living infused with elegance. Situated in the picturesque Dubai Hills Estate, Parkside Hills is synonymous with refined living, integrating innovative design with classic sophistication to suit a modern lifestyle. At its core, the community thrives on a plethora of amenities, ranging from top-tier health and education services to leisure, wellness, and shopping conveniences, all within easy reach, ensuring a life marked by luxury and convenience.
                Investors and future residents looking at Parkside Hills apartments for sale near Dubai are presented with an enticing investment opportunity. With Dubai Hills Estate’s high demand and Emaar’s reputation for quality developments, Parkside Hills offers potential for substantial ROI. Its coveted location and Emaar’s renowned quality promise both capital appreciation and lucrative rental yields for years to come.                         "
          ></textarea>
        </div>
      </div>

      <div className="px-4 flex-1">
        {/*  Main image */}
        <h1 className="mb-3 text-4xl font-medium sf-medium">Media</h1>
        <h2 className="sf-medium font-medium text-sm mb-3">Main Image</h2>
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
          <button type="submit" disabled={isLoading} className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
            { isLoading ? 'loading...' :'Save'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditBlogPage;

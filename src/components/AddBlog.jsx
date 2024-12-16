import { useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { addingBlog } from "../api";
import { CiCircleRemove } from "react-icons/ci";
import UploadingImage from "./uploading/UploadingImage";
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "../api/localstorage-varibles";
import axios from "axios";
import Markdown from 'react-markdown'

function AddBlog() {
  // const { isLoading } = useSelector((state) => state.blog);
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  // --------------------------------------------

  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogBody: "",
    preview: "",
    date: "",
    metaTitle:"",
    metaDescription : "",
    metaKeywords:"",
  });
  // -----------------------------------------------------

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // -------------------------------------------------

  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();


      if(!formData.blogTitle){
        errorToast("Please enter a blog title");
        return false;
      }

      if(!formData.blogBody){
        errorToast("Please enter a blog body");
        return false;
      }

      if(!formData.date){
        errorToast("Please enter a date");
        return false;
      }

      if(!image){
        errorToast("Please select an image");
        return false;
      }
      setLoading(true);

      const data = {
        blogTitle: formData.blogTitle,
        blogBody: formData.blogBody,
        date: formData.date,
        imageFile: image,
        metaDescription:formData.metaDescription,
        metaTitle:formData.metaTitle,
        metaKeywords:formData.metaKeywords
      }

      if(image){
        // if (values.image) {
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
        //  } 
      }


     

      await addingBlog(data);
      successToast("Successfully added");
      setFormData({
        blogBody: "",
        blogTitle: "",
        date: "",
        preview: "",
      });
      setLoading(false);
    } catch (error) {
      errorToast(
        error.response.data.message ||
          error.message ||
          "An error occurred during login."
      );
      setLoading(false);
    }
  };

  const markdown = '# Hi, *Pluto*!'
  const [toggleBlogBody,setToggleBlogBody] =useState(false);
  const handleToggleBlogBody = ()=>{
    setToggleBlogBody(prev => !prev );
  }

  return (
    <form onSubmit={handleSubmit} className="flex relative flex-wrap">
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



             {/* Blog Meta Title */}
             <div className="flex flex-col gap-2 my-3 mx-3">
          <label
            htmlFor="metaTitle"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Blog Meta Title
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            value={formData.metaTitle}
            name="metaTitle"
            onChange={handleChange}
            type="text"
            id="metaTitle"
            placeholder="Blog meta title"
            title="Meta Title"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>





          {/* Blog Meta Description */}
          <div className="flex flex-col gap-2 my-3 mx-3">
          <label
            htmlFor="metaDescription"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Blog Meta Description
          </label>
          {/* <input
            disabled={isLoading}
            autoComplete=""
            value={formData.metaDescription}
            name="metaDescription"
            onChange={handleChange}
            type="text"
            id="metaDescription"
            placeholder="Blog meta description"
            title="Meta Title"
            className="border border-[#E4E4E4] py-4 h-[100px] px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          /> */}
           <textarea
            disabled={isLoading}
            name="metaDescription"
            onChange={handleChange}
            value={formData.metaDescription}
            id="metaDescription"
            cols="30"
            rows="10"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
            placeholder="Blog meta description"
          ></textarea>
        </div>


   {/* Blog Meta Keywords */}
   <div className="flex flex-col gap-2 my-3 mx-3">
          <label
            htmlFor="metaKeywords"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Blog Meta Keywords
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            value={formData.metaKeywords}
            name="metaKeywords"
            onChange={handleChange}
            type="text"
            id="metaKeywords"
            placeholder="Blog meta keywords"
            title="Meta Keywords"
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
            name="date"
            onChange={handleChange}
            type="date"
            id="date"
            title="Date"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Blog Body */}
        <div className="flex flex-col  gap-2 mx-3 mt-3">
          <label
            htmlFor="blogBody"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Blog Body
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
  <label htmlFor="" onClick={handleToggleBlogBody} className="bg-black px-8 flex mb-4 capitalize w-fit py-2 rounded text-white" >{ toggleBlogBody ? 'Close markup' : 'Open markup'}</label>



{ (formData?.blogBody?.length > 0 && toggleBlogBody ) && <div className="absolute prose lg:prose-xl z-50 w-1/2 border-[#E4E4E4] border overflow-auto max-h-[48vh] h-full py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666] bg-white  outline-none top-[680px] break-words right-0">
  <label htmlFor="" onClick={handleToggleBlogBody} className="bg-black px-8 flex mb-4 capitalize w-fit py-2 rounded text-white" >close</label>
        <Markdown
        >
          

          {formData.blogBody}
        </Markdown>
        </div>}

          
        </div>



       
      </div>

      <div className="px-4 flex-1">
        {/*  Main image */}
        <h1 className="mb-3 text-4xl font-medium sf-medium">Media</h1>
        <h2 className="sf-medium font-medium text-sm mb-3">Main Image</h2>
        <div className="flex gap-3 items-center">
          <div className="w-80 h-64 relative  rounded-[20px] overflow-hidden">
            <img
              src={formData.preview || PlaceHolder}
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
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddBlog;

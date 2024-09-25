import React, { useEffect, useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { addingDeveloper, fetchDevelopersPrioritesAPI, fetchPriority } from "../api";
import { setError, setLoading } from "../features/citiesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown, FaAngleUp, FaEye, FaEyeSlash } from "react-icons/fa";
import { addDeveloperSuccess } from "../features/developerSlice";
import { CiCircleRemove } from "react-icons/ci";
import UploadingImage from "./uploading/UploadingImage";
import Lazyloading from "./Lazyloading/Lazyloading";

function AddDevelopers() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.developer);

  const [visible, setVisible] = React.useState("password");
  const [image, setImage] = useState("");
  const [priority, setPriority] = useState(false);
  const [priorityCount,setPriorityCount] = useState([]);
  // --------------------------------------------
  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    developerName: "",
    contactNumber: "",
    username: "",
    password: "",
    priority:"",
    preview: "",
  });

  useEffect(()=>{
    fetchdata()
  },[])

  const fetchdata =async ()=>{
    try {
      const fetchPriorityResponse = await fetchDevelopersPrioritesAPI();
      setPriorityCount(fetchPriorityResponse.result)
    } catch (error) {
      errorToast(error.response.data.message || error.message || "error occur");
    }
  }
  // -----------------------------------------------------
  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // -------------------------------------------------

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formDataFields = new FormData();
      formDataFields.append("developerName", formData.developerName);
      formDataFields.append("contactNumber", formData.contactNumber);
      formDataFields.append("username", formData.username);
      formDataFields.append("password", formData.password);
      formDataFields.append("priority", formData.priority);

      if (image) {
        formDataFields.append("mainImgaeLink", image);
      }
      dispatch(setLoading());
      await addingDeveloper(formDataFields);
      dispatch(addDeveloperSuccess());
      successToast("Successfully added");
      setFormData({
        contactNumber: "",
        developerName: "",
        username: "",
        mainImgaeLink: "",
        password: "",
        priority:""
      });
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response.data.message);
      } else {
        dispatch(setError("An error occurred during login."));
        errorToast("An error occurred during login.");
      }
    }
  };

  const priorityList = [1,2,3,4,5,6,7,8,9,10,11,12];


  const handlePriority = (prioty) =>{
    setPriority(!priority);
    setFormData({ ...formData, priority: prioty });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="flex-1">
        {/* Developer Name */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="developerName"
            className="font-medium sf-medium text-sm text-[#000000]"
          >
            Developer Name
          </label>
          <input
            disabled={isLoading}
            autoComplete="name"
            value={formData.developerName}
            name="developerName"
            onChange={handleChange}
            type="text"
            id="developerName"
            placeholder="Name"
            title="Developer Name"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Developer USERNAME */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="username"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            User Name
          </label>
          <input
            disabled={isLoading}
            autoComplete="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            id="username"
            placeholder="Username"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal  font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Password */}
        <div className="relative flex flex-col gap-2 mt-3 mx-3">
          <label
            htmlFor="password"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Password
          </label>
          <input
            disabled={isLoading}
            name="password"
            onChange={handleChange}
            value={FormData.password}
            autoComplete="current-password"
            type={visible}
            id="password"
            placeholder="Enter your Password"
            className="border border-[#E4E4E4] py-4 ps-5 pe-16 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
          <div className="absolute right-7   top-11">
            {visible === "password" ? (
              <FaEye size={20} onClick={() => setVisible("text")} />
            ) : (
              <FaEyeSlash size={20} onClick={() => setVisible("password")} />
            )}
          </div>
        </div>

        {/* Contact Number */}
        {/* <div className="flex flex-col gap-2 mt-3 mx-3">
          <label
            htmlFor="contactNumber"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Contact Number
          </label>
          <input
            disabled={isLoading}
            autoComplete="cc-number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            type="number"
            id="contactNumber"
            placeholder="Contact Number"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div> */}



        {/* Priority */}
        <div className="flex flex-col gap-2 mx-3 relative">
          <label
            htmlFor="priority"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Priority
          </label>
          <div
            onClick={() => setPriority(!priority)}
            className="flex cursor-pointer border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          >
            <span>{formData.priority ? formData.priority : "Select anyone"}</span>
            <span className="absolute right-5 top-12">
              {priority ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </div>
          {priority && (
            <div className="z-20 absolute rounded-[10px] top-24 bg-white w-full border p-3">
              {priorityList &&
                priorityList.map((item, i) => (
                  priorityCount && priorityCount?.find((i)=> parseInt(i) === parseInt(item) )  ? <p
                  key={i}
                  
                  className="cursor-not-allowed py-1 text-red-400"
                >
                  {item} Not available
                </p> :
                 <p
                 key={i}
                 onClick={() => handlePriority(item)}
                 className="py-1 cursor-pointer"
               >
                 {item}
               </p>
                ))}
            </div>
          )}
        </div>
      </div>



        

      <div className="px-4 flex-1">
        {/*  Main image */}
        <h1 className="mb-3 text-4xl font-medium sf-medium">Media</h1>
        <h2 className="sf-medium font-medium text-sm mb-3">Main Image</h2>
        <div className="flex gap-3 items-center">
          <div className=" flex justify-center items-center relative  rounded-[20px] overflow-hidden lg:h-[252px] sm:w-[180px] h-[172px]  lg:w-[264px]">
            <Lazyloading
              src={formData.preview || PlaceHolder}
              alt="placeholder"
              className={"my-10 object-cover"}
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
            {isLoading ? 'loading...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddDevelopers;

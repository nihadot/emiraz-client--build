import React, { useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  editDeveloperSuccess,
  setError,
  setLoading,
} from "../features/developerSlice";
import { MAIN_IMAG_URL, deletePriorityByIdMatching, fetchDevelopersPrioritesAPI, updateDeveloper } from "../api";
import { FaAngleDown, FaAngleUp, FaEye, FaEyeSlash } from "react-icons/fa";
import UploadingImage from "./uploading/UploadingImage";
import { CiCircleRemove } from "react-icons/ci";

function EditDeveloperPage() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [priority, setPriority] = useState(false);
  // --------------------------------------------

  const [image, setImage] = useState("");

  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    contactNumber: "",
    developerName: "",
    preview: "",
    username: "",
    priority:"",
    password: "",
  });
  // -----------------------------------------------------
  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // -------------------------------------------------

  const [visible, setVisible] = React.useState("password");
  const [priorityCount,setPriorityCount] = useState([]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formDataFields = new FormData();
      formDataFields.append("developerName", formData.developerName);
      formDataFields.append("contactNumber", formData.contactNumber);
      formDataFields.append("username", formData.username);
      formDataFields.append("password", formData.password);
      formDataFields.append("priority", formData.priority);

      if (image) {
        formDataFields.append("mainImgaeLink", image);
      }
      formDataFields.append("_id", formData._id);

      dispatch(setLoading());
      await updateDeveloper(formDataFields);
      dispatch(editDeveloperSuccess());
      successToast("Updated");
      navigate("/admin/developers");
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
    fetchData()
  }, [state]);

  const fetchData =async ()=>{
    try {
      const fetchPriorityResponse = await fetchDevelopersPrioritesAPI();
      setPriorityCount(fetchPriorityResponse.result)
    } catch (error) {
      errorToast(error.response.data.message || error.message || "error occur");
    }
  }


  const priorityList = [1,2,3,4,5,6,7,8,9,10,11,12];

  const handlePriority = (prioty) =>{
    setPriority(!priority);
    setFormData({ ...formData, priority: prioty });
  }

  const deletePriority = async(id)=>{
    
    try {

      const status = window.confirm("Are you want to delete this?")
      if(status){
        await deletePriorityByIdMatching(id,'developer');
        successToast('Deleted')
        navigate(`/admin/developers`)
      }
      
    } catch (error) {
      errorToast(error.response.data.message || error.message || "error occur");
    }
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="flex-1">
        {/* Developer Name */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="developerName"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Proprety Headline
          </label>
          <input
            autoComplete="name"
            value={formData.developerName}
            name="developerName"
            onChange={handleChange}
            type="text"
            id="developerName"
            placeholder="Name"
            title="Developer Name"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="Username"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            User Name
          </label>
          <input
            autoComplete="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            id="username"
            placeholder="Username"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
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
            name="password"
            onChange={handleChange}
            value={FormData.password}
            autoComplete="current-password"
            type={visible}
            id="password"
            placeholder="Enter your Password"
            className="border border-[#E4E4E4] font-extralight py-4 ps-5 pe-16 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none"
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
            autoComplete="cc-number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            type="number"
            id="contactNumber"
            placeholder="Contact Number"
            className="border border-[#E4E4E4] font-extralight py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none"
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

              { formData.priority &&  <label
          onClick={()=>deletePriority(formData._id)}
            htmlFor="delte"
            className="sf-medium cursor-pointer font-medium text-sm text-red-500"
          >
            delete
          </label>}
          </div>
      </div>

      <div className="px-4 flex-1">
        {/*  Main image */}
        <h1 className="mb-3 text-4xl font-medium sf-medium">Media</h1>
        <h2 className="sf-medium font-medium text-sm mb-3">Main Image</h2>
        <div className="flex gap-3 items-center">
          <div className="w-80 h-64 relative flex justify-center items-center  rounded-[20px] overflow-hidden">
            <img
              src={
                formData.preview
                  ? formData.preview
                  : image
                  ? `${MAIN_IMAG_URL}/${image}`
                  : PlaceHolder
              }
              alt="placeholder"
              className="object-cover"
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
          <button
            disabled={isLoading}
            type="submit"
            className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer"
          >
            {isLoading ? "loading..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditDeveloperPage;

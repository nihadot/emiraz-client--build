import { useEffect, useRef, useState } from "react";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { addingCity, fetchCityPrioritesAPI, fetchDevelopersPrioritesAPI } from "../api";
import {
  addCitiesSuccess,
  setError,
  setLoading,
} from "../features/citiesSlice";
import { useDispatch, useSelector } from "react-redux";
import UploadingImage from "./uploading/UploadingImage";
import { CiCircleRemove } from "react-icons/ci";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function AddCity() {
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false);
  // --------------------------------------------
  const [image, setImage] = useState("");
  const [priority, setPriority] = useState(false);
  const [priorityCount,setPriorityCount] = useState([]);
  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    cityName: "",
    emirateName: "",
    priority:"",
    preview: "",
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true)
        const formDataFields = new FormData();
        formDataFields.append("cityName", formData.cityName);
        formDataFields.append("emirateName", formData.emirateName);
      formDataFields.append("priority", formData.priority);

  
        if (image) {
          formDataFields.append("mainImgaeLink", image);
        }
  
      dispatch(setLoading());

      await addingCity(formDataFields);
      dispatch(addCitiesSuccess());
      successToast("Successfully added");
      setFormData({ cityName: "", emirateName: "", mainImgaeLink: "",priority:"" });
      setImage("")
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

  const priorityList = [1,2,3,4,5,6,7,8,9,10,11,12];

  const handlePriority = (prioty) =>{
    setPriority(!priority);
    setFormData({ ...formData, priority: prioty });
  }

  useEffect(()=>{
    fetchdata()
  },[])

  const fetchdata =async ()=>{
    try {
      const fetchPriorityResponse = await fetchCityPrioritesAPI();
      setPriorityCount(fetchPriorityResponse.result)
    } catch (error) {
      errorToast(error.response.data.message || error.message || "error occur");
    }
  }



  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="flex-1">
        {/* City Name */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="cityName"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            City Name
          </label>
          <input
            disabled={isLoading}
            autoComplete="name"
            value={formData.cityName}
            name="cityName"
            onChange={handleChange}
            type="text"
            id="cityName"
            placeholder="Down Town"
            title="City Name"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Emirate Name */}
        <div className="flex mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="emirateName"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Emirate Name
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            name="emirateName"
            value={formData.emirateName}
            onChange={handleChange}
            type="text"
            id="emirateName"
            placeholder="Dubai"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>



          {/* Priority */}
          <div className="flex mt-3 flex-col gap-2 mx-3 relative">
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
          <button disabled={isLoading} type="submit" className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
            
              { isLoading ? 'loading...' :  'Save'}
            
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddCity;

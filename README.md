import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addPropertySuccess,
  setError,
  setLoading,
} from "../features/propertiesSlice";
import {
  addingPropertyAPI,
  fetchNotavailbeSidebar,
  fetchPriority,
  fetchPropertyTypeAPI,
  fetchSideBanners,
  getCities,
  getDevelopers,
} from "../api";
import { fetchCities } from "../features/citiesSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { fetchDevelopers } from "../features/developerSlice";
import { CiCircleRemove } from "react-icons/ci";
import UploadingImage from "./uploading/UploadingImage";

function AddProperties() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.property);
  const { data } = useSelector((state) => state.city);
  const { developers } = useSelector((state) => state.developer);
  const animatedComponents = makeAnimated();
  const [propertyType, setPropertyType] = useState([]);
  const [image, setImage] = useState("");
  const [priorityCount,setPriorityCount] = useState([]);
  const [notAvailableSidebarIds,setNotAvailableSidebarIds] = useState([]);
  // --------------------------------------------
  const uploadSmallImage = useRef(null);
  const frameOfLocation = useRef(null);
  const frameOfVideo = useRef(null);
  // --------------------------------------------
  const [isChecked, setIsChecked] = useState(false);
  const [refresh, setrefresh] = useState(false);
  
  // ------------------------------------------
  const [optionsDeveloper, setOptionsDeveloper] = useState(false);
  const [optionsCities, setOptionsCities] = useState([]);
  const [sidebar,setSidebar] = useState([]);
  const [OptionsAdsStatus,setOptionsAdsStatus] = useState(false);

  // ------------------------------------------

  // ------------------------------------------------------
  const [dynamicFacilitiesForm, setDynamicFacilitiesForm] = useState([]);
  const [dynamicAreasNearBy, setDynamicAreasNearBy] = useState([]);
  const [dynamicPaymentPlan, setDynamicPaymentPlan] = useState([]);
  // ------------------------------------------------------

  // ---------------------------------------------------
  const [smallImage, setSmallImage] = useState([]);
  // ---------------------------------------------------
  const [priority, setPriority] = useState(false);
const [selectedFiles, setSelectedFiles] = useState([]);
   // Function to handle file selection
   const handleFileSelect = (event) => {
    const filesArray = Array.from(event.target.files);
    const validFiles = filesArray.filter(file => file.size <= 1024 * 1024); // 1MB in bytes

    setSelectedFiles([...selectedFiles, ...validFiles]);
    
    // Optionally, you can alert the user if any file exceeds the size limit
    const invalidFiles = filesArray.filter(file => file.size > 1024 * 1024);
    if (invalidFiles.length > 0) {
      alert(`The following files exceed the size limit of 1MB: ${invalidFiles.map(file => file.name).join(', ')}`);
    }
  };
    // console.log(file);
  
  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    propretyHeadline: "",
    address: "",
    price: "",
    beds: "",
    priority:"",
    handoverDate: "",
    googleMapLink: "",
    description: "",
    preview: "",
    videoLink: "",
    propertyType: "",
    cityName: "",
    developerRef: "",
    developerName: "",
    // cityRef: "",
    sideBarRef: "",
    citiesArrayRef: [],
    sideBarName: "",
    projectNo:''
  });
  // -----------------------------------------------------

  //---------------------------------------------------------------------------------------------------------------
  const handleDynamicFacilitiesMoreFields = () =>
    setDynamicFacilitiesForm([...dynamicFacilitiesForm, ""]);
  const handleDynamicPaymentPlanMoreFields = () =>
    setDynamicPaymentPlan([...dynamicPaymentPlan, ""]);
  const handleDynamicAreasNearByFormMoreFields = () =>
    setDynamicAreasNearBy([...dynamicAreasNearBy, ""]);
  //---------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------
  const uploadSmallImageButton = () => uploadSmallImage.current.click();
  // -----------------------------------------------------------------

  // -----------------------------------------------

  const handleChange = (e) => {
    if (e.target.name === "price") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value.toUpperCase(),
      });
    } else if (e.target.name === "googleMapLink") {
      const iframeCode = e.target.value.trim();
      const match = iframeCode.match(/src=["'](.*?)["']/);
      const url = match && match[1] ? match[1] : "";
      frameOfLocation.current.src = url;
      setFormData({ ...formData, [e.target.name]: url });
    } else if (e.target.name === "indexOf") {
      setDynamicFacilitiesForm([dynamicFacilitiesForm, e.target.value]);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else if (e.target.name === "videoLink") {
      const iframeCode = e.target.value.trim();
      const match = iframeCode.match(/src=["'](.*?)["']/);
      const url = match && match[1] ? match[1] : "";
      frameOfVideo.current.src = url;
      setFormData({ ...formData, [e.target.name]: url });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleDynamicForm = (e, index) => {
    if (e.target.name === "FacilitiesAndAmenities") {
      const dynamciStateCopy = [...dynamicFacilitiesForm];
      dynamciStateCopy[index] = e.target.value;
      setDynamicFacilitiesForm(dynamciStateCopy);
    } else if (e.target.name === "PaymentPlan") {
      const dynamciStateCopy = [...dynamicPaymentPlan];
      dynamciStateCopy[index] = e.target.value;
      setDynamicPaymentPlan(dynamciStateCopy);
    } else if (e.target.name === "AreasNearby") {
      const dynamciStateCopy = [...dynamicAreasNearBy];
      dynamciStateCopy[index] = e.target.value;
      setDynamicAreasNearBy(dynamciStateCopy);
    }
  };
  const removeDynamicForm = (name, index) => {
    if (name === "FacilitiesAndAmenities") {
      const result = dynamicFacilitiesForm.filter((item, i) => i !== index);
      setDynamicFacilitiesForm(result);
    } else if (name === "PaymentPlan") {
      const result = dynamicPaymentPlan.filter((item, i) => i !== index);
      setDynamicPaymentPlan(result);
    } else if (name === "AreasNearby") {
      const result = dynamicAreasNearBy.filter((item, i) => i !== index);
      setDynamicAreasNearBy(result);
    }
  };
  // -------------------------------------------------

  const handlePropertyType = (value) => {
    const result = value.map((item) => item.value);
    setFormData({ ...formData, propertyType: result });
  };
  const handleCitiesChanges = (e) => {
    const convertToGetCitiesIds = e.map((item)=> item.value)
    setFormData({ ...formData, citiesArrayRef:convertToGetCitiesIds });
  };
  const handleDevelopers = (name, Id) => {
    setOptionsDeveloper(!optionsDeveloper);
    setFormData({ ...formData, developerRef: Id, developerName: name });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let data = {
        ...formData,
        isChecked: isChecked,
        mainImgaeLink: image,
        facilities: [...dynamicFacilitiesForm],
        paymentPlan: [...dynamicPaymentPlan],
        areasNearBy: [...dynamicAreasNearBy],
        smallImage: smallImage,
      };
      const formdata = new FormData();
      for (const key in data) {
        if (Array.isArray(data[key])) {
          formdata.append(`${key}`, JSON.stringify(data[key]));
        } else {
          formdata.append(key, data[key]);
        }
      }

      selectedFiles.forEach(file => {
        formdata.append('smallImage', file);
      });

      dispatch(setLoading());
      await addingPropertyAPI(formdata);
      dispatch(addPropertySuccess());
      successToast("Successfully added");
      setFormData({
        beds: "",
        description: "",
        googleMapLink: "",
        handoverDate: "",
        mainImgaeLink: "",
        price: "",
        propertyType: "",
        propretyHeadline: "",
        smallImgaeLink: "",
        videoLink: "",
        priority:"",
        cityName: "",
        sideBarRef:"",
        developerRef: "",
        projectNo:""
      });
      setSelectedFiles([])
      setrefresh(!refresh)
    } catch (error) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response?.data?.message || error?.message || "An error occurred during login.");
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

 

  const fetchdata = async () => {
    try {
      const response_cities = await getCities();
      // last changed the
      const to_converted_cities = response_cities?.result?.map((item) => {
        console.log(item,'--')
        return { value: item._id, label: item.cityName };
      });
      // dispatch(fetchCities(to_converted_cities));
      // last changed the
      setOptionsCities(to_converted_cities)

      const response_developers = await getDevelopers();
      dispatch(fetchDevelopers(response_developers));
      const response_propertyType = await fetchPropertyTypeAPI();
      const to_converted_ = response_propertyType?.result?.map((item) => {
        return { value: item.propertyType._id, label: item.propertyType.name };
      });
      setPropertyType(to_converted_);
      const fetchPriorityResponse = await fetchPriority();
      setPriorityCount(fetchPriorityResponse.result)
      const response_sidebar = await fetchSideBanners();
      setSidebar(response_sidebar.result);
      // get not availbe sidebar ids
      const response_not_avaible_sidebar = await fetchNotavailbeSidebar();
      setNotAvailableSidebarIds(response_not_avaible_sidebar?.result)

    } catch (error) {
      errorToast(error.response.data.message || error.message || "error occur");
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };

  useEffect(() => {
    fetchdata();
  }, [refresh]);


  const priorityList = [1,2,3,4,5,6,7,8,9,10,11,12];


  const handlePriority = (prioty) =>{
    setPriority(!priority);
    setFormData({ ...formData, priority: prioty });
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="">
        {/* Proprety Title */}
        <div className="flex mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="propretyHeadline"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Proprety Title
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            value={formData.propretyHeadline}
            name="propretyHeadline"
            onChange={handleChange}
            type="text"
            id="propretyHeadline"
            placeholder="Parkside Hills"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Price */}
        <div className="flex mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="price"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Price (From in AED)
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="text"
            id="price"
            placeholder="4M"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Handover Date */}
        <div className="flex mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="handoverDate"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Handover Date
          </label>
          <input
            autoComplete=""
            disabled={isLoading}
            name="handoverDate"
            value={formData.handoverDate}
            onChange={handleChange}
            type="date"
            id="handoverDate"
            placeholder="June 2025"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Beds */}
        <div className="flex mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="beds"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Beds
          </label>
          <input
            autoComplete=""
            name="beds"
            disabled={isLoading}
            value={formData.beds}
            onChange={handleChange}
            type="text"
            id="beds"
            placeholder="1,2,3,Studio"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

          {/* Property Type */}
          <div className="flex mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="propertyType"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Property Type
          </label>

          <Select
            name="propertyType"
            onChange={handlePropertyType}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            className="sf-medium font-medium text-sm"
            options={propertyType}
          />
          
        </div>


        {/* Cities */}
        <div className="flex flex-col mt-3 gap-2 mx-3 relative">
          {/* <label
            htmlFor="email"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Cities
          </label>
          <div
            onClick={() => setOptionsCities(!optionsCities)}
            className="flex cursor-pointer border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          >
            <span>{formData.cityName ? formData.cityName : "Select City"}</span>
            <span className="absolute right-5 top-12">
              {optionsCities ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </div>
          {optionsCities && (
            <div className="z-20 absolute rounded-[10px] top-24 bg-white w-full border p-3">
              {data &&
                data.map((item, i) => (
                  <p
                    key={i}
                    onClick={() => handleCity(item.cityName, item._id)}
                    className="py-1 cursor-pointer"
                  >
                    {item.cityName}
                  </p>
                ))}
            </div>
          )} */}
            <label
            htmlFor="email"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Cities
          </label>

<Select
            name=""
            onChange={handleCitiesChanges}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            className="sf-medium font-medium text-sm"
            options={optionsCities}
          />
        </div>

        {/* Google Map */}
        <div className="flex  mt-3 justify-center items-center">
          <div className="flex flex-col gap-2 mx-3 w-full">
            <label
              htmlFor="googleMapLink"
              className="sf-medium font-medium text-sm text-[#000000]"
            >
              Google Map
            </label>
            <textarea
              disabled={isLoading}
              placeholder="Google Map Embed Link,"
              onChange={handleChange}
              value={formData.googleMapLink}
              name="googleMapLink"
              id="googleMapLink"
              cols="30"
              rows="6"
              className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
            ></textarea>
          </div>
          <div className="">
            <iframe
              ref={frameOfLocation}
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14185.324610322421!2d75.59100095716197!3d12.100691766322257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4499ba0b48f91%3A0x3e6d558a663dd7a3!2s!5e0!3m2!1sen!2sin!4v1710042486885!5m2!1sen!2sin"
              className="border w-40 h-40 rounded-full"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Address */}
        <div className="flex  mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="address"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Address
          </label>
          <textarea
            name="address"
            disabled={isLoading}
            onChange={handleChange}
            value={formData.address}
            id="address"
            cols="30"
            rows="15"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none"
          ></textarea>
        </div>

        {/* Description */}
        <div className="flex   mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="description"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Description
          </label>
          <textarea
            name="description"
            disabled={isLoading}
            onChange={handleChange}
            value={formData.description}
            id="description"
            cols="30"
            rows="15"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          ></textarea>
        </div>

        {/* Developer */}
        <div className="flex  mt-3 flex-col gap-2 mx-3 relative">
          <label
            htmlFor="developerRef"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Developer
          </label>
          <div
            onClick={() => setOptionsDeveloper(!optionsDeveloper)}
            className="flex cursor-pointer border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          >
            <span>
              {formData.developerName
                ? formData.developerName
                : "Select Developer"}
            </span>
            <span className="absolute right-5 top-12">
              {optionsDeveloper ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </div>
          {optionsDeveloper && (
            <div className="z-20 absolute max-h-[300px] h-fit  overflow-auto rounded-[10px] top-24 bg-white w-full border p-3">
              {developers &&
                developers.map((item) => (
                  <p
                    key={item._id}
                    onClick={() =>
                      handleDevelopers(item.developerName, item._id)
                    }
                    className="py-1 cursor-pointer"
                  >
                    {item.developerName}
                  </p>
                ))}
            </div>
          )}
        </div>

        {/* Facilities And Amenities */}
        <div className="flex  mt-3 flex-col gap-2 mx-3 relative">
          <label
            htmlFor="FacilitiesAndAmenities"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Facilities And Amenities
          </label>
          {dynamicFacilitiesForm.map((item, index) => {
            return (
              <div
                className="w-full flex justify-center items-center gap-2"
                key={index}
              >
                <input
                  key={index}
                  value={item}
                  name="FacilitiesAndAmenities"
                  onChange={(e) => handleDynamicForm(e, index)}
                  type="text"
                  id="FacilitiesAndAmenities"
                  placeholder="Type here..."
                  className="border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none"
                />
                <span
                  onClick={() =>
                    removeDynamicForm("FacilitiesAndAmenities", index)
                  }
                  className="text-white p-3 rounded-full hover:bg-slate-600 cursor-pointer bg-black text-lg block"
                >
                  <IoMdRemove />
                </span>
              </div>
            );
          })}
          <div
            onClick={handleDynamicFacilitiesMoreFields}
            className="flex cursor-pointer justify-center items-center border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          >
            <span className="text-black text-lg ">
              <IoMdAdd />
            </span>
          </div>
        </div>

        {/* Payment Plan */}
        <div className="flex   mt-3 flex-col gap-2 mx-3 relative">
          <label
            htmlFor="PaymentPlan"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Payment Plan
          </label>
          {dynamicPaymentPlan.map((item, index) => {
            return (
              <div
                className="w-full flex justify-center items-center gap-2"
                key={index}
              >
                <input
                  key={index}
                  value={item}
                  autoComplete=""
                  onChange={(e) => handleDynamicForm(e, index)}
                  name="PaymentPlan"
                  type="text"
                  id="PaymentPlan"
                  placeholder="Type here..."
                  className=" w-full border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none"
                />
                <span
                  onClick={() => removeDynamicForm("PaymentPlan", index)}
                  className="text-white p-3 rounded-full hover:bg-slate-600 cursor-pointer bg-black text-lg block"
                >
                  <IoMdRemove />
                </span>
              </div>
            );
          })}
          <div
            onClick={handleDynamicPaymentPlanMoreFields}
            className="flex cursor-pointer justify-center items-center border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          >
            <span className="text-black text-lg ">
              <IoMdAdd />
            </span>
          </div>
        </div>

        <div className="ms-3  mt-3 mb-4 sf-medium">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="ms-3">Post Payment Handover Plan</span>
        </div>
      </div>

      <div className="px-4">
        {/*  Main image */}
        <h1 className="mb-3 text-4xl font-medium sf-medium">Media</h1>
        <h2 className="sf-medium  font-medium text-sm mb-3">Main Image</h2>
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

        {/* small image */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex gap-2  max-w-md flex-wrap">
            {
              selectedFiles.length > 0 &&
              selectedFiles.map((file,index) => {
                return (
                  <div className="relative" key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt="placeholder"
                      className="w-20 h-20  rounded-[10px]  object-cover "
                    />
                  </div>
                );
              })}
          </div>
          <div
            onClick={uploadSmallImageButton}
            className="w-16 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer"
          >
            <span> + </span>
          </div>
          <input
            ref={uploadSmallImage}
            type="file"
            multiple
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Video */}
        <div className="mt-5 flex flex-col gap-2 mx-3">
          <label
            htmlFor="videoLink"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Video Link
          </label>
          <input
            autoComplete=""
            value={formData.videoLink}
            name="videoLink"
            onChange={handleChange}
            type="url"
            id="videoLink"
            placeholder="URL - "
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        <iframe
          ref={frameOfVideo}
          src={formData.videoLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          className="mt-4 w-full h-[300px]"
        ></iframe>

        {/*  Areas Nearby */}
        <div className="mt-3 lg:mt-20 flex flex-col gap-2 mx-3 relative">
          <label
            htmlFor="AreasNearby"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Areas Nearby
          </label>
          {dynamicAreasNearBy.map((item, index) => {
            return (
              <div
                className="w-full flex justify-center items-center gap-2"
                key={index}
              >
                <input
                  key={index}
                  autoComplete=""
                  value={item}
                  onChange={(e) => handleDynamicForm(e, index)}
                  name="AreasNearby"
                  type="text"
                  id="AreasNearby"
                  placeholder="Type here..."
                  className="w-full border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
                />
                <span
                  onClick={() => removeDynamicForm("AreasNearby", index)}
                  className="text-white p-3 rounded-full hover:bg-slate-600 cursor-pointer bg-black text-lg block"
                >
                  <IoMdRemove />
                </span>
              </div>
            );
          })}
          <div
            onClick={handleDynamicAreasNearByFormMoreFields}
            className="flex cursor-pointer justify-center items-center border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none"
          >
            <span className="text-black text-lg ">
              <IoMdAdd />
            </span>
          </div>
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
                 priorityCount && priorityCount?.find((i)=> parseInt(i) === parseInt(item) ) ? <p
                 key={i}
                 
                 className="cursor-not-allowed py-1 text-red-400"
               >
                 {item} Not available
               </p> :  <p
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




        <br />



         {/* Sidebar */}
         <div className="flex flex-col gap-2 mx-3 relative">
          <label
            htmlFor="developerRef"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Ads
          </label>
          <div
            onClick={() => setOptionsAdsStatus(!OptionsAdsStatus)}
            className="flex cursor-pointer border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          >
            <span>
              {formData.sideBarName
                ? formData.sideBarName
                : "Select Ads"}
            </span>
            <span className="absolute right-5 top-12">
              {OptionsAdsStatus ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </div>
          {OptionsAdsStatus && (
            <div className={`z-20 absolute rounded-[10px] top-24  bg-white w-full border p-3`}>
              {sidebar &&
                sidebar.map((item) => (
                  <p
                    key={item._id}
                    onClick={() =>{

                      notAvailableSidebarIds.includes(item._id) ? true :

                      setFormData({...formData,sideBarRef:item._id,sideBarName:item.name})
                      setOptionsAdsStatus(!OptionsAdsStatus)
                    }
                    }
                    className={`py-1  ${notAvailableSidebarIds.includes(item._id) ? 'text-red-500 cursor-not-allowed' : 'text-black cursor-pointer'}`}
                  >
                     {item.name} {notAvailableSidebarIds.includes(item._id) && 'taken' }
                  </p>
                ))}
            </div>
          )}
        </div>



           {/* Project No */}
           <div className="flex mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="projectNo"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Project No
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            value={formData.projectNo}
            name="projectNo"
            onChange={handleChange}
            type="text"
            id="projectNo"
            placeholder="No."
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none"
          />
        </div>


        

        {/* submit */}

        <div className="p-3 mt-3   poppins-semibold text-lg">
          <button disabled={isLoading} type="submit" className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
            
              {isLoading ? "Loading..." : "Submit"}
            
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddProperties;





















































































   <div>
              {useEffect(() => {
                saveDataToLocalStorage(values);
              }, [values])}
            </div>




             <div>
              {useEffect(() => {
                saveDataToLocalStorage(values);
              }, [values])}
            </div>
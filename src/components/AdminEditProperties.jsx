import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import PlaceHolder from "../assets/placeholder/placeholder-image.png";
import { errorToast, successToast } from "../toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  editPropertySuccess,
  setError,
  setLoading,
} from "../features/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  MAIN_IMAG_URL,
  SERVER_URL,
  SMALL_IMAG_URL,
  deletePriorityByIdMatching,
  deleteSideBannerUnderProperty,
  deleteSideBanners,
  fetchAllPropertyTypeAPI,
  fetchNotavailbeSidebar,
  fetchPriority,
  fetchPropertyTypeAPI,
  fetchSideBanners,
  getCities,
  getDevelopers,
  getPropertyById,
  removeSmallImageAPI,
  updateProperties,
} from "../api";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { fetchCities } from "../features/citiesSlice";
import { fetchDevelopers } from "../features/developerSlice";
import { CiCircleRemove } from "react-icons/ci";
import UploadingImage from "./uploading/UploadingImage";
import { SMALL_IMAGE } from "../api/api-end-points";
import { ADMIN_TOKEN } from "../api/localstorage-varibles";
import axios from "axios";

function EditProperty() {
  const { state } = useLocation();
  const { id:propertyIdForParams } = useParams();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();
  const [isChecked, setIsChecked] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const { data } = useSelector((state) => state.city);
  const { developers } = useSelector((state) => state.developer);
  const [propertyType, setPropertyType] = useState([]);
  const [priority, setPriority] = useState(false);
  const propertyId = propertyIdForParams || state._id
  const [priorityCount,setPriorityCount] = useState([]);
  // --------------------------------------------
  const uploadSmallImage = React.useRef(null);
  const frameOfLocation = React.useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const frameOfVideo = React.useRef(null);
  const [existingCitiesInfo,setExistingCitiesInfo] = useState([]);
  const [existingPropertiesTypeInfo,setExistingPropertiesTypeInfo] = useState([]);
  // --------------------------------------------
  const removeImage = () => {
    setFormData({ ...formData, preview: "" });
    setImage("");
  };

  console.log(existingCitiesInfo,'----')

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
  // ------------------------------------------
  const [optionsCities, setOptionsCities] = React.useState(false);
  const [optionsDeveloper, setOptionsDeveloper] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // ------------------------------------------

  // ------------------------------------------------------
  const [dynamicFacilitiesForm, setDynamicFacilitiesForm] = React.useState([]);
  const [dynamicAreasNearBy, setDynamicAreasNearBy] = React.useState([]);
  const [dynamicPaymentPlan, setDynamicPaymentPlan] = React.useState([]);
  // ------------------------------------------------------

  // ---------------------------------------------------
  const [smallImage, setSmallImage] = React.useState([]);
  const [smallImageState, setSmallImageState] = React.useState([]);
  const [sidebar,setSidebar] = useState([]);
  const [OptionsAdsStatus,setOptionsAdsStatus] = useState(false);
  const [notAvailableSidebarIds,setNotAvailableSidebarIds] = useState([]);
  
  // ---------------------------------------------------

  // -----------------------------------------------------
  const [formData, setFormData] = React.useState({
    propretyHeadline: "",
    price: "",
    beds: "",
    googleMapLink: "",
    description: "",
    handoverDate: "",
    priority:"",
    preview: "",
    videoLink: "",
    address: "",
    propertyType: [],
    sideBarRef: "",
    sideBarName: "",
    projectNo:"",
    sold:false
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
  const uploadSmallImageButton = () => uploadSmallImage.current.click();
  // -----------------------------------------------------------------

  
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
      setFormData({ ...formData, [e.target.name]: url });
    } else if (e.target.name === "indexOf") {
      setDynamicFacilitiesForm([dynamicFacilitiesForm, ""]);
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

  const handleDeleteAds = async(id)=>{
     const status = window.confirm("Are you want to delete this?")
    if(status){
      await deleteSideBannerUnderProperty(id,propertyIdForParams);
      successToast('Deleted')
      navigate(`/admin/edit-properties`)
    }
  }  
  const handleDeletePriority = async(id)=>{
    
    try {

      const status = window.confirm("Are you want to delete this?")
      if(status){
        await deletePriorityByIdMatching(id,'property');
        successToast('Deleted')
        navigate(`/admin/edit-properties`)
      }
      
    } catch (error) {
      errorToast(error.response.data.message || error.message || "error occur");
    }
  }  
  

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };
  const handleCheckboxIsSoldChange = () => {
    setIsSold(!isSold); // Toggle the checkbox state
  };
  // -------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const citiesIds = existingCitiesInfo? existingCitiesInfo?.map((item)=> item._id+'' ) : [];
      const propertyTypeIds = existingPropertiesTypeInfo? existingPropertiesTypeInfo?.map((item)=> item._id+'' ) : [];
     
      let data = {
        ...formData,
        citiesArrayRef:[...citiesIds,...formData.citiesArrayRef],
        propertyType: [...propertyTypeIds,...formData.propertyType],
        mainImgaeLink: image,
        facilities: [...dynamicFacilitiesForm],
        paymentPlan: [...dynamicPaymentPlan],
        areasNearBy: [...dynamicAreasNearBy],
        isChecked: isChecked,
        isSold:isSold,
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
      setIsLoading(true);
      await updateProperties(formdata);
      dispatch(editPropertySuccess());
      successToast("Successfully Updated");
      setIsLoading(false);
      navigate("/admin/edit-properties");
    } catch (error) {
      dispatch(setError(error?.response?.data?.message));
      errorToast(
        error?.response?.data?.message ||
          error?.message ||
          "An error occurred during login."
      );
      setIsLoading(false);
    }
  };

  const handleCitiesChanges = (e) => {
    const convertToGetCitiesIds = e.map((item)=> item.value)
    setFormData({ ...formData, citiesArrayRef:convertToGetCitiesIds });
  };

  const handlePropertyType = (value) => {
    const result = value.map((item) => item.value);
    setFormData({ ...formData, propertyType: result });
  };

  useEffect(()=>{
    const fetchdata = async()=>{
      const existingCitiesIds =  existingCitiesInfo?.map((item)=> item._id+'' )
  
      const response_cities = await getCities();
      const filterCitiesBasedOnExist = response_cities?.result?.filter(obj => !existingCitiesIds.includes(obj._id+''))
  
  
      const to_converted_cities = filterCitiesBasedOnExist?.map((item) => {
        return { value: item._id, label: item.cityName };
      });
    
      setOptionsCities(to_converted_cities)
  
    }
    fetchdata()
  },[existingCitiesInfo]);

  useEffect(()=>{
    const fetchdata = async()=>{
      const existingPropertyTypeIds =  existingPropertiesTypeInfo?.map((item)=> item._id+'' )
  
      const response_propertyType = await fetchAllPropertyTypeAPI();
      const to_converted_ = response_propertyType?.result?.filter(obj => !existingPropertyTypeIds.includes(obj._id+''))
  
      const to_converted_properties = to_converted_?.map((item) => {
        return { value: item._id, label: item.name };
      });

      console.log(to_converted_properties,'to_converted_properties')
  
  
      setPropertyType(to_converted_properties);

    }
    fetchdata()
  },[existingPropertiesTypeInfo]);


  const fetchdata = async () => {
    try {

      const response_developers = await getDevelopers();
      dispatch(fetchDevelopers(response_developers));
      
      const fetchPriorityResponse = await fetchPriority();
      setPriorityCount(fetchPriorityResponse.result)
      const result_of_ads = await fetchSideBanners()
      setSidebar(result_of_ads.result);
    const response_not_avaible_sidebar = await fetchNotavailbeSidebar();
    setNotAvailableSidebarIds(response_not_avaible_sidebar?.result)
    } catch (error) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response.data.message || error.message ||"An error occurred during login.");

    }
  };

  const handleDevelopers = (name, Id) => {
    setOptionsDeveloper(!optionsDeveloper);
    setFormData({ ...formData, developerRef: Id, developerName: name });
  };

  React.useEffect(() => {
    
    if(state){
      const newState = { ...state, propertyType };
      setExistingCitiesInfo(state.citiesInfo);

      setExistingPropertiesTypeInfo(state.propertyType)
      setFormData({ ...newState });
    setDynamicAreasNearBy([...state.areasNearBy]);
    setDynamicPaymentPlan([...state.paymentPlan]);
    setDynamicFacilitiesForm([...state.facilities]);
    fetchdata();
    setImage(state.mainImgaeLink);
    setIsChecked(state.isChecked);
    setIsSold(state.isSold);
    setSmallImageState(state.smallImage)
   
  }else{
    reFetch()
    
  }
  // getMountingAPI()

    
  }, [state]);

  const getMountingAPI = async()=>{
    try {
      if(result_of_ads?.result && result_of_ads?.result?.length > 0 ) {
        if(state && state.sideBarRef){
          const result = result_of_ads?.result?.find((item)=> item._id === state?.sideBarRef  )
          setFormData({...formData,sideBarName:result.name,sideBarRef:result._id})
        }
      }
     
    } catch (error) {
      console.log(error)
    }
  }

  const removeselectedSmallImage = (filename)=>{
    const result = selectedFiles.filter((item)=> item !==  filename )
    setSelectedFiles(result)

  }

  const reFetch = async()=>{
    try {
      const {result} = await getPropertyById(propertyId)
      const state = result[0]
      const newState = { ...state, propertyType };
      setExistingCitiesInfo(state.citiesInfo)
      setExistingPropertiesTypeInfo(state.propertyType)
    setFormData({ ...newState });
    setDynamicAreasNearBy([...state.areasNearBy]);
    setDynamicPaymentPlan([...state.paymentPlan]);
    setDynamicFacilitiesForm([...state.facilities]);
    fetchdata();
    setImage(state.mainImgaeLink);
    setIsChecked(state.isChecked);
    setIsSold(state.isSold);
   

    } catch (error) {
      console.log(error.message)
    }
  }

 
  const removeSmallImage = async (fileName) => {
    await removeSmallImageAPI(fileName,propertyId);
    successToast('Removed')
    navigate('/admin/edit-properties')

  };

  const handleExistingRemoveCity = (cityId) => {

    const status = window.confirm("Are you want to delete this?");
    if(!status) return null;
    const result = existingCitiesInfo.filter((item) => item._id !== cityId);
    setExistingCitiesInfo(result);
    setFormData({ ...formData, citiesInfo: result });

    deleteCityByCityIdOnlyForAdminAPI(cityId);
    navigate('/admin/edit-properties');
  };


  const handleExistingRemovePropertyType =(propertyId)=>{
    const status = window.confirm("Are you want to delete this?");
    if(!status) return null;
    
    const result = existingPropertiesTypeInfo.filter((item) => propertyId !== item._id);
    setExistingPropertiesTypeInfo(result);

    deletePropertyTypeByPropertyTypeIdOnlyForAdminAPI(propertyId);
    // navigate('/admin/edit-properties');
  }

  const deleteCityByCityIdOnlyForAdminAPI =async (cityId)=>{
    try {

        const response = await axios.delete(`${SERVER_URL}/property/delete-existing-city/${cityId}/${propertyId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
        });
      
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || "error occur");
    }    
  }

  const deletePropertyTypeByPropertyTypeIdOnlyForAdminAPI =async (propertyTypeId)=>{
    try {
        const response = await axios.delete(`${SERVER_URL}/property/delete-existing-property-type/${propertyTypeId}/${propertyId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
        });
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || "error occur");
    }
  }


  const priorityList = [1,2,3,4,5,6,7,8,9,10,11,12];

  const handlePriority = (prioty) =>{
    setPriority(!priority);
    setFormData({ ...formData, priority: prioty });
  }


  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="">
        {/* Proprety Title */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="propretyHeadline"
            className="font-medium sf-medium text-sm text-[#000000]"
          >
            Proprety Title
          </label>
          <input
            autoComplete=""
            value={formData.propretyHeadline}
            name="propretyHeadline"
            onChange={handleChange}
            type="text"
            id="propretyHeadline"
            placeholder="Parkside Hills"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2 mt-3 mx-3">
          <label
            htmlFor="price"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Price (From in AED)
          </label>
          <input
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
        <div className="flex flex-col mt-3 gap-2 mx-3">
          <label
            htmlFor="handoverDate"
            className="sf-medium  font-medium text-sm text-[#000000]"
          >
            Handover Date
          </label>
          <input
            autoComplete=""
            defaultValue={formData.handoverDate}
            name="handoverDate"
            onChange={handleChange}
            type="date"
            id="handoverDate"
            placeholder="June 2025"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Beds */}
        <div className="flex mb-3 mt-3 flex-col gap-2 mx-3">
          <label
            htmlFor="beds"
            className="sf-medium  font-medium text-sm text-[#000000]"
          >
            Beds
          </label>
          <input
            autoComplete=""
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            type="text"
            id="beds"
            placeholder="1,2,3,Studio"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Property Type */}
        <label
            htmlFor="beds"
            className="sf-medium mx-3 font-medium text-sm text-[#000000]"
          >
            Property Type
          </label>
        <div className="flex cursor-pointer py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none">
          <Select
            name="propertyType"
            onChange={handlePropertyType}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={propertyType}
          />
        </div>

        <div className="gap-2 flex-wrap max-w-[450px] flex cursor-pointer pt-2 pb-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none">
            { existingPropertiesTypeInfo?.map((item,index)=> <label htmlFor="" key={index} className="border flex gap-2 rounded px-6 py-2">
            <span className="">{item.name}</span>
             <span
                onClick={() => handleExistingRemovePropertyType(item._id)}
                className="  cursor-pointer"
              >
                {" "}
                <CiCircleRemove className="text-red-600 " size={20} />{" "}
              </span> 
             
            </label> ) }
        </div>

        {/* Cities */}
        <div className="flex flex-col gap-2 mx-3 relative">
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
            <div className="gap-2 flex-wrap max-w-[450px] flex cursor-pointer pt-2 pb-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none">
            { existingCitiesInfo?.map((item,index)=> <label htmlFor="" key={index} className="relative border flex items-center justify-center gap-2 rounded px-6 py-2">
             <span className="flex">{item.cityName}</span>
             <span
                onClick={() => handleExistingRemoveCity(item._id)}
                className="  cursor-pointer"
              >
                {" "}
                <CiCircleRemove className="text-red-600 " size={20} />{" "}
              </span>             
            </label> ) }
        </div>
        </div>

        {/* Google Map */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-2 mx-3 mt-3 w-full">
            <label
              htmlFor="googleMapLink"
              className="sf-medium font-medium text-sm text-[#000000]"
            >
              Google Map
            </label>
            <textarea
              placeholder="Google Map Embed Link,"
              onChange={handleChange}
              value={formData.googleMapLink}
              name="googleMapLink"
              id="googleMapLink"
              cols="30"
              rows="6"
              className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666]  outline-none"
            ></textarea>
          </div>
          <div className="">
            <iframe
              src={formData.googleMapLink}
              className="border-none w-40 h-40 rounded-full"
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2 mt-3 mx-3">
          <label
            htmlFor="address"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Address
          </label>
          <textarea
            name="address"
            onChange={handleChange}
            id="address"
            cols="30"
            rows="15"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
            value={formData.address}
          ></textarea>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="description"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Description
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            value={formData.description}
            id="description"
            cols="30"
            rows="15"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          ></textarea>
        </div>

        {/* Developer */}
        <div className="flex flex-col gap-2 mx-3 mt-3 relative">
          <label
            htmlFor="developerRef"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Developer
          </label>
          <div
            onClick={() => setOptionsDeveloper(!optionsDeveloper)}
            className="flex cursor-pointer border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal  font-extralight text-sm text-[#666666]  outline-none"
          >
            <span>
              {formData.developerInfo
                ? formData.developerInfo.developerName
                : "Select Developer"}
            </span>
            <span className="absolute right-5 top-12">
              {optionsDeveloper ? <FaAngleUp /> : <FaAngleDown />}
            </span>
          </div>
          {optionsDeveloper && (
            <div className="z-20 max-h-[300px] h-fit  overflow-auto absolute rounded-[10px] top-24 bg-white w-full border p-3">
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
        <div className="flex flex-col gap-2 mx-3 mt-3 relative">
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
                  className="border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
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
        <div className="flex flex-col mt-3 gap-2 mx-3 relative">
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
                  className=" w-full border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
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

        <div className="sf-normal ms-3 mb-4 mt-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="ms-3 ">Post Payment Handover Plan</span>
        </div>
      </div>

      <div className="px-4">
        {/*  Main image */}
        <h1 className="mb-3 text-4xl sf-medium font-medium">Media</h1>
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

        <div className="flex gap-2 mt-6 max-w-md flex-wrap">
            
            {
              smallImageState.length > 0 &&
              smallImageState.map((file,index) => {
                return (
                  <div className="relative" key={index}>
                    <span
                    onClick={() => removeSmallImage(file)}
                    title="remove"
                    className="cursor-pointer absolute top-2 left-1 text-xs bg-red-600  py-0 px-1 text-center rounded-full text-white"
                  >
                    x
                  </span>
                    <img
                      src={`${SMALL_IMAG_URL}/${file}`}
                      alt="placeholder"
                      className="w-20 h-20  rounded-[10px]  object-cover "
                    />
                  </div>
                );
              })}
          </div>

        {/* small image */}
        <div className="mt-6 flex items-center gap-3">
        
          <div className="flex gap-2  max-w-md flex-wrap">
            
            {
              selectedFiles.length > 0 &&
              selectedFiles.map((file,index) => {
                return (
                  <div className="relative" key={index}>
                    <span
                    onClick={() => removeselectedSmallImage(file)}
                    title="remove"
                    className="cursor-pointer absolute top-2 left-1 text-xs bg-red-600  py-0 px-1 text-center rounded-full text-white"
                  >
                    x
                  </span>
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
            className="flex cursor-pointer justify-center items-center border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          >
            <span className="text-black text-lg ">
              <IoMdAdd />
            </span>
          </div>
        </div>


          {/* Priority */}
          <div className="flex pt-4 flex-col gap-2 mx-3 relative">
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
        { formData.priority && <p className="sf-normal font-extralight text-sm text-red-500 cursor-pointer" onClick={()=> handleDeletePriority(propertyIdForParams)}>Delete priority</p>}

        </div>


          {/* Sidebar */}
          <div className="flex py-4 flex-col gap-2 mx-3 relative">
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
                : sidebar.find(i => i._id === formData.sideBarRef )?.name ||  "Select Ads"}
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
        { formData.sideBarRef && <p className="sf-normal font-extralight text-sm text-red-500 cursor-pointer" onClick={()=> handleDeleteAds(formData.sideBarRef)}>Delete Ads</p>}
        </div>




           {/* Project No */}
           <div className="flex flex-col gap-2 mx-3">
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



         {/* Sold */}
         <div className="ms-3 sf-normal mb-4 mt-3">
          <input
            type="checkbox"
            checked={isSold}
            onChange={handleCheckboxIsSoldChange}
          />
          <span className="ms-3">Sold</span>
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

export default EditProperty;

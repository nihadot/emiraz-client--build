import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ADMIN_TOKEN, CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "../../api/localstorage-varibles";
import { SERVER_URL } from "../../api";
import { errorToast, successToast } from "../../toast";
// import CitiesDropdown from "../../components/AddProject/CitiesDropdown";
import DevelopersDropdown from "../../components/AddProject/DevelopersDropdown";
// import FacilitiesAndAmenities from "../../components/AddProject/FacilitiesAndAmenities";
// import PaymentOptions from "../../components/PaymentOptions";
// import NearbyAreas from "../../components/AddProject/NearbyAreas";
import PriorityDropdown from "../../components/PriorityDropdown";
import AdsOptionDropdown from "../../components/AddProject/AdsOptionDropdown";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import CitiesDropdown from "./CitiesDropdown";
import { FaTrash } from "react-icons/fa";
import FacilitiesAndAmenities from "./FacilitiesAndAmenities";
import NearbyAreas from "./NearbyAreas";
import PaymentOptions from "./PaymentOptions";
import AdsDropdown from "./AdsDropdown";
// import PropertyTypeDropdown from "./PropertyTypeDropdown";




const validationSchema = Yup.object().shape({

});


// Check if it's available
function AdminPropertyOtherEditPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [clearForms, setClearForms] = useState(false);
  const [cities, setCities] = useState(null);
  const [developers, setDevelopers] = useState(null);
  const handleClear = () => {
    setClearForms(!clearForms); // Trigger clearing
  };

  const [facilities, setFacilities] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [nearbyAreasState, setNearAreaSate] = useState([]);


  const [existPriorities, setExistPriorities] = useState([]);
  const [priorityValue, setPriorityValue] = useState({status:false,value:''});
  const { projectId } = useParams();
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    propertyType: [],
    cities:[],
    facilities:[],
    developerDetails:{},
    developer: "",
    paymentOptions:[],
    nearbyAreas:'',
    priority: "",
    draft:false,
    isSold : false,
    adsOptions:'',
    adsDetails:{},
  });
  const { state } = useLocation();
console.log(state,'state')

  useEffect(()=>{
    if(state){
        setUserData({
            cities: state.cities,
            priority: state.priority,
            nearbyAreas: state.nearbyAreas,
            developer: state.developer,
            facilities: state.facilities,
            propertyType: state.propertyType,
            cityDetails: state.cityDetails,
            developerDetails : state.developerDetails,
            draft : state.draft,
            isSold : state.isSold,
            adsOptions: state.adsOptions,
            adsDetails: state.adsDetails,
        });


        setFacilities(state.facilities);
        setPaymentOptions(state.paymentOptions);
        setNearAreaSate(state.nearbyAreas);
    }
  },[])
 
  useEffect(() => {
    // Make multiple API calls concurrently using Promise.all
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`${SERVER_URL}/city/`), // Replace with your first API URL
          axios.get(`${SERVER_URL}/developer`), // Replace with your second API URL
          axios.get(`${SERVER_URL}/priority`), // Replace with your second API URL
          axios.get(`${SERVER_URL}/sidebar`), // Replace with your second API URL

        ]);


        // Set the data from both API calls
        setCities(responses[0].data.result);
        setDevelopers(responses[1].data.result);
        setExistPriorities(responses[2].data.result);
        setAdsOptions(responses[3].data.result);

        setIsLoading(false);

      } catch (error) {
        errorToast(error?.response?.data?.message || error?.message || 'Error occurred while fetching data')
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once, after the first render

  const [isDraft, setIsDraft] = useState(false);  // State to track if the draft is active
  const [isSold, setIsSold] = useState(false);  // State to track if the draft is active

  // Button Styles
  const buttonStyles = "w-24 h-10 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out";
  const activeStyle = "bg-black text-white";
  const inactiveStyle = "bg-white text-black border-2 border-black opacity-60";

  const handleToggle = (setFieldValue) => {
    setFieldValue("draft", !isDraft);
    setIsDraft((prevState) => !prevState); // Toggle between true and false
  };

  const handleSoldToggle = (setFieldValue) => {
    setFieldValue("isSold", !isSold);
    setIsSold((prevState) => !prevState); // Toggle between true and false
  };

  useEffect(()=>{
    userData.draft  ? setIsDraft(true) : setIsDraft(false)
  },[userData])

  useEffect(()=>{
    userData.isSold  ? setIsSold(true) : setIsSold(false)
  },[userData])

  const handleSubmit = async (event, { resetForm }) => {

    console.log(event,'er')
    // console.log(state)
    // if(!state?.propertyType?.length > 0) errorToast('Please select a property type')
        // if(!state?.cities?.length > 0) errorToast('Please select a city')
            // if(!state?.developer) errorToast('Please select developer')
    // return true;
    
    try {

       setIsLoading(true);
const data = {};
const obj = Object.keys(event);

for (const element of obj) {
  if (event[element]) {
    if (Array.isArray(event[element]) && event[element].length === 0) {
      // Skip empty arrays
      continue;
    }
    // Add non-empty values to data
    data[element] = event[element];
  }
}

      if (data.cities) {
        data.cities = data.cities.map(city => city._id)
      }

         if(data.developer){
        data.developer = data.developer.id;
      }
    
     data.draft = event.draft;
     data.isSold = event.isSold;

    console.log('[Data]: => ', data)
    const response = await axios.put(`${SERVER_URL}/property/update-other-options/${projectId}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
     
    resetForm();
    handleClear();
    setIsDraft(false);  // Reset the draft state here after form reset
    successToast('Successfully added');
      navigate(`/admin/edit-properties`)
   
    if(data.priority){
     
      setExistPriorities(prevState => [...prevState, data.priority])
    }



    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message  || 'Error')
    } finally {
      setIsLoading(false);
    }
  }

  const [adsOptions,setAdsOptions] = useState([]);

  const handleDeleteCity =async({_id:id},type)=>{


    const status = window.confirm('Are you sure you want to delete this?');
    if(status){

       
      try {
        const response = await axios.delete(`${SERVER_URL}/property/city/delete/${projectId}/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
        });
        console.log('[Response]: => ', response);
        navigate('/admin/edit-properties');
        successToast('Property deleted successfully');
      } catch (error) {
        errorToast(error?.response?.data?.message || error?.message || 'Error occurred while deleting property');
      } finally {
        setIsLoading(false);
      }
  


    }
  }


  const handleDeletePropertyType = async(item,obj)=>{
    
    const status = window.confirm('Are you sure you want to delete this?');
   if(!status){
    return true;
   }
    try {

      if(obj.length === 1){
        return errorToast('Remaining one property')
      }

        const response = await axios.delete(`${SERVER_URL}/property/property-type/delete/${projectId}/${item}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
        });
        console.log('[Response]: => ', response);
        navigate('/admin/edit-properties');
        successToast('Property deleted successfully');
      } catch (error) {
        errorToast(error?.response?.data?.message || error?.message || 'Error occurred while deleting property');
      } finally {
        setIsLoading(false);
      }
  }


  const handlePriorityDelete = async(item)=>{
    const status = window.confirm('Are you sure you want to delete this?');
    if(!status){
     return true;
    }
     try {
 
 
         const response = await axios.delete(`${SERVER_URL}/property/delete/priority/${projectId}/${item}`, {
           headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
         });
         console.log('[Response]: => ', response);
         navigate('/admin/edit-properties');
         successToast('Deleted successfully');
       } catch (error) {
         errorToast(error?.response?.data?.message || error?.message || 'Error occurred while deleting property');
       } finally {
         setIsLoading(false);
       }
  }

  
  const handleAdsDelete = async()=>{
    const status = window.confirm('Are you sure you want to delete this?');
    if(!status){
     return true;
    }
     try {
 
 
         const response = await axios.delete(`${SERVER_URL}/property/delete/ads/${projectId}`, {
           headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
         });
         console.log('[Response]: => ', response);
         navigate('/admin/edit-properties');
         successToast('Deleted successfully');
       } catch (error) {
         errorToast(error?.response?.data?.message || error?.message || 'Error occurred while deleting property');
       } finally {
         setIsLoading(false);
       }
  }
  return (
    <Formik
      initialValues={{
       
        propertyType: [],
        cities:[],
        facilities:userData.facilities || [],

        developer: "",
        paymentOptions:userData.paymentOptions || [],
        nearbyAreas: userData.nearbyAreas || [],
        priority: "",
        // ...userData
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      
    >
      {({ setFieldValue, values,errors }) => (
        <Form className="flex-wrap flex">
          <div className="max-w-[600px] w-full">
            <div className="flex-1">
             

<div className="mb-14">

  {/* Property Type Dropdown */}
  <PropertyTypeDropdown
            clearForms={clearForms}
            name="propertyType"
            value={values.propertyType}
            onChange={setFieldValue}
            isLoading={false}
            existingData={userData.propertyType}
          />



      
        <div className="flex justify-center  gap-3 mt-3 w-fit items-center  capitalize sf-bold border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">Already existing : </div>
<div className=" flex gap-3">
            {userData?.propertyType?.map((item,index)=> {
                return(
                    <div className="flex justify-center  gap-3 mt-3 w-fit items-center border capitalize sf-medium border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">
                    <div className="capitalize   rounded" key={index}>{item}</div>
                        {/* <FaTrash onClick={()=>handleDelete(item)} color="red" size={14}/> */}
                            <Link onClick={()=>handleDeletePropertyType(item,userData?.propertyType)} className="text-slate-50 bg-red-600/90 w-5 h-5 flex justify-center items-center rounded-full text-[10px]"> ✕</Link>
                    </div>
                )
            } )}
        </div>
</div>







<div className="mb-10">

              {/*  */}
              <CitiesDropdown
                name="cities"
                clearForms={clearForms}
                value={values.cities}
                onChange={setFieldValue}
                isLoading={isLoading}
                options={cities}
                existingData={userData.cityDetails}

              />

<div className="flex justify-center  gap-3 mt-3 w-fit items-center  capitalize sf-bold border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">Already existing : </div>
<div className=" flex gap-3">
  {console.log(userData,'userData')}
            {userData?.cityDetails?.map((item,index)=> {
                return(
                    <div className="flex justify-center  gap-3 mt-3 w-fit items-center border capitalize sf-medium border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">
                    <div className="capitalize   rounded" key={index}>{item?.cityName}</div>
                        {/* <FaTrash onClick={()=>handleDelete(item)} color="red" size={14}/> */}
                            <Link onClick={()=>handleDeleteCity(item)} className="text-slate-50 bg-red-600/90 w-5 h-5 flex justify-center items-center rounded-full text-[10px]"> ✕</Link>
                    </div>
                )
            } )}
        </div>

        </div>















<div className="mb-14">

              <DevelopersDropdown
                name="developer"
                clearForms={clearForms}
                mt6
                value={values.developer}
                onChange={setFieldValue}
                isLoading={isLoading}
                options={developers}
                existingData={userData.developerDetails}
              />

<div className="flex justify-center  gap-3 mt-3 w-fit items-center  capitalize sf-bold border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">Already existing : </div>

        <div className="flex justify-center  gap-3 mt-3 mb-5 w-fit items-center border capitalize sf-medium border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">
                    <div className="capitalize rounded">{userData?.developerDetails?.developerName}</div>
                        {/* <FaTrash onClick={()=>handleDelete(item)} color="red" size={14}/> */}
                    </div>
                
                    </div>















              <FacilitiesAndAmenities
                name="facilities"
                clear={clearForms}
                value={values.facilities}
                onChange={setFieldValue}
                existingData={facilities}
              />





              

              <PaymentOptions
                name="paymentOptions"
                value={values.paymentOptions}
                onChange={setFieldValue}
                clearForm={clearForms}
                existingData={paymentOptions}

              />

        
              <NearbyAreas
              existingData={nearbyAreasState}
                name="nearbyAreas"
                value={values.nearbyAreas}
                onChange={setFieldValue}
                clearForm={clearForms}
              />
<PriorityDropdown
priorityValue={priorityValue}
  existingPriorities={existPriorities} // Pass the existing priorities including the selected one
  name="priority"
  priorities={Array.from({ length: 12 }, (_, i) => i + 1)} // Array of priorities
  value={values.priority}
  onChange={setFieldValue}
  clearForms={clearForms} // Pass the clearFormFields function here
/>

                    { userData && userData.priority && <div className="flex justify-center  gap-3 mt-3 w-fit items-center  capitalize sf-bold border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">Already existing : </div>}

{ userData && userData.priority &&  <div className="flex justify-center  gap-3 mt-3 mb-5 w-fit items-center border capitalize sf-medium border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">
             <div className="capitalize rounded">{userData?.priority}</div>
             <Link onClick={()=>handlePriorityDelete(userData?.priority)} className="text-slate-50 bg-red-600/90 w-5 h-5 flex justify-center items-center rounded-full text-[10px]"> ✕</Link>

             </div>}



              {/* Error Message */}
              <ErrorMessage name='priorities' component="div" className="text-red-500 text-sm mt-2" />

              <AdsDropdown
                name="adsOptions"
                clearForms={clearForms}
                value={values.adsOptions}
                onChange={setFieldValue}
                isLoading={isLoading}
                options={adsOptions}
              />

{ userData && userData.adsDetails && <div className="flex justify-center  gap-3 mt-3 w-fit items-center  capitalize sf-bold border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">Already existing : </div>}

       { userData && userData.adsDetails &&  <div className="flex justify-center  gap-3 mt-3 mb-5 w-fit items-center border capitalize sf-medium border-[#E4E4E4] py-3 px-4 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ">
                    <div className="capitalize rounded">{userData?.adsDetails?.name}</div>
                    <Link onClick={()=>handleAdsDelete(userData?.adsDetails._id)} className="text-slate-50 bg-red-600/90 w-5 h-5 flex justify-center items-center rounded-full text-[10px]"> ✕</Link>

                    </div>}



              <div className="flex gap-4">
                {/* Draft Button */}
                <motion.button
                type="button"
                  onClick={() => handleToggle(setFieldValue)}
                  
                  className={`${buttonStyles} ${isDraft ? activeStyle : inactiveStyle}`}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isDraft ? 1 : 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDraft ? "Draft On" : "Draft Off"}
                </motion.button>


              </div>




              <div className="flex gap-4 mt-6">
                {/* Sold Button */}
                <motion.button
                type="button"
                  onClick={() => handleSoldToggle(setFieldValue)}
                  
                  className={`${buttonStyles} ${isSold ? activeStyle : inactiveStyle}`}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isSold ? 1 : 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isSold ? "Sold" : "Not Sold"}
                </motion.button>


              </div>

              <div>

        

              </div>


              {/* Submit */}
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
          </div>


      
          <div className="flex-1 sticky flex-wrap top-2 h-full px-5">
     
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AdminPropertyOtherEditPage;


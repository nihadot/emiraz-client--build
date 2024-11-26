import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { motion, AnimatePresence } from "framer-motion";
// import PropertyTypeDropdown from "./AddProject/PropertyTypeDropdown";
// import CitiesDropdown from "./AddProject/CitiesDropdown";
// import MapEmbedder from "./AddProject/MapEmbedder";
// import AddressInput from "./AddProject/AddressInput";
// import DescriptionInput from "./AddProject/DescriptionInput";
// import DevelopersDropdown from "./AddProject/DevelopersDropdown";
// import AdvancedImageUploader from "./AddProject/AdvancedImageUploader";
// import NearbyAreas from "./AddProject/NearbyAreas";
// import AdsOptionDropdown from "./AddProject/AdsOptionDropdown";
// import FacilitiesAndAmenities from "./AddProject/FacilitiesAndAmenities";
import { errorToast, successToast } from "../toast";
import axios from "axios";
import { addingPropertyAPI, SERVER_URL } from "../api";
// import MainImageUploader from "./AddProject/ImageUploader";
// import PropertiesCard from "./Cards";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from "../api/localstorage-varibles";
// import PaymentOptions from "./PaymentOptions";
// import PriorityDropdown from "./PriorityDropdown";
// import PropertyTypeDropdown from "../components/AddProject/PropertyTypeDropdown";
// import CitiesDropdown from "../components/AddProject/CitiesDropdown";
// import MapEmbedder from "../components/AddProject/MapEmbedder";
// import AddressInput from "../components/AddProject/AddressInput";
// import DescriptionInput from "../components/AddProject/DescriptionInput";
// import DevelopersDropdown from "../components/AddProject/DevelopersDropdown";
// import AdvancedImageUploader from "../components/AddProject/AdvancedImageUploader";
// import NearbyAreas from "../components/AddProject/NearbyAreas";
import AdsOptionDropdown from "../components/AddProject/AdsOptionDropdown";
import FacilitiesAndAmenities from "../components/AddProject/FacilitiesAndAmenities";
import MainImageUploader from "../components/AddProject/ImageUploader";
import PropertiesCard from "../components/Cards";
import PaymentOptions from "../components/PaymentOptions";
import PriorityDropdown from "../components/PriorityDropdown";
import PropertyTypeDropdown from "../components/AddProject/PropertyTypeDropdown";
import CitiesDropdown from "../components/AddProject/CitiesDropdown";
import MapEmbedder from "../components/AddProject/MapEmbedder";
import AddressInput from "../components/AddProject/AddressInput";
import DescriptionInput from "../components/AddProject/DescriptionInput";
// import DevelopersDropdown from "../components/AddProject/DevelopersDropdown";
// import AdvancedImageUploader from "../components/AddProject/AdvancedImageUploader";
import NearbyAreas from "../components/AddProject/NearbyAreas";
import AdvancedImageUploader from "../components/AddProject/AdvancedImageUploader";
import DevelopersDropdown from "../components/AddProject/DevelopersDropdown";









// Check if it's available
function AddProperties() {

    const { state } = useLocation();

    const [data,setData] = useState();

    useEffect(()=>{
        console.log(state,'state')
        if(state){
            setData(state);
        }
    },[])

    const validationSchema = Yup.object().shape({
      projectTitle: Yup.string()
        .required("Project Title is required")
        .min(3, "Project Title must be at least 3 characters")
        .max(50, "Project Title cannot exceed 50 characters"),
      priceInAED: Yup.string().required("Price is required"),
      handoverDate: Yup.date()
        .required("Handover Date is required")
        .min(new Date(), "Only future dates are allowed"), // Restrict past dates
      beds: Yup.string()
        .required("Beds information is required"),
      // .matches(/^\d+|[A-Za-z\s]+$/, "Beds must be a number or text"), // Validate as number or text
      cities: Yup.array()
        .min(1, "At least one city must be selected")
        .required("Cities are required"),
      propertyType: Yup.array().min(1, "At least one property")
        .required("Property Type is required"),
        developer: Yup.object()
        .nullable()
        .required("Selecting a developer is required"), // Validation for the developer field
          imageFile: Yup.mixed()
        .required("Image is required")
      //  ,
    
    });


    const uploadImage = async (image, folder) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", CLOUDINARY_PERSISTENT);
      formData.append("folder", folder);
    
      try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, formData);
        return {
          asset_id: response.data.asset_id,
          secure_url: response.data.secure_url,
          url: response.data.url,
          public_id: response.data.public_id,
        };
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
      }
    };

  const [isLoading, setIsLoading] = useState(false);
  const [clearCityStatus, setClearCityStatus] = useState(false);
  const [clearPropertyTypeStatus, setClearPropertyTypeStatus] = useState(false);
  const [clearForms, setClearForms] = useState(false);
  const [clearGoogleMap, setClearGoogleMap] = useState(false);
  const [clearTheImageStatus, setClearTheImageStatus] = useState(false);
  const [clearTheImageMultipleStatus, setClearTheImageMultipleStatus] = useState(false);
  const [cities, setCities] = useState(null);
  const [developers, setDevelopers] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleClear = () => {
    setClearForms(!clearForms); // Trigger clearing
  };


  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Make multiple API calls concurrently using Promise.all
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get(`${SERVER_URL}/city/`), // Replace with your first API URL
          axios.get(`${SERVER_URL}/developer`), // Replace with your second API URL
        ]);

        console.log(responses, 'res')

        // Set the data from both API calls
        setCities(responses[0].data.result);
        setDevelopers(responses[1].data.result);
        setIsLoading(false);

      } catch (error) {
        errorToast(error?.response?.data?.message || error?.message || 'Error occurred while fetching data')
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once, after the first render

  const [isDraft, setIsDraft] = useState(false);  // State to track if the draft is active

  // Button Styles
  const buttonStyles = "w-24 h-10 text-sm font-semibold rounded-lg transition-all duration-300 ease-in-out";
  const activeStyle = "bg-black text-white";
  const inactiveStyle = "bg-white text-black border-2 border-black opacity-60";

  const handleToggle = (setFieldValue) => {
    setFieldValue("draft", !isDraft);
    setIsDraft((prevState) => !prevState); // Toggle between true and false
  };



  const handleSubmit = async (event, { resetForm }) => {

    try {

       setIsLoading(true);
const data = {};
const obj = Object.keys(event);
for (const element of obj) {
  event[element] && (data[element] = event[element])
}

      if (data.cities) {
        data.cities = data.cities.map(city => city._id)
      }

         if(data.developer){
        data.developer = data.developer.id;
      }

     

      if (event.imageFile) {
        const imageData = await uploadImage(event.imageFile, 'projects_upload');
        data.imageFile = imageData;
      }
      
      if (event.imageFiles && event.imageFiles.length > 0) {
        const uploadedImages = [];
        for (const image of event.imageFiles) {
          const imageData = await uploadImage(image, 'projects_sub_upload');
          uploadedImages.push(imageData);
        }
        event.imageFiles = uploadedImages;
      }
      
 

await addingPropertyAPI(data);
resetForm();
handleClear();
setIsDraft(false);  // Reset the draft state here after form reset
successToast('Successfully added');
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message  || 'Error')
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <Formik
      initialValues={{
        projectTitle:  "",
        priceInAED:  "",

        handoverDate: "",
        beds:  "",
        propertyType:  [],
        cities:  [],
        facilities:[],
        address:  "",
        description: "",
        developer:'',
        mapLink:'',
        paymentOptions:[],
        imageFile:'',
        nearbyAreas:'',
        priority: "",
        projectNumber: "",
        isChecked:false,
        ...data,
      }}
      validationSchema={validationSchema}
      enableReinitialize
      
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values,errors }) => (
        <Form className="flex-wrap flex">
          <div className="max-w-[600px] w-full">
            <div className="flex-1">
              {/* Project Title */}
              <div className="flex flex-col gap-2 ">
                <label
                  htmlFor="projectTitle"
                  className="sf-medium font-medium text-sm text-[#000000]"
                >
                  Project Title <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  disabled={isLoading}
                  name="projectTitle"
                  type="text"
                  // innerRef={projectTitleRef}
                  value={values.projectTitle}
                  placeholder="Down Town"
                  className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666] outline-none"
                />
                <ErrorMessage
                  name="projectTitle"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Price In AED */}
              <div className="flex mt-3 flex-col gap-2 ">
                <label
                  htmlFor="priceInAED"
                  className="sf-medium font-medium text-sm text-[#000000]"
                >
                  Price In AED <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  disabled={isLoading}
                  name="priceInAED"
                  type="text"
                  // innerRef={priceInAEDRef}
                  placeholder="1000000"
                  className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666] outline-none"
                />
                <ErrorMessage
                  name="priceInAED"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>


              {/* Handover Date */}
              <div className="flex mt-3  flex-col gap-2">
                <label
                  htmlFor="handoverDate"
                  className="sf-medium font-medium text-sm text-[#000000]"
                >
                  Handover Date <span className="text-lg text-red-600">*</span>
                </label>
                <DatePicker
                  disabled={isLoading}
                  selected={values.handoverDate}
                  onChange={(date) => setFieldValue("handoverDate", date)}
                  minDate={new Date()} // Restrict to future dates
                  placeholderText="Select a date"
                  className="border border-[#E4E4E4] py-4 px-5 w-full rounded-[10px] font-extralight sf-normal text-sm text-[#666666] outline-none"
                />
                <ErrorMessage
                  name="handoverDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Beds */}
              <div className="flex mt-3 flex-col gap-2 ">
                <label
                  htmlFor="beds"
                  className="sf-medium font-medium text-sm text-[#000000]"
                >
                  Beds <span className="text-lg text-red-600">*</span>
                </label>
                <Field
                  disabled={isLoading}
                  name="beds"

                  type="text"
                  placeholder="3 Beds or Studio"
                  className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666] outline-none"
                />
                <ErrorMessage
                  name="beds"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>



              {/* Property Type */}
              <PropertyTypeDropdown
                clearForms={clearForms}
                name="propertyType"
                value={values.propertyType}
                onChange={setFieldValue}
                isLoading={isLoading}
              />


              {/*  */}
              <CitiesDropdown
                name="cities"
                clearForms={clearForms}
                value={values.cities}
                onChange={setFieldValue}
                isLoading={isLoading}
                options={cities}
              />



              <AddressInput
                clearForms={clearForms}
                name='address'
                onChange={setFieldValue} // Pass the handler to the AddressInput component
                value={values.address} // Pass the current address value
                placeholder="Enter your address" // Custom placeholder text
                maxLength={300} // Optional: Customize max length
              />

              <DescriptionInput

                name="description"
                value={values.description}
                onChange={setFieldValue}
                placeholder="Provide a detailed description"
             
                isLoading={isLoading}
              />


          
<MapEmbedder
name={'mapLink'}
        value={values.mapLink}
        onChange={setFieldValue}
        clearForm={clearForms}
      />


              <DevelopersDropdown
                name="developer"
                clearForms={clearForms}

                value={values.developer}
                onChange={setFieldValue}
                isLoading={isLoading}
                options={developers}
              />


              <FacilitiesAndAmenities
                name="facilities"
                clear={clearForms}
                value={values.facilities}
                onChange={setFieldValue}
              />

              <PaymentOptions
                name="paymentOptions"
                value={values.paymentOptions}
                onChange={setFieldValue}
                clearForm={clearForms}

              />

        
              <MainImageUploader
  name="imageFile"
  onChange={(_, file) => setFieldValue(_, file)} // Updates Formik with the file object
  preferredFormat="webp"
  clearForms={clearForms}
  value={values.imageFile} // Binds Formik value to the uploader
/>
<ErrorMessage
  name="imageFile"
  component="div"
  className="text-red-500 font-medium text-xs ps-3 pt-1"
/>
              {/* {console.log(values.imageFile,'values.imageFile')} */}
              <AdvancedImageUploader
                onChange={setFieldValue}
                name={'imageFiles'}
                preferredFormat="webp"
                clearForm={clearForms}
                clearTheImageMultipleStatus={clearTheImageMultipleStatus}
              />

              <div>
                < VideoUploader
                name='projectVideo'
                clearForms={clearForms}
                  onChange={setFieldValue}
                />
                <ErrorMessage name="projectVideo" component="div" className="error" />
              </div>


              <NearbyAreas
                name="nearbyAreas"
                value={values.nearbyAreas}
                onChange={setFieldValue}
                clearForm={clearForms}
              />
<PriorityDropdown
            name="priority"
            value={values.priority}
            onChange={setFieldValue}
            clearForms={clearForms} // Pass the clearFormFields function here
          />

              {/* Error Message */}
              <ErrorMessage name='priorities' component="div" className="text-red-500 text-sm mt-2" />

              <AdsOptionDropdown
              clearForms={clearForms}
                isLoading={isLoading}
                name={'adsOptions'}
                onChange={setFieldValue}
              />




              {/* Project Number */}
              <div className="flex mt-6 flex-col gap-2 ">
                <label
                  htmlFor="projectNumber"
                  className="sf-medium font-medium text-sm text-[#000000]"
                >
                  Project Number
                </label>
                <Field
                  type="text"
                  disabled={isLoading}
                  name={'projectNumber'}
                  value={values.projectNumber}
                  className="border border-[#E4E4E4] py-4 px-4 rounded-[10px] font-normal text-sm text-[#333333] w-full outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                  placeholder="Enter Project Number"
                />
                <ErrorMessage
                  name="projectNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>


              <PostHandoverOption
                name="isChecked"
                value={values.isChecked}
                onChange={setFieldValue}
              clearForms={clearForms}

              />


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


           {/* Debug */}
           {/* <div className="mt-4">
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </div> */}

          <div className="flex-1 sticky flex-wrap top-2 h-full px-5">
            {/* <PropertiesCard
              navigate={navigate}
              item={values}
            /> */}

          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddProperties;







const PostHandoverOption = ({ name, value, onChange,clearForms }) => {
  const [isChecked, setIsChecked] = useState(value || false);

  const handleCheckboxToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(name, newValue);
  };

  useEffect(()=>{
    setIsChecked(value);
    onChange(name, '');
  },[clearForms])
  return (
    <div className="flex items-center gap-4 my-8">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxToggle}
        className="w-5 h-5 cursor-pointer accent-black"
      />
      <label className="text-sm text-[#333333] font-medium">
        Post-Handover Option
      </label>
    </div>
  );
};




const VideoUploader = ({ onChange ,name,clearForms}) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [cutYoutubeUrl, setCutYoutubeUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Extract and validate YouTube link
  const extractYoutubeUrl = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:embed|watch\?v=)([^\s&?]+)/;
    const match = url.match(regex);

    if (match && match[0]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return "";
  };

  const handleYoutubeChange = (e) => {
    const value = e.target.value;
    const validUrl = extractYoutubeUrl(value);
    setYoutubeUrl(value);
    setCutYoutubeUrl(validUrl);

    if (!validUrl) {
      setErrorMessage("Invalid YouTube URL.");
    } else {
      setErrorMessage("");
    }

    onChange(name,validUrl); // Pass the cleaned URL to the parent component
  };

    // Reset the form when clearForms prop changes
    useEffect(() => {
     
        setYoutubeUrl("");
        setCutYoutubeUrl("");
        setErrorMessage("");
        onChange(name, ""); // Notify the parent of the cleared state
      
    }, [clearForms]);
  


  return (
    <div className="video-uploader mt-8">
      <label className="block sf-medium font-medium text-sm mb-2">YouTube Video URL</label>
      <input
        type="text"
        className="border sf-medium font-medium text-sm border-gray-300 p-2 rounded-md w-full"
        value={youtubeUrl}
        onChange={handleYoutubeChange}
        placeholder="Enter YouTube URL"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      {cutYoutubeUrl && (
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">YouTube Video:</label>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <iframe
              width="560"
              height="315"
              src={cutYoutubeUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </motion.div>
        </div>
      )}
    </div>
  );
};

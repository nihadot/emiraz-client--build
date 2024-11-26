import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
// import { addingPropertyAPI, SERVER_URL } from "../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { errorToast, successToast } from "../../toast";
import { addingPropertyAPI, SERVER_URL } from "../../api";
import { ADMIN_TOKEN } from "../../api/localstorage-varibles";
import AddressInput from "../../components/AddProject/AddressInput";
import DescriptionInput from "../../components/AddProject/DescriptionInput";
import MapEmbedder from "../../components/AddProject/MapEmbedder";







function AddProperties() {
  const [isLoading, setIsLoading] = useState(false);

  const [clearForms, setClearForms] = useState(false);
  
  const handleClear = () => {
    setClearForms(!clearForms); // Trigger clearing
  };

  const { state } = useLocation();
  const { userId } = useParams();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    projectTitle:  "",
    priceInAED:  "",
    handoverDate: "",
    beds:  "",
    address:  "",
    description: "",
    mapLink:'',
    projectNumber: "",
    isChecked:false,
    projectVideo:''
  });

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
  
  
  });
  

  useEffect(() => {

    console.log(state,'states')

    if(state){
        setUserData({
            projectTitle:state.projectTitle,
            priceInAED:state.priceInAED,
            handoverDate: state.handoverDate,
            beds:state.beds,
            address:state.address,
            description:state.description,
            mapLink:state.mapLink,
            projectNumber:state.projectNumber,
            isChecked:state.isChecked,
            projectVideo :state.projectVideo,
        })
    }
    // Make multiple API calls concurrently using Promise.all
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
        //   axios.get(`${SERVER_URL}/city/`), // Replace with your first API URL
        //   axios.get(`${SERVER_URL}/developer`), // Replace with your second API URL
        ]);

        console.log(responses, 'res')

        setIsLoading(false);

      } catch (error) {
        errorToast(error?.response?.data?.message || error?.message || 'Error occurred while fetching data')
        setIsLoading(false);
      }
    };

    // fetchData();
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

      

       
   const response = await axios.put(`${SERVER_URL}/property/details/${userId}`, event, {
    headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
  });





  
successToast('Successfully added');
navigate('/admin/edit-properties')
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
        address:  "",
        description: "",
        mapLink:'',
        projectNumber: "",
        isChecked:false,
        projectVideo:'',
        ...userData
      }}
      enableReinitialize
      validationSchema={validationSchema}
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

{console.log(values,'values')}
              <AddressInput
                // clearForms={clearForms}
                name='address'
                value={values.address} // Pass the current address value
                onChange={setFieldValue} // Pass the handler to the AddressInput component
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
        // clearForm={clearForms}
      />


     


               <div>
                < VideoUploader
                name='projectVideo'
                value={values?.projectVideo}
                clearForms={clearForms}
                  onChange={setFieldValue}
                />
                <ErrorMessage name="projectVideo" component="div" className="error" />
              </div> 

              {console.log(values,'valuesss')}



           


              {/* Project Number */}
              <div className="flex mt-6 flex-col gap-2 ">
                <label
                  htmlFor="projectNumber"
                  className="sf-medium font-medium text-sm text-[#000000]"
                >
                  Project Number
                </label>

         
                <Field
                
                disabled={isLoading}
                name='projectNumber'
                type="text"
                // innerRef={projectNumberRef}
                className="border border-[#E4E4E4] py-4 px-4 rounded-[10px] font-normal text-sm text-[#333333] w-full outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                onChange={(data) => setFieldValue("projectNumber", data.target.value)}
              values={values.projectNumber}
                placeholder="Enter Project Number"
                />
                {console.log(values.projectNumber,'values.projectNumber')}
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


              {/* <div className="flex gap-4">
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


              </div> */}

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







const PostHandoverOption = ({ name, value, onChange, clearForms }) => {
    // Initialize isChecked from value, ensure dynamic updates
    const [isChecked, setIsChecked] = useState(false);
  
    // Sync with `value` prop and handle form clearing
    useEffect(() => {
      if (clearForms) {
        setIsChecked(false); // Reset state when clearForms is triggered
        onChange(name, ""); // Inform parent about the reset
      } else {
        setIsChecked(!!value); // Ensure proper boolean conversion
      }
    }, [clearForms, value, onChange, name]);
  
    // Handle checkbox toggle
    const handleCheckboxToggle = () => {
      const newValue = !isChecked;
      setIsChecked(newValue);
      onChange(name, newValue); // Inform parent of the new value
    };
  
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
  




const VideoUploader = ({ onChange,value ,name,clearForms}) => {
  const [youtubeUrl, setYoutubeUrl] = useState( value ||"");
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
  
    useEffect(() => {
      if (value) {
        const newCutLink = extractYoutubeUrl(value);
        setCutYoutubeUrl(newCutLink); // Set initial cutLink
        // if (newCutLink) setIsValid(true); // Validate if the initial value is valid
      }
    }, [value]);


  return (
    <div className="video-uploader mt-8">
      <label className="block sf-medium font-medium text-sm mb-2">YouTube Video URL</label>
      <Field
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

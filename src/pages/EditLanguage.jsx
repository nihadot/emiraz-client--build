import React, { useState } from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import axios from "axios";
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import { errorToast, successToast } from '../toast';
import { useLocation, useNavigate } from 'react-router-dom';

function EditLanguage() {
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    languageName: Yup.string()
      .required("City Name is required")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed"),
  });

  const { state } = useLocation();


  const [formData,setFormData] = useState({
    languageName:'',
  })

  const handleSubmit = async (values, { resetForm }) => {

  
    const data = {
      languageName: values.languageName
    };
    // }
  
   
      try {
        setIsLoading(true);
  
    const response = await axios.put(
      `${SERVER_URL}/banner/update-language/${formData._id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
        },
      }
    );
        successToast("Successfully added");
        navigate('/admin/view-language')
      
        setIsLoading(false);
        resetForm();
      } catch (error) {
        const errorMsg = error?.response?.data?.message || error?.message || "An error occurred during the operation.";
        errorToast(errorMsg);
        setIsLoading(false);
      }
    };


 

    React.useEffect(() => {
        if (state) {
    
          setFormData({
            languageName: state.languageName,
            _id: state._id

           });
      
        } else {
        //   fetchCitiesAPI()
        }
    
      }, [state]);
    
    //   const fetchCitiesAPI = async () => {
    //     try {
    //       const response = await axios.get(`${SERVER_URL}/city/${id}`);
    //       setFormData({
    //         cityName: response.data.result.cityName,
    //         emirateName: response.data.result.emirateName,
    //         priority: response.data.result.priority,
    //         _id: response.data.result._id,
    
    //       });
    
    //       setImageState({
    //         secure_url: response.data.result?.imageFile?.secure_url || '',
    //         url: response.data.result?.imageFile?.url || '',
    //         bytes: response.data.result?.imageFile?.bytes || '',
    //         width: response.data.result?.imageFile?.width || '',
    //         height: response.data.result?.imageFile?.height || '',
    //       });
    //     } catch (error) {
    //       errorToast(error?.response?.data?.message || error?.message || "error occur");
    //     }
    //   }


  return (
     <Formik
      initialValues={{
        languageName: "",...formData }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}

    >
      {({ setFieldValue, values, resetForm }) => (
        <Form className="flex flex-wrap max-w-[500px]">
          <div className="flex-1">
            {/* Language Name */}
            <div className="flex flex-col gap-2 ">
              <label htmlFor="languageName" className="sf-medium font-medium text-sm text-[#000000]">
                 Language    <span className="text-lg text-red-600">*</span>
              </label>
           

              <Field
                disabled={isLoading}
                name="languageName"
                type="text"
                placeholder="Language"
                className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666] outline-none"
              />
              <ErrorMessage name="languageName" component="div" className="text-red-500 text-sm" />
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


          

        </Form>
      )}
    </Formik>
  )
}

export default EditLanguage
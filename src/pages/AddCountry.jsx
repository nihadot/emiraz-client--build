import React, { useState } from 'react'
import * as Yup from "yup";
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import { errorToast, successToast } from '../toast';

import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';
import { SERVER_URL } from '../api';

function AddCountry() {
  const [isLoading, setIsLoading] = useState(false);


  const validationSchema = Yup.object().shape({
    countryName: Yup.string()
      .required("City Name is required")
      .min(3, "Minimum 3 characters required")
      .max(50, "Maximum 50 characters allowed"),
  });


  const handleSubmit = async (values, { resetForm }) => {

  
    const data = {
      countryName: values.countryName
    };
    // }
  
   
      try {
        setIsLoading(true);
  
    const response = await axios.post(
      `${SERVER_URL}/banner/create-country`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
        },
      }
    );
        successToast("Successfully added");
  
      
        setIsLoading(false);
        resetForm();
      } catch (error) {
        const errorMsg = error?.response?.data?.message || error?.message || "An error occurred during the operation.";
        errorToast(errorMsg);
        setIsLoading(false);
      }
    };

  return (
    <Formik
    initialValues={{
      countryName: "" }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ setFieldValue, values, resetForm }) => (
      <Form className="flex flex-wrap max-w-[500px]">
        <div className="flex-1">
          {/* Country Name */}
          <div className="flex flex-col gap-2 ">
            <label htmlFor="countryName" className="sf-medium font-medium text-sm text-[#000000]">
               Country    <span className="text-lg text-red-600">*</span>
            </label>
         

            <Field
              disabled={isLoading}
              name="countryName"
              type="text"
              placeholder="Language"
              className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666] outline-none"
            />
            <ErrorMessage name="countryName" component="div" className="text-red-500 text-sm" />
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

export default AddCountry
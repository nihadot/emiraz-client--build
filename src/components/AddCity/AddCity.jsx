import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { initialValues, prioritiesValues } from '../../utils/Schema/City/intialValues';
import { validationSchema } from '../../utils/Schema/City/validations';
import ValidationErrorMessage from '../Error/ValidationErrorMessage';
import InputField from '../InputFields/InputField';
import ImageUploader from '../InputFields/ImageUploader';
import { convertToFormData } from '../../utils/convertToFormData';
import { errorToast, successToast } from '../../toast';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import PriorityDropDown from '../InputFields/PriorityDropDown';
import CityListingCard from '../CityListingCard/CityListingCard';
import { addingCity, fetchCityUsedPriorityCount } from '../../services/city';
import { CLOUD_NAME, CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from '../../api/localstorage-varibles';
import axios from 'axios';

function AddCity() {
  // State to manage form submission loading status and message
  const [loadingState, setLoadingState] = useState({
    formSubmitting: false,
    message: '',
  });

  const [clearFormField, setClearFormField] = useState(false);

  // State to store used priority values fetched from the API
  const [usedPriorityValues, setUsedPriorityValues] = useState([]);


  const handleSubmit = async (values, { resetForm }) => {
    try {
      const { preview,cityImage, ...otherValues } = values;

      //  image is required
      if(!cityImage){
        return errorToast('Image is required');
      }

      // Filter out empty, null, or undefined fields from otherValues
      const cleanedValues = Object.fromEntries(
        Object.entries(otherValues).filter(([_, value]) => value !== null && value !== undefined && value !== "")
      );

      // Set the form as submitting
      setLoadingState({ ...loadingState, formSubmitting: true });

      // uploading image into cloud storage
      if(cityImage){
        const formData = new FormData();
        formData.append('file', cityImage);
        formData.append('upload_preset', CLOUDINARY_PERSISTENT); 
        formData.append('folder', 'cities_upload'); 

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${ CLOUDINARY_NAME}/image/upload`, // Replace your_cloud_name
          formData
        );
        // console.log(response.data);
        if (response?.data) {
          cleanedValues.imageFile = {
            asset_id: response.data.asset_id,
            secure_url: response.data.secure_url,
            url: response.data.url,
            public_id: response.data.public_id,
          };
        }
      }

      // Convert form values to FormData for image upload
      // const formDataFields = convertToFormData(cleanedValues);



      // API call to add a new city
      await addingCity(cleanedValues);
      setClearFormField(prev => !prev);
      // Update used priority values if priority is set
      values.priority && setUsedPriorityValues((prev) => [...prev, values.priority]);

      // Display success message and reset the form
      successToast("Successfully created");
      resetForm();
    } catch (error) {
      // Handle error and show error message
      errorToast(error?.response?.data?.message || error?.message || 'An error occurred');
    } finally {
      // Reset the loading state
      setLoadingState({ ...loadingState, formSubmitting: false });
    }
  };

  // Fetch priority values on component mount
  useEffect(() => {
    fetchPriorityData();
  }, []);


  const fetchPriorityData = async () => {
    try {
      const response = await fetchCityUsedPriorityCount();
      setUsedPriorityValues(response.result);
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex h-fit max-h-screen">
      <div className="flex-1">
        <Formik
          initialValues={initialValues} // Initial values for the form
          validationSchema={validationSchema} // Validation schema for the form
          onSubmit={handleSubmit} // Submission handler
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => (
            <div className="flex md:flex-row flex-col w-full">
              <Form className="flex-1 flex flex-col">
                {/* City Name Input Field */}
                <Wrapper>
                  <Field
                    name='name'
                    inputClassName={touched.name && '!pe-14 '}
                    as={InputField}
                    label='City Name'
                    placeholder='Dubai'
                    required
                    disabled={loadingState.formSubmitting} // Disable input if form is submitting
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name} // Validation error message
                    touched={touched.name} // Indicates if the field has been touched
                  />
                  <ValidationErrorMessage name={'name'} />
                </Wrapper>

                {/* Emirate Name Input Field */}
                <Wrapper>
                  <Field
                    name='emirateName'
                    inputClassName={touched.emirateName && '!pe-14 '}
                    as={InputField}
                    label='Emirate Name'
                    placeholder='Dubai'
                    required
                    disabled={loadingState.formSubmitting}
                    value={values.emirateName}
                    onChange={handleChange}
                    error={errors.emirateName}
                    touched={touched.emirateName}
                  />
                  <ValidationErrorMessage name={'emirateName'} />
                </Wrapper>

                {/* Priority Dropdown Field */}
                <Wrapper>
                  <PriorityDropDown
                    name='priority'
                    clearFormField={clearFormField}
                    label='Priority'
                    defaultValue={'None'}
                    placeholder={'Choose Priority'}
                    disabled={loadingState.formSubmitting}
                    onChange={(value) => setFieldValue("priority", value)}
                    options={prioritiesValues}
                    existValues={usedPriorityValues}
                  />
                </Wrapper>

                {/* Image Upload Field */}
                <Wrapper>
                  <Field
                    name='cityImage'
                    as={ImageUploader}
                    clearFormField={clearFormField}
                    titleOne={'Image'}
                    required
                    titleTwo={'Main image'}
                    disabled={loadingState.formSubmitting}
                    onChange={(e) => {
                      setFieldValue("cityImage", e.file);
                      setFieldValue("preview", e.preview);
                    }}
                  />
                  <ValidationErrorMessage name={'cityImage'} />
                </Wrapper>

                {/* Submit Button */}
                <div className="w-full flex md:justify-start justify-center items-center md:items-start mt-5 md:mt-0">
                  <button
                    type='submit'
                    disabled={loadingState.formSubmitting}
                    className='w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer'
                  >
                    {loadingState.formSubmitting ? 'Loading...' : 'Submit'}
                  </button>
                </div>
              </Form>

              {/* Preview Component - Only visible on larger screens */}
              <div className="flex-1 md:block hidden ms-10 mt-5">
                <CityListingCard values={values} />
               
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddCity;



function Wrapper({ children }) {
  return <div className='pb-3'>{children}</div>;
}




import React, { useEffect, useState } from 'react'
import { addingCity, fetchCityUsedPriorityCount } from '../../services/city';
import { addingDeveloper, fetchDeveloperUsedPriorityCount } from '../../services/developer';
import { errorToast, successToast } from '../../toast';
import { Field, Form, Formik } from 'formik';
import { initialValues, prioritiesValues } from '../../utils/Schema/Developer/intialValues';
import { validationSchema } from '../../utils/Schema/Developer/validations';
import InputField from '../InputFields/InputField';
import ValidationErrorMessage from '../Error/ValidationErrorMessage';
import PasswordInputField from '../InputFields/PasswordInputField';
import PriorityDropDown from '../InputFields/PriorityDropDown';
import ImageUploader from '../InputFields/ImageUploader';
import DeveloperListingCard from '../DeveloperListingCard/DeveloperListingCard';
import { convertToFormData } from '../../utils/convertToFormData';

function AddDeveloper() {

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

      // return true;
      const { preview, ...otherValues } = values;
      
      //  image is required
      if(!values.developerImage){
        return errorToast('Image is required');
      }
      console.log(values,'developers values ')

      // Filter out empty, null, or undefined fields from otherValues
      const cleanedValues = Object.fromEntries(
        Object.entries(otherValues).filter(([_, value]) => value !== null && value !== undefined && value !== "")
      );

      // Set the form as submitting
      setLoadingState({ ...loadingState, formSubmitting: true });

      // Convert form values to FormData for image upload
      const formDataFields = convertToFormData(cleanedValues);

      // API call to add a new city
      await addingDeveloper(formDataFields);

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
      const response = await fetchDeveloperUsedPriorityCount();
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
              {/* Developer Name Input Field */}
              <Wrapper>
                <Field
                  name='name'
                  inputClassName={touched.name && '!pe-14 '}
                  as={InputField}
                  label='Developer Name'
                  placeholder='Name'
                  required
                  disabled={loadingState.formSubmitting} // Disable input if form is submitting
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name} // Validation error message
                  touched={touched.name} // Indicates if the field has been touched
                />
                <ValidationErrorMessage name={'name'} />
              </Wrapper>

               {/* Username Input Field */}
               <Wrapper>
                <Field
                  name='username'
                  inputClassName={touched.username && '!pe-14 '}
                  as={InputField}
                  type={'text'}
                  label='Username'
                  placeholder='Username'
                  required
                  disabled={loadingState.formSubmitting}
                  value={values.username}
                  onChange={handleChange}
                  error={errors.username}
                  touched={touched.username}
                />
                <ValidationErrorMessage name={'username'} />
              </Wrapper>

                {/* Password Input Field */}
                <Wrapper>
                <Field
                  name='password'
                  inputClassName={touched.password && '!pe-14 '}
                  as={PasswordInputField}
                  type={'password'}
                  label='Password'
                  placeholder='Password'
                  required
                  disabled={loadingState.formSubmitting}
                  value={values.password}
                  onChange={handleChange}
                  error={errors.password}
                  touched={touched.password}
                />
                <ValidationErrorMessage name={'password'} />
              </Wrapper>


              {/* Priority Dropdown Field */}
              <Wrapper>
                <PriorityDropDown
                  name='priority'
                  label='Priority'
                  clearFormField={clearFormField}
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
                  name='developerImage'
                  as={ImageUploader}
                  titleOne={'Image'}
                  required
                  clearFormField={clearFormField}
                  v2={true}
                  titleTwo={'Main image'}
                  disabled={loadingState.formSubmitting}
                  onChange={(e) => {
                    setFieldValue("developerImage", e.file);
                    setFieldValue("preview", e.preview);
                  }}
                />
                <ValidationErrorMessage name={'developerImage'} />
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
              <DeveloperListingCard values={values} />
             
            </div>
          </div>
        )}
      </Formik>
    </div>
  </div>
  )
}

export default AddDeveloper



function Wrapper({ children }) {
    return <div className='pb-3'>{children}</div>;
  }
  
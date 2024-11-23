import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { initialValues } from '../../utils/Schema/AddPropertyType/intialValues';
import { validationSchema } from '../../utils/Schema/AddPropertyType/validations';
import InputField from '../InputFields/InputField';
import ValidationErrorMessage from '../Error/ValidationErrorMessage';
import ImageUploader from '../InputFields/ImageUploader';
import Preview from './Preview';
import { errorToast, successToast } from '../../toast';
import { convertToFormData } from '../../utils/convertToFormData'; // Function to convert form data
import { addPropertyTypeAPI } from '../../api'; // API to handle adding property types

/**
 * AdminAddPropertyType Component
 * Handles the form to add a new property type with image upload and validation.
 */
function AdminAddPropertyType() {

    // State to manage form submission loading status and message
    const [loadingState, setLoadingState] = useState({
        formSubmitting: false,
        message: '',
    });

    /**
     * handleSubmit - Handles the form submission, converts values to FormData, and triggers the API call.
     * @param {Object} values - Form values submitted
     * @param {Function} resetForm - Function to reset the form after submission
     */
    const handleSubmit = async (values, { resetForm }) => {
        try {
            // Set the form as submitting
            setLoadingState({ ...loadingState, formSubmitting: true });

            // Convert form values to FormData for image upload
            const formDataFields = convertToFormData(values);

            // API call to add a new property type
            await addPropertyTypeAPI(formDataFields);

            // Display success message and reset the form
            successToast("Property Type added successfully");
            resetForm();
        } catch (error) {
            // Handle error and show error message
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred');
        } finally {
            // Reset the loading state
            setLoadingState({ ...loadingState, formSubmitting: false });
        }
    };

    return (
        <div className="flex h-fit max-h-screen">
            <div className="flex-1">
                <Formik
                    initialValues={initialValues} // Initial values for the form
                    validationSchema={validationSchema} // Validation schema
                    onSubmit={handleSubmit} // Submission handler
                >
                    {({ values, handleChange, errors, touched, setFieldValue }) => (
                        <div className="flex md:flex-row flex-col w-full">
                            <Form className="flex-1 flex flex-col">

                                {/* Property Type Name Input Field */}
                                <Wrapper>
                                    <Field
                                        name='name'
                                        inputClassName={touched.name && '!pe-14 '}
                                        as={InputField}
                                        label='Property Type Name'
                                        placeholder='Apartment'
                                        required
                                        disabled={loadingState.formSubmitting} // Disable input if form is submitting
                                        value={values.name}
                                        onChange={handleChange} // Handle input changes
                                        error={errors.name} // Error message from validation
                                        touched={touched.name} // Indicates if the field has been touched
                                    />
                                    <ValidationErrorMessage name={'name'} /> {/* Display validation error */}
                                </Wrapper>

                                {/* Image Upload Field */}
                                <Wrapper>
                                    <Field
                                        name='propertyTypeImage'
                                        as={ImageUploader}
                                        titleOne={'Image'}
                                        titleTwo={'Main image'}
                                        disabled={loadingState.formSubmitting} // Disable input if form is submitting
                                        onChange={e => {
                                            setFieldValue("propertyTypeImage", e.file); // Set image file
                                            setFieldValue("preview", e.preview); // Set image preview for the preview component
                                        }}
                                    />
                                </Wrapper>

                                {/* Submit Button */}
                                <div className="w-full flex md:justify-start justify-center items-center md:items-start mt-5 md:mt-0">
                                    <button
                                        type='submit'
                                        disabled={loadingState.formSubmitting} // Disable button if form is submitting
                                        className='w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer'
                                    >
                                        {loadingState.formSubmitting ? 'Loading...' : 'Submit'}
                                    </button>
                                </div>
                            </Form>

                            {/* Preview Component - Only visible on larger screens */}
                            <div className="flex-1 md:block hidden ms-10 mt-5">
                                <Preview preview values={values} /> {/* Passing form values to preview */}
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AdminAddPropertyType;

/**
 * Wrapper Component
 * A reusable component to provide consistent padding around form fields.
 * @param {Object} children - The child components to wrap.
 */
function Wrapper({ children }) {
    return (
        <div className='pb-3'>
            {children}
        </div>
    );
}

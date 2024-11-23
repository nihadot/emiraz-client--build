import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import InputField from '../InputFields/InputField';
import dayjs from 'dayjs';
import MultipleFields from '../InputFields/MultipleFields';
import Textarea from '../InputFields/Textarea';
import GoogleMapField from '../InputFields/GoogleMapField';
import Dropdown from '../InputFields/Dropdown';
import DynamicTextInputField from '../InputFields/DynamicTextInputField';
import VideoField from '../InputFields/VideoField';
import ImageUploader from '../InputFields/ImageUploader';
import MultipleImageUploader from '../InputFields/MultipleImageUploader';
import { validationSchema } from '../../utils/Schema/Project/validations';
import { validatePriceInput } from '../../utils/validatePriceInput';
import { custLinkURl } from '../../utils/custLinkURl';
import { initialValues } from '../../utils/Schema/Project/initialValues';
import ValidationErrorMessage from '../Error/ValidationErrorMessage';
import { fetchPropertyTypeAPI, fetchPropertyTypesRequiredFields, SERVER_URL } from '../../api';
import { addingProject, fetchProjectUsedPriorityCount } from '../../services/project';
import { errorToast, successToast } from '../../toast';
import { fetchAllCitiesAPI, fetchBothTypeCitiesAPI } from '../../services/city';
import { fetchBothTypeDevelopersAPI } from '../../services/developer';
import PriorityDropDown from '../InputFields/PriorityDropDown';
import { prioritiesValues } from '../../utils/Schema/Project/initialValues';
import PropertyListingCard from "../PropertyListingCard/PropertyListingCard"
import PropertyListingCardC from '../PropertyListingCard/PropertyListingCardC';
import PropertyListingCardCC from '../PropertyListingCard/PropertyListingCardCC';
import { convertToFormData } from '../../utils/convertToFormData';





// Utility function to format price with commas

function AdminAddProject() {
  const [loadingState, setLoadingState] = useState({
    formSubmitting: false,
    message: '',
  });

  const [clearFormField,setClearFormField] = useState(false)

  // State to store used priority values fetched from the API
  const [usedPriorityValues, setUsedPriorityValues] = useState([]);
  
  const [cities, setCities] = useState([]);
  const [developers,setDevelopers] = useState([]);
  const [submitType, setSubmitType] = useState(null); // To store whether it's 'submit' or 'draft'
  // Handle form submission

  const clearAllFieldsDynamicForm = () => {
    clearAllDynamicFields();
  }
  const handleSubmit = async (values,{resetForm}) => {

    try {

      


      // form fi

      const { preview,projectImages,projectImagesPreview, ...otherValues } = values;
  // console.log(values,'---')
  //     return true
         //  image is required
         if(!values.projectImage){
          return errorToast('Image is required');
        }

        if(submitType === 'draft'){
          otherValues.isDraft = 'draft';
        }
  
  
        // Filter out empty, null, or undefined fields from otherValues
        const cleanedValues = Object.fromEntries(
          Object.entries(otherValues).filter(([_, value]) => value !== null && value !== undefined && value !== "")
        );


          // Append each selected image file to the FormData

  
              // Set the form as submitting
              // setLoadingState({ ...loadingState, formSubmitting: true });
  
              // Convert form values to FormData for image upload
              const formDataFields = convertToFormData(cleanedValues);
        
              if(values?.projectImages?.length > 0){
                const selectedFiles = values?.projectImages;
              
                selectedFiles.forEach((file, index) => {
                  formDataFields.append(`projectImages`, file);
                });
              
              }
              
              setLoadingState({ ...loadingState, formSubmitting: true });

               // API call to add a new city
        await addingProject(formDataFields).then((response)=>{

          setClearFormField(prev => !prev);


          setUsedPriorityValues(prev => [...prev, Number(values.priority)] )
          successToast('Project added successfully!');
          resetForm();  
  
        })
      
    } catch (err) {
      
      errorToast(err?.response?.data?.message  || err?.message)
    }finally{
      setLoadingState({ ...loadingState, formSubmitting: false });

    }

  



    // console.log('Form data:', values);
    // setTimeout(() => {
    // }, 1000);
  };


  useEffect(()=>{
    fetchInitialAPIs()
  },[]);


  const fetchInitialAPIs =async ()=>{
    try {
      const response = await fetchProjectUsedPriorityCount();
      setUsedPriorityValues(response.result);
      const response_cities = await fetchBothTypeCitiesAPI();
      setCities(response_cities.result);
      setUsedPriorityValues(response.result);
      const response_developer = await fetchBothTypeDevelopersAPI();
      setDevelopers(response_developer.result);
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'An error occurred');
    }
  }

  // const uploadSmallImageButton = () => uploadSmallImage.current.click();
  // uploadSmallImage
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, errors, touched, setFieldValue }) => (
            <div className="flex md:flex-row flex-col w-full">

        <Form className='w-[50%]'>


          {/* Project Title Input Field */}
          <Wrapper>

          <Field
            name='name'
            inputClassName={touched?.name && '!pe-14 '}
            as={InputField}
            label='Project Title'
            placeholder='Parkside Hills'
            required
            disabled={loadingState?.formSubmitting}
            value={values?.name}
            onChange={handleChange}
            error={errors?.name}
            touched={touched?.name}
          />
          <ValidationErrorMessage name={'name'} />
          </Wrapper>



          <Wrapper>
          {/* Project Price (in AED) Input Field */}
          <Field
            inputClassName={touched?.priceInAED && '!pe-14 '}
            name='priceInAED'
            as={InputField}
            label='Project Price (in AED)'
            placeholder='4M'
            required
            disabled={loadingState?.formSubmitting}
            value={values?.priceInAED}
            onChange={e =>
              setFieldValue(
                'priceInAED',
                validatePriceInput(e?.target?.value)
              )
            }
            error={errors?.priceInAED}
            touched={touched?.priceInAED}
          />
          <ValidationErrorMessage name={'priceInAED'} />
          </Wrapper>


          <Wrapper>
          {/* Project Price (in USD) Input Field */}
          <Field
            inputClassName={touched?.priceInUSD && '!pe-14 '}
            name='priceInUSD'
            as={InputField}
            label='Enter Project Price (in USD)'
            placeholder='4M'
            required
            disabled={loadingState?.formSubmitting}
            value={values?.priceInUSD}
            onChange={e =>
              setFieldValue(
                'priceInUSD',
                validatePriceInput(e?.target?.value)
              )
            }
            error={errors?.priceInUSD}
            touched={touched?.priceInUSD}
          />
          <ValidationErrorMessage name={'priceInUSD'} />
          </Wrapper>


          <Wrapper>
          {/* Project Price (in INR) Input Field */}
          <Field
            inputClassName={touched?.priceInINR && '!pe-14 '}
            name='priceInINR'
            as={InputField}
            label='Project Price (in INR)'
            placeholder='4M'
            required
            disabled={loadingState?.formSubmitting}
            value={values?.priceInINR}
            onChange={e =>
              setFieldValue(
                'priceInINR',
                validatePriceInput(e?.target?.value)
              )
            }
            error={errors?.priceInINR}
            touched={touched?.priceInINR}
          />
          <ValidationErrorMessage name={'priceInINR'} />
          </Wrapper>


          <Wrapper>
          {/* Handover Date Input Field */}
          <Field
            name='handoverDate'
            as={InputField}
            type='date'
            inputClassName={touched?.handoverDate && '!pe-16 '}
            label='Handover Date'
            disabled={loadingState?.formSubmitting}
            min={dayjs().format('YYYY-MM-DD')} // Disable past dates
            value={values?.handoverDate}
            onChange={handleChange}
            error={errors?.handoverDate}
            touched={touched?.handoverDate}
          />
          <ValidationErrorMessage name={'handoverDate'} />
          </Wrapper>


          <Wrapper>
          {/* Bedrooms Input Field - Optional Field */}
          <Field
            inputClassName={touched?.bedrooms && '!pe-14 '}
            name='bedrooms'
            as={InputField}
            label='Bedrooms'
            required
            placeholder='Enter Number of Bedrooms'
            disabled={loadingState?.formSubmitting}
            value={values?.bedrooms}
            onChange={handleChange}
            error={errors?.bedrooms} // Only show error if touched and there's an error
            touched={touched?.bedrooms}
          />
          <ValidationErrorMessage name={'bedrooms'} />
          </Wrapper>


          <Wrapper>
          {/* Multi-Select Field for Property Type */}
          <Field
            name='projectTypes'
            as={MultipleFields}
            label='Property Type'
            clearFormField={clearFormField}
            required
            disabled={loadingState?.formSubmitting}
            options={[
              { name: 'villa', _id: 'villa' },
              { name: 'apartment', _id: 'apartment' },
              { name: 'penthouse', _id: 'penthouse' },
              { name: 'townhouse', _id: 'townhouse' },
            ]}
            handleOnchange={selectedOptions => {
              setFieldValue('projectTypes', selectedOptions);
            }}
            error={errors?.projectTypes}
            touched={touched?.projectTypes}
          />
          <ValidationErrorMessage name={'projectTypes'} />
          </Wrapper>

<Wrapper>


          {/* Multi-Select Field for Cities */}
          <Field
            name='projectCities'
            as={MultipleFields}
            label='property Cities'
            clearFormField={clearFormField}
            required
            disabled={loadingState?.formSubmitting}
            options={cities}
            handleOnchange={selectedOptions => {
              setFieldValue('projectCities', selectedOptions);
            }}
            error={errors?.projectCities}
            touched={touched?.projectCities}
          />
          <ValidationErrorMessage name={'projectCities'} />
          </Wrapper>


          <Wrapper>

          {/* <div className="mt-6 flex items-center gap-3">
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
        </div> */}


          </Wrapper>



<Wrapper>

          {/* Location Map  */}
          <Field
            name='projectMapLink'
            as={GoogleMapField}
            label='Project Map Link'
            placeholder='Google Map link'
            disabled={loadingState?.formSubmitting}
            value={values?.projectMapLink}
            onChange={e => {
              const link = custLinkURl(e?.target?.value);
              setFieldValue('projectMapLink', link);
            }}
            cols={10}
            rows={3}
          />
</Wrapper>




<Wrapper>

          {/* Address  */}
          <Field
            name='address'
            as={Textarea}
            label='Address'
            placeholder='Address type here...'
            disabled={loadingState?.formSubmitting}
            value={values?.address}
            onChange={handleChange}
            cols={10}
            rows={3}
          />
</Wrapper>


<Wrapper>

          {/* Description  */}
          <Field
            name='description'
            as={Textarea}
            label='Description'
            placeholder='Type here...'
            disabled={loadingState?.formSubmitting}
            value={values?.description}
            onChange={handleChange}
            cols={10}
            rows={10}
          />
</Wrapper>
<Wrapper>


          {/* Developer  */}
          <Field
            name='developer'
            as={Dropdown}
            label='Developer'
            placeholder={'Select Developer'}
            required
            clearFormField={clearFormField}

            disabled={loadingState?.formSubmitting}
            value={values?.developer}
            onChange={(value) => {
              const filteredItem = developers?.find((item)=> item?._id === value )
              setFieldValue("developer", value)
              setFieldValue("developerName",filteredItem?.name);
            }}
            options={developers}
            error={errors?.developer}
            touched={touched?.developer}
            cols={10}
            rows={10}
          />
          <ValidationErrorMessage name={'developer'} />
          </Wrapper>

<Wrapper>

          {/* Facilities and Amenities  */}
          <Field
            name='facilitiesAndAmenities'
            as={DynamicTextInputField}
            clearFormField={clearFormField}

            clearAllFields={loadingState?.formSubmitting}
            value={values?.facilitiesAndAmenities}
            label='Facilities and Amenities'
            disabled={loadingState?.formSubmitting}
            onChange={(value) => setFieldValue("facilitiesAndAmenities", value)}
            error={errors?.facilitiesAndAmenities}
            touched={touched?.facilitiesAndAmenities}
            placeholder={'Type here...'}
            type="text"
            id="facilitiesAndAmenities"
          />
          <ValidationErrorMessage name={'facilitiesAndAmenities'} />
          </Wrapper>

<Wrapper>



          {/* Payment Plan  */}
          <Field
            name='paymentPlan'
            as={DynamicTextInputField}
            clearAllFields={loadingState?.formSubmitting}
            clearFormField={clearFormField}

            label='Payment Plan'
            disabled={loadingState?.formSubmitting}
            onChange={(value) => setFieldValue("paymentPlan", value)}
            error={errors?.paymentPlan}
            touched={touched?.paymentPlan}
            placeholder={'Type here...'}
            type="text"
            id="paymentPlan"
          />
          <ValidationErrorMessage name={'paymentPlan'} />

          </Wrapper>

<Wrapper>



          {/* areasNearby  */}
          <Field
            name='areasNearby'
            as={DynamicTextInputField}
            label='Areas Nearby'
            clearFormField={clearFormField}

            clearAllFields={loadingState?.formSubmitting}

            disabled={loadingState?.formSubmitting}
            onChange={(value) => setFieldValue("areasNearby", value)}
            error={errors?.areasNearby}
            touched={touched?.areasNearby}
            placeholder={'Type here...'}
            type="text"
            id="areasNearby"
          />
          <ValidationErrorMessage name={'areasNearby'} />
          </Wrapper>
<Wrapper>


                 {/* Priority Dropdown Field */}
                 <Wrapper>
                  <PriorityDropDown
                    name='priority'
                    label='Priority'
            clearFormField={clearFormField}

                    defaultValue={'None'}
                    placeholder={'Choose Priority'}
                    disabled={loadingState?.formSubmitting}
                    onChange={(value) => setFieldValue("priority", value)}
                    options={prioritiesValues}
                    existValues={usedPriorityValues}
                  />
                </Wrapper>

                </Wrapper>

<Wrapper>

          {/* Advertisement  */}
          <Field
            name='advertisement'
            as={Dropdown}
            placeholder={'Choose Advertisement'}
            label='advertisement'
            disabled={loadingState?.formSubmitting}
            value={values?.advertisement}
            onChange={(value) => setFieldValue("advertisement", value)}
            options={[{ name: '1', _id: 1 }, { name: '2', _id: 2 }]}
          />
          <ValidationErrorMessage name={'advertisement'} />
          </Wrapper>

<Wrapper>


          {/* Project Title Input Field */}
          <Field
            name='projectNumber'
            // inputClassName={touched.projectHandoverDate && '!pe-14 '}
            as={InputField}
            label='Project Number'
            placeholder='#26456'
            // required
            disabled={loadingState?.formSubmitting}
            value={values?.projectNumber}
            onChange={handleChange}
            error={errors?.projectNumber}
            touched={touched?.projectNumber}
          />
          <ValidationErrorMessage name={'projectNumber'} />
          </Wrapper>



<Wrapper>

          {/* Video Field */}
          <Field
            name='projectVideoLink'
            as={VideoField}
            label='Project Video Link'
            placeholder='Youtube video link'
            disabled={loadingState?.formSubmitting}
            value={values?.projectVideoLink}
            onChange={e => {
              const link = custLinkURl(e?.target?.value);
              setFieldValue('projectVideoLink', link);
            }}
            error={errors?.projectVideoLink}
            touched={touched?.projectVideoLink}
          />
          <ValidationErrorMessage name={'projectVideoLink'} />
          </Wrapper>
<Wrapper>



          {/* Main IMage Upload Field */}
          <Field
            name='projectImage'
            required
            as={ImageUploader}
            clearFormField={clearFormField}
            titleOne={'Image'}
            titleTwo={'Main image'}
            disabled={loadingState?.formSubmitting}
            onChange={(e) => {
              setFieldValue("projectImage", e?.file);
              setFieldValue("preview", e?.preview);
            }}

          />
          <ValidationErrorMessage name={'projectImage'} />

          </Wrapper>




          <Wrapper>



{/* Main IMage Upload Field */}
<Field
  name='projectImages'
  as={MultipleImageUploader}
  titleOne={'Image'}
  clearFormField={clearFormField}
  titleTwo={'Main image'}
  disabled={loadingState?.formSubmitting}
  onChange={(e) => {
    setFieldValue("projectImagesPreview", e);
    setFieldValue("projectImages", e);
  }}

/>
<ValidationErrorMessage name={'projectImages'} />

</Wrapper>


          {/* Post Payment Handover Plan */}
<Wrapper>
  <div className="">
    
    <input type="checkbox"  checked={values.postPaymentHandoverPlan}   name='postPaymentHandoverPlan' onChange={e => setFieldValue('postPaymentHandoverPlan', e.target.checked)} className='me-2'  />
    <label htmlFor="">Post Payment Handover Plan</label>
  </div>
</Wrapper>

{/* <Wrapper> */}




          {/* Main Image Upload Field */}
          {/* <Field
            name='projectImages'
            as={MultipleImageUploader}

            disabled={loadingState.formSubmitting}
            onChange={e => {
              setFieldValue("projectImages", e);
            }}

          />
          <ValidationErrorMessage name={'projectImages'} />

          </Wrapper> */}



<div className="flex gap-2">

          <button
            type='submit'
            disabled={loadingState?.formSubmitting}
            onClick={() => setSubmitType('submit')} // Set submit type for form submission
            className='w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer'
          >
            {loadingState?.formSubmitting ? 'Loading...' : 'Submit'}
          </button>


          <button
            type='submit'
            disabled={loadingState?.formSubmitting}
            onClick={() => setSubmitType('draft')} // Set draft type for form submission
            className='w-32 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer'
          >
            {loadingState?.formSubmitting ? 'Loading...' : 'Draft'}
          </button>

          </div>

        </Form>


           {/* Preview Component - Only visible on larger screens */}
           <div className="w-[50%] md:block hidden ms-10 mt-5">
                { values?.name &&  <div className='sticky top-0 left-0'> <PropertyListingCard preview  user  item={values} /> </div> }
              </div>


        </div>
      )}
    </Formik>
  );
}

export default AdminAddProject;



function Wrapper({ children }) {
  return <div className='pb-3'>{children}</div>;
}

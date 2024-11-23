import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCityFromProjectById, deleteProjectImage, deleteProjectTypeFromProjectById, editProjectById, fetchProjectById } from '../../services/project';
import { CITY_IMAG_URL, fetchCityUsedPriorityCount, PROJECT_MAIN_IMAGE_URL, PROJECT_SUB_IMAGE_URL } from '../../api';
import { Field, Form, Formik } from 'formik';
import { initialValues as defaultInitialValues, prioritiesValues } from '../../utils/Schema/Project/initialValues';
import { validationSchema } from '../../utils/Schema/Project/validations';
import InputField from '../InputFields/InputField';
import ValidationErrorMessage from '../Error/ValidationErrorMessage';
import dayjs from 'dayjs';
import { convertToFormData } from '../../utils/convertToFormData';
import { validatePriceInput } from '../../utils/validatePriceInput';
import MultipleFields from '../InputFields/MultipleFields';
import { fetchAllCitiesAPI, fetchAllPriorityCitiesAPI } from '../../services/city';
import { IoClose } from 'react-icons/io5';
import { errorToast, successToast } from '../../toast';
import { deleteCityFromProject } from '../../../../property-seller-apis/controllers/project/deleteCityFromProject';
import GoogleMapField from '../InputFields/GoogleMapField';
import { custLinkURl } from '../../utils/custLinkURl';
import Textarea from '../InputFields/Textarea';
import DynamicTextInputField from '../InputFields/DynamicTextInputField';
import PriorityDropDown from '../InputFields/PriorityDropDown';
import MultipleImageUploader from '../InputFields/MultipleImageUploader';
import ImageUploader from '../InputFields/ImageUploader';
import VideoField from '../InputFields/VideoField';
import Dropdown from '../InputFields/Dropdown';
import { fetchBothTypeDevelopersAPI } from '../../services/developer';
import PlaceHolder from "../../assets/placeholder/placeholder-image.png"
import { FaTrash } from 'react-icons/fa';
import UploadingImage from '../uploading/UploadingImage';
import PropertyListingCard from '../PropertyListingCard/PropertyListingCard';
function AdminEditProject() {


  const { projects } = useSelector((state) => state.property);
  const { projectId } = useParams();
  const [data, setData] = useState(null); // Initial data is null
  const [usedPriorityValues, setUsedPriorityValues] = useState([]);
  const [loadingState, setLoadingState] = useState({ loading: false, message: '', formSubmitting: false });
  const navigate = useNavigate();
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState('');

  const [allCities, setAllCities] = useState([]);
  const [existingCity, setExistingCity] = useState([]);
  const [state, setState] = useState({
    prioritiesArray: [],
    citiesArray: [],
  });

  const [existingDeveloper, setExistingDeveloper] = useState({});

  const [cities, setCities] = useState([]);


  const [projectTypes, setProjectTypes] = useState([
    { name: 'villa', _id: 'villa' },
    { name: 'apartment', _id: 'apartment' },
    { name: 'penthouse', _id: 'penthouse' },
    { name: 'townhouse', _id: 'townhouse' },
  ]);
  useEffect(() => {
    if (projects?.length > 0) {
      const result = projects.find(({ _id }) => _id === projectId);
      setData(result || {});
      setExistingCity(result?.citiesInfo || []);
    } else {
      fetchdata();
    }
    fetchPriorityData();
    fetchInitialDataAPI();
  }, [projects]);

  const [currentValue, setCurrentValue] = useState({ name: '', _id: '' });
  const [allDevelopers, setAllDevelopers] = useState([]);
  useEffect(() => {
    if (data?.priority) {
      setCurrentValue({ name: data?.priority, _id: data?.priority });
    }
  }, [data?.priority]);

  const fetchdata = async () => {
    try {
      const response = await fetchProjectById(projectId);
      setData(response.result || {});
      setExistingCity(response?.result?.citiesInfo || []);


    } catch (error) {
      console.error('An error occurred ', error);
    }
  };

  const fetchInitialDataAPI = async () => {
    try {
      const responsePriorityCities = await fetchAllPriorityCitiesAPI();
      setState(prev => {
        if (prev) {
          return { ...prev, prioritiesArray: responsePriorityCities.result }
        }
      });
      const responseAllCities = await fetchAllCitiesAPI();
      setState(prev => {
        if (prev) {
          return { ...prev, citiesArray: responseAllCities.result }
        }
      });


      const response_developer = await fetchBothTypeDevelopersAPI();
      setAllDevelopers(response_developer.result);
    } catch (error) {
      console.error('An error occurred ', error);
    }
  };

  const [filteredCities, setFilteredCities] = useState([]);


  // merge priorities and cities
  useEffect(() => {
    // const combinedArray = [...state.prioritiesArray, ...state.citiesArray];
    // console.log(data.citiesInfo,'data.citiesInfo')
    // console.log(data?.citiesInfo, 'combinedArray')
    // if(data?.citiesInfo?.length > 0 ){
    // console.log(data.citiesInfo,'data.citiesInfo')
    // const citiesIds = data?.citiesInfo?.map((item)=> item._id+'' )
    // const filteredCities = combinedArray.filter((item)=> !(citiesIds.includes(item._id+'')))
    // setCities(filteredCities);
    // }

    setAllCities([...state.prioritiesArray, ...state.citiesArray]);
  }, [state.citiesArray, state.prioritiesArray, data?.citiesInfo]);


  // use selected cities removes from cities state then update the cities state
  // useEffect(()=>{
  //   console.log(data,'data')
  //   if(data?.projectCities?.length > 0 && cities?.length > 0){

  //     const citiesIds = data?.projectCities;
  //     const filteredCities = cities.filter((item)=> !(citiesIds.includes(item._id+'')))
  //     console.log(filteredCities,'filteredCities')
  //     setFilteredCities(filteredCities);
  //   }else{
  //     setFilteredCities(cities);
  //   }
  // },[cities,data?.projectCities]);


  const [filteredPropertyTypes, setFilteredPropertyTypes] = useState([]);

  console.log(data)
  // user selected property type removes from property types state then update the property state
  useEffect(() => {
    if (data?.projectTypes?.length > 0) {
      // console.log(data?.projectTypes?.length,'data?.projectTypes?.length')
      const propertyTypeNames = data?.projectTypes;
      // console.log(propertyTypeNames,'propertyTypeNames')
      const filteredCities = projectTypes.filter((item) => !(propertyTypeNames.includes(item.name)))
      //  console.log(filteredCities,'filteredCities')
      setProjectTypes(filteredCities);
    } else {
      setProjectTypes(projectTypes);
    }
  }, [data?.projectTypes]);


  useEffect(() => {

    if (data?.developer) {
      setExistingDeveloper(data?.developerInfo)
    }

  }, [data?.developer])



  const fetchPriorityData = async () => {
    try {
      const response = await fetchCityUsedPriorityCount();
      setUsedPriorityValues(response.result);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  useEffect(() => {
    console.log(allCities, 'allCities')
    console.log(existingCity, 'existingCity')
    if (allCities?.length > 0) {
      const existingCityIds = existingCity.map((item) => item._id + '');
      const filteredCities = allCities.filter((item) => !(existingCityIds.includes(item._id + '')));
      setFilteredCities(filteredCities);
    }
  }, [existingCity, allCities])



  const handleRemovePreviewImage = () => {
    setPreview("");
  }

  console.log(cities, 'cities')


  const handleSubmit = async (values, { resetForm }) => {
    // Submission logic
    try {

      const { preview,projectImages, ...otherValues } = values;

      const data = {
        ...otherValues,
      }

      if (imageFile) {
        data.projectImage = imageFile;
      }

      if (!data?.imageLink) {
        errorToast('Image is required')
      }

      // if(data?.projectTypes?.length === 0){
      //   return errorToast('Please select property type')
      // }

      // if(data?.citiesInfo?.length === 0){
      //   return errorToast('Please select city')
      // }

      const cleanedValues = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null && value !== undefined && value !== "")
      );



      // Set the form as submitting
      setLoadingState({ ...loadingState, formSubmitting: true });



      // Convert form values to FormData for image upload
      const formDataFields = convertToFormData(cleanedValues);

      if(values?.projectImages?.length > 0){
        const selectedFiles = values?.projectImages;
      
        selectedFiles.forEach((file, index) => {
          formDataFields.append(`projectImages`, file);
        });
      
      }

      // API call to add a new city
      const response = await editProjectById(formDataFields, projectId);
      // Display success message and reset the form
      successToast("Successfully updated");
      resetForm()
      navigate('/admin/view-projects');


    } catch (error) {
      // Handle error and show error message
      errorToast(error?.response?.data?.message || error?.message || 'An error occurred');
    } finally {
      // Reset the loading state
      setLoadingState({ ...loadingState, formSubmitting: false });
    }


  };


  const handleDeleteCity = async (cityId) => {
    console.log(cityId, '----')
    try {
      const status = confirm("Are you want to delete!");
      if (!status) return true;
      const response = await deleteCityFromProjectById(cityId, projectId);
      navigate('/admin/view-projects');
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'An error occurred');
    }
  }

  const handleDeletePropertyType = async (cityId) => {
    try {
      const status = confirm("Are you want to delete!");
      if (!status) return true;
      const response = await deleteProjectTypeFromProjectById(cityId, projectId);
      navigate('/admin/view-projects');
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'An error occurred');
    }
  }


  const handleRemoveImage = async(image)=>{
    try {
      const status = confirm("Are you want to delete!");
      if (!status) return true;
    await deleteProjectImage(image, projectId);
      navigate('/admin/view-projects');
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'An error occurred');
    }
  }


  return (

    <div className="flex h-fit max-h-screen">
      <div className="flex-1">
        {data && <Formik
          initialValues={{ ...defaultInitialValues, ...data, handoverDate: dayjs(data?.handoverDate).format('YYYY-MM-DD') }}
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
                    inputClassName={touched.name && '!pe-14 '}
                    as={InputField}
                    label='Project Title'
                    placeholder='Parkside Hills'
                    required
                    disabled={loadingState.formSubmitting}
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    touched={touched.name}
                  />
                  <ValidationErrorMessage name={'name'} />
                </Wrapper>



                <Wrapper>
                  {/* Project Price (in AED) Input Field */}
                  <Field
                    inputClassName={touched.priceInAED && '!pe-14 '}
                    name='priceInAED'
                    as={InputField}
                    label='Project Price (in AED)'
                    placeholder='4M'
                    required
                    disabled={loadingState.formSubmitting}
                    value={values.priceInAED}
                    onChange={e =>
                      setFieldValue(
                        'priceInAED',
                        validatePriceInput(e.target.value)
                      )
                    }
                    error={errors.priceInAED}
                    touched={touched.priceInAED}
                  />
                  <ValidationErrorMessage name={'priceInAED'} />
                </Wrapper>


                <Wrapper>
                  {/* Project Price (in USD) Input Field */}
                  <Field
                    inputClassName={touched.priceInUSD && '!pe-14 '}
                    name='priceInUSD'
                    as={InputField}
                    label='Enter Project Price (in USD)'
                    placeholder='4M'
                    required
                    disabled={loadingState.formSubmitting}
                    value={values.priceInUSD}
                    onChange={e =>
                      setFieldValue(
                        'priceInUSD',
                        validatePriceInput(e.target.value)
                      )
                    }
                    error={errors.priceInUSD}
                    touched={touched.priceInUSD}
                  />
                  <ValidationErrorMessage name={'priceInUSD'} />
                </Wrapper>


                <Wrapper>
                  {/* Project Price (in INR) Input Field */}
                  <Field
                    inputClassName={touched.priceInINR && '!pe-14 '}
                    name='priceInINR'
                    as={InputField}
                    label='Project Price (in INR)'
                    placeholder='4M'
                    required
                    disabled={loadingState.formSubmitting}
                    value={values.priceInINR}
                    onChange={e =>
                      setFieldValue(
                        'priceInINR',
                        validatePriceInput(e.target.value)
                      )
                    }
                    error={errors.priceInINR}
                    touched={touched.priceInINR}
                  />
                  <ValidationErrorMessage name={'priceInINR'} />
                </Wrapper>


                <Wrapper>
                  {/* Handover Date Input Field */}
                  <Field
                    name='handoverDate'
                    as={InputField}
                    type='date'
                    inputClassName={touched.handoverDate && '!pe-16 '}
                    label='Handover Date'
                    disabled={loadingState.formSubmitting}
                    min={dayjs().format('YYYY-MM-DD')} // Disable past dates
                    value={values.handoverDate}
                    onChange={handleChange}
                    error={errors.handoverDate}
                    touched={touched.handoverDate}
                  />
                  <ValidationErrorMessage name={'handoverDate'} />
                </Wrapper>


                <Wrapper>
                  {/* Bedrooms Input Field - Optional Field */}
                  <Field
                    inputClassName={touched.bedrooms && '!pe-14 '}
                    name='bedrooms'
                    as={InputField}
                    label='Bedrooms'
                    required
                    placeholder='Enter Number of Bedrooms'
                    disabled={loadingState.formSubmitting}
                    value={values.bedrooms}
                    onChange={handleChange}
                    error={errors.bedrooms} // Only show error if touched and there's an error
                    touched={touched.bedrooms}
                  />
                  <ValidationErrorMessage name={'bedrooms'} />
                </Wrapper>




                <Wrapper>
                  {/* Multi-Select Field for Property Type */}
                  <Field
                    name='projectTypes'
                    as={MultipleFields}
                    label='Property Type'
                    required
                    disabled={loadingState.formSubmitting}
                    options={projectTypes}
                    handleOnchange={selectedOptions => {
                      setFieldValue('projectTypes', selectedOptions);
                    }}
                    error={errors.projectTypes}
                    touched={touched.projectTypes}
                  />
                  <ValidationErrorMessage name={'projectTypes'} />


                  <div className="text-xs text-black flex gap-3 mt-3 w-fit">


                    {data?.projectTypes?.length > 0 && data?.projectTypes?.map((item, index) => {
                      return (
                        <div key={index} className="p-3 flex justify-center border rounded items-center relative">
                          <label htmlFor="" className='capitalize'> {item}</label>
                          <label htmlFor="" className=' text-[10px] ms-3 hover:underline cursor-pointer text-red-600' onClick={() => handleDeletePropertyType(item)}>Delete</label>
                        </div>
                      )
                    })}




                  </div>
                </Wrapper>

                <Wrapper>

                  {/* Multi-Select Field for Cities */}
                  <Field
                    name='projectCities'
                    as={MultipleFields}
                    label='property Cities'
                    required
                    disabled={loadingState.formSubmitting}
                    options={filteredCities}
                    handleOnchange={selectedOptions => {
                      setFieldValue('projectCities', selectedOptions);
                    }}
                    error={errors.projectCities}
                    touched={touched.projectCities}
                  />
                  <ValidationErrorMessage name={'projectCities'} />

                  <div className="text-xs text-black flex gap-3 mt-3 w-fit">


                    {data?.citiesInfo?.length > 0 && data?.citiesInfo?.map((item, index) => {
                      return (
                        <div key={index} className="p-3 flex justify-center border rounded items-center relative">
                          <label htmlFor="" className='capitalize'> {item?.name}</label>
                          <label htmlFor="" className=' text-[10px] ms-3 hover:underline cursor-pointer text-red-600' onClick={() => handleDeleteCity(item?._id)}>Delete</label>
                        </div>
                      )
                    })}




                  </div>
                </Wrapper>



                <Wrapper>
                  {/* Location Map  */}
                  <Field
                    name='projectMapLink'
                    as={GoogleMapField}
                    label='Project Map Link'
                    placeholder='Google Map link'
                    disabled={loadingState.formSubmitting}
                    value={values.projectMapLink}
                    onChange={e => {
                      const link = custLinkURl(e.target.value);
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
                    disabled={loadingState.formSubmitting}
                    value={values.address}
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
                    disabled={loadingState.formSubmitting}
                    value={values.description}
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
                    disabled={loadingState?.formSubmitting}
                    existValue={existingDeveloper}
                    value={values?.developer}
                    onChange={(value) => {
                      const filteredItem = allDevelopers?.find((item) => item?._id === value)
                      setFieldValue("developer", value)
                      setFieldValue("developerName", filteredItem?.name);
                    }}
                    options={allDevelopers}
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
                    label='Facilities and Amenities'
                    disabled={loadingState.formSubmitting}
                    onChange={(value) => setFieldValue("facilitiesAndAmenities", value)}
                    error={errors.facilitiesAndAmenities}
                    touched={touched.facilitiesAndAmenities}
                    placeholder={'Type here...'}
                    values={values.facilitiesAndAmenities}
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
                    label='Payment Plan'
                    values={values.paymentPlan}

                    disabled={loadingState.formSubmitting}
                    onChange={(value) => setFieldValue("paymentPlan", value)}
                    error={errors.paymentPlan}
                    touched={touched.paymentPlan}
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
                    disabled={loadingState.formSubmitting}
                    onChange={(value) => setFieldValue("areasNearby", value)}
                    error={errors.areasNearby}
                    touched={touched.areasNearby}
                    placeholder={'Type here...'}
                    type="text"
                    values={values.facilitiesAndAmenities}

                    id="areasNearby"
                  />
                  <ValidationErrorMessage name={'areasNearby'} />
                </Wrapper>



                {/* Priority Dropdown Field */}
                <Wrapper>
                  <PriorityDropDown
                    name='priority'
                    label='Priority'
                    defaultValue={'None'}
                    placeholder={'Choose Priority'}
                    disabled={loadingState?.formSubmitting}
                    onChange={(value) => setFieldValue("priority", value)}
                    options={prioritiesValues}
                    currentValue={currentValue}
                    existValues={usedPriorityValues}
                  />
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



                {/* Image Upload Field */}
                <Wrapper>


                  <div className="">
                    {<h3 className={`mb-3 text-4xl font-medium sf-medium`}>Main Image</h3>}
                    {<h4 className={`sf-medium  font-medium text-sm mb-3`}>Image <span className="text-red-500 text-lg">*</span>  </h4>}
                    <div className="flex md:flex-row flex-col gap-3 items-center">
                      <div className={`max-w-80 w-full h-64 relative  rounded-[20px] overflow-hidden`}>
                        {<img
                          src={preview ? preview : values?.imageLink ? `${PROJECT_MAIN_IMAGE_URL}/${values?.imageLink}` : PlaceHolder}
                          alt="placeholder"
                          className="w-full h-full object-cover "
                        />}
                        {preview && (
                          <span
                            onClick={handleRemovePreviewImage}
                            className=" absolute top-4 left-4  cursor-pointer"
                          >
                            {" "}
                            <FaTrash className="text-red-600 " size={24} />{" "}
                          </span>
                        )}
                      </div>

                      <div className="">
                        <UploadingImage
                          isLoading={loadingState.formSubmitting}
                          onError={(error) => {
                            errorToast(error);
                          }}
                          previewUrl={(e) => setPreview(e)}
                          selectedFile={(file) => setImageFile(file)}
                        />
                      </div>
                    </div>
                  </div>

                </Wrapper>



                <Wrapper>

                  <Wrapper>

                    <div className="">
                      
                      {<h3 className={`my-3 text-2xl font-medium sf-medium`}>Images</h3>}
                      <div className="flex flex-wrap gap-2">
                        {

                          values?.imagesLink?.length > 0  && values?.imagesLink?.map((image, index) => {
                            return (
                              <div className="relative" key={index}>
                              <img
                                src={`${PROJECT_SUB_IMAGE_URL}/${image}`}
                                alt="placeholder"
                                className="w-20 h-20  rounded-[10px]  object-cover "
                              />
                              <div  onClick={()=>handleRemoveImage(image)} className=" absolute cursor-pointer top-2 left-2">
                              <FaTrash size={18} color='red' />
                              </div>
                            </div>
                            )
                          })
                        }
                      </div>
                    </div>

                    </Wrapper>



                  {/* multiple Images Upload Field */}
                  <Field
                    name='projectImages'
                    as={MultipleImageUploader}
                    titleOne={'Image'}
                    titleTwo={'Main image'}
                    disabled={loadingState?.formSubmitting}
                    onChange={(e) => {
                      setFieldValue("projectImages", e);
                    }}

                  />
                  <ValidationErrorMessage name={'projectImages'} />

                </Wrapper>



                {/* Post Payment Handover Plan */}
                <Wrapper>
                  <div className="">
                    <input type="checkbox" checked={values?.postPaymentHandoverPlan} onChange={e => setFieldValue('postPaymentHandoverPlan', e.target.checked)} className='me-2' />
                    <label htmlFor="">Post Payment Handover Plan</label>
                  </div>
                </Wrapper>

                {/* Sales */}
                <Wrapper>
                  <div className="">
                    <input type="checkbox" checked={values?.isSold} onChange={e => setFieldValue('isSold', e.target.checked)} className='me-2' />
                    <label htmlFor="">Sold</label>
                  </div>
                </Wrapper>


                      {/* Draft status */}
                      <Wrapper>
                  <div className="">
                    <input type="checkbox" checked={values?.isDraft} onChange={e => setFieldValue('isDraft', e.target.checked)} className='me-2' />
                    <label htmlFor="">Draft</label>
                  </div>
                </Wrapper>




                <button
                  type='submit'
                  disabled={loadingState.formSubmitting}
                  className='w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer'
                >
                  {loadingState.formSubmitting ? 'Loading...' : 'Submit'}
                </button>

                {/* {JSON.stringify(values)} */}
              </Form>


              {/* Preview Component - Only visible on larger screens */}
              <div className="w-[50%] md:block hidden ms-10 mt-5">
                {/* { values?.name &&  <PropertyListingCard  item={values} />} */}
                {values?.name && <div className='sticky top-0 left-0'> <PropertyListingCard prevMain viewMain previewLink={preview} user item={values} /> </div>}

              </div>


            </div>
          )}
        </Formik>}
      </div>
    </div>

  )
}

export default AdminEditProject








function Wrapper({ children }) {
  return <div className='pb-3'>{children}</div>;
}
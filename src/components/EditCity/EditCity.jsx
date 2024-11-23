import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addingCity, deleteCityById, editCityById, fetchCityById, fetchCityUsedPriorityCount, removeCityPriorityById } from '../../services/city';
import { Field, Form, Formik } from 'formik';
import { initialValues as defaultInitialValues, prioritiesValues } from '../../utils/Schema/City/intialValues';
import { validationSchema } from '../../utils/Schema/City/validations';
import InputField from '../InputFields/InputField';
import ValidationErrorMessage from '../Error/ValidationErrorMessage';
import ImageUploader from '../InputFields/ImageUploader';
import Preview from '../CityListingCard/Preview';
import { FaAngleDown, FaAngleUp, FaTrash } from 'react-icons/fa';
import EditImageUploader from '../InputFields/EditImageUploader';
import { CITY_IMAG_URL } from '../../api';
import PlaceHolder from "../../assets/placeholder/placeholder-image.png"
import UploadingImage from '../uploading/UploadingImage';
import { errorToast, successToast } from '../../toast';
import CityListingCard from '../CityListingCard/CityListingCard';
import { convertToFormData } from '../../utils/convertToFormData';
import PriorityDropDown from '../InputFields/PriorityDropDown';
function EditCity() {
    const { cities } = useSelector((state) => state.city);
    const { cityId } = useParams();
    const [data, setData] = useState(null); // Initial data is null
    const [usedPriorityValues, setUsedPriorityValues] = useState([]);
    const [loadingState, setLoadingState] = useState({ loading: false, message: '',formSubmitting:false });
    const navigate = useNavigate();
    const [preview,setPreview] = useState('');
    const [imageFile,setImageFile] = useState('');

    useEffect(() => {
        if (cities?.length > 0) {
          const result = cities.find(({ _id }) => _id === cityId);
          setData(result || {});
        } else {
          fetchdata();
        }
        fetchPriorityData();
      }, [cities]);

      const [currentValue,setCurrentValue]= useState({name:'',_id:''});
    
      useEffect(()=>{
        if(data?.priority){
            setCurrentValue({name:data?.priority,_id:data?.priority});
        }
      },[data?.priority]);

      const fetchdata = async () => {
        try {
          const response = await fetchCityById(cityId);
          setData(response.result || {});
        } catch (error) {
          console.error('An error occurred ', error);
        }
      };
    
      const fetchPriorityData = async () => {
        try {
          const response = await fetchCityUsedPriorityCount();
          setUsedPriorityValues(response.result);
        } catch (error) {
          console.error('An error occurred', error);
        }
      };
    
    



const handleRemovePreviewImage = ()=>{
    setPreview("");
}

console.log(data,'data')
  
const handleSubmit = async (values, { resetForm }) => {
    // Submission logic
    try {

        const data = {
            ...values,
        }
        
        if(imageFile){
            data.cityImage = imageFile;
        }

        if(!data?.imageLink){
          errorToast('Image is required')
        }

        const cleanedValues = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== null && value !== undefined && value !== "")
          );
    
    
          // Set the form as submitting
          setLoadingState({ ...loadingState, formSubmitting: true });
    
             // Convert form values to FormData for image upload
      const formDataFields = convertToFormData(cleanedValues);

        // API call to add a new city
        const response = await editCityById(formDataFields,cityId);
        // Display success message and reset the form
        successToast("Successfully updated");
        navigate('/admin/view-cities')

        
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
      {data && ( // Render the form only if data is loaded
        <Formik
          initialValues={{ ...defaultInitialValues,...data}} // Merge default values with loaded data
          validationSchema={validationSchema}
          enableReinitialize={true} // Reinitialize form when initialValues change
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => (
            <div className="flex md:flex-row flex-col w-full">
              <Form className="flex-1 flex flex-col">
                <Wrapper>
                  <Field
                    name="name"
                    inputClassName={touched.name && '!pe-14'}
                    as={InputField}
                    label="City Name"
                    placeholder="Dubai"
                    required
                    disabled={loadingState.formSubmitting}
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    touched={touched.name}
                  />
                  <ValidationErrorMessage name="name" />
                </Wrapper>

                {/* Emirate Name Input Field */}
                <Wrapper>
                  <Field
                    name="emirateName"
                    inputClassName={touched.emirateName && '!pe-14'}
                    as={InputField}
                    label="Emirate Name"
                    placeholder="Dubai"
                    required
                    disabled={loadingState.formSubmitting}
                    value={values.emirateName}
                    onChange={handleChange}
                    error={errors.emirateName}
                    touched={touched.emirateName}
                  />
                  <ValidationErrorMessage name="emirateName" />
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

                {/* Image Upload Field */}
                <Wrapper>

                
                <div className="">
      {<h3 className={`mb-3 text-4xl font-medium sf-medium`}>Main Image</h3> }
      {<h4 className={`sf-medium  font-medium text-sm mb-3`}>Image <span className="text-red-500 text-lg">*</span>  </h4>}
      <div className="flex md:flex-row flex-col gap-3 items-center">
        <div className={`max-w-80 w-full h-64 relative  rounded-[20px] overflow-hidden`}>
         {   <img
            src={ preview ? preview : values?.imageLink ? `${CITY_IMAG_URL}/${values?.imageLink}`:  PlaceHolder}
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

                {/* Submit Button */}
                <div className="w-full flex md:justify-start justify-center items-center md:items-start mt-5 md:mt-0">
                  <button
                    type="submit"
                    disabled={loadingState.formSubmitting}
                    className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer"
                  >
                    {loadingState.formSubmitting ? 'Loading...' : 'Submit'}
                  </button>
                </div>
              </Form>

              {/* Preview Component */}
              <div className="flex-1 md:block hidden ms-10 mt-5">
                <CityListingCard preview={preview} values={values} />
              </div>
            </div>
          )}
        </Formik>
      )  }
    </div>
  </div>
    
  )
}

export default EditCity









/**
 * Wrapper Component
 * A reusable component to provide consistent padding around form fields.
 * @param {Object} children - The child components to wrap.
 */
function Wrapper({ children }) {
    return <div className='pb-3'>{children}</div>;
  }
  

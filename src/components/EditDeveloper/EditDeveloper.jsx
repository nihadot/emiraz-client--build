import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editDeveloperById, fetchDeveloperById, fetchDeveloperUsedPriorityCount } from '../../services/developer';
import { Field, Form, Formik } from 'formik';
import { initialValues as defaultInitialValues, prioritiesValues } from '../../utils/Schema/Developer/intialValues';
import { editDeveloperValidationSchema, validationSchema } from '../../utils/Schema/Developer/validations';
import InputField from '../InputFields/InputField';
import ValidationErrorMessage from '../Error/ValidationErrorMessage';
import PasswordInputField from '../InputFields/PasswordInputField';
import { DEVELOPER_IMAG_URL } from '../../api';
import PlaceHolder from "../../assets/placeholder/placeholder-image.png"
import { FaAngleDown, FaAngleUp, FaTrash } from 'react-icons/fa';
import UploadingImage from '../uploading/UploadingImage';
import DeveloperListingCard from '../DeveloperListingCard/DeveloperListingCard';
import { errorToast, successToast } from '../../toast';
import { convertToFormData } from '../../utils/convertToFormData';
import { removeCityPriorityById } from '../../services/city';
import PriorityDropDown from '../InputFields/PriorityDropDown';
function EditDeveloper() {

  const { developers } = useSelector((state) => state.developer);
  const { developerId } = useParams();
  const [data, setData] = useState(null); // Initial data is null
  const [usedPriorityValues, setUsedPriorityValues] = useState([]);
  const [loadingState, setLoadingState] = useState({ loading: false, message: '',formSubmitting:false });
  const navigate = useNavigate();
  const [preview,setPreview] = useState('');
  const [imageFile,setImageFile] = useState('');

  useEffect(() => {
    if (developers?.length > 0) {
      const result = developers.find(({ _id }) => _id === developerId);
      setData(result || {});
    } else {
      fetchdata();
    }
    fetchPriorityData();
  }, [developers]);


  const [currentValue,setCurrentValue]= useState({name:'',_id:''});
    
  useEffect(()=>{
    if(data?.priority){
        setCurrentValue({name:data?.priority,_id:data?.priority});
    }
  },[data?.priority]);


  const fetchdata = async () => {
    try {
      const response = await fetchDeveloperById(developerId);
      setData(response.result || {});
    } catch (error) {
      console.error('An error occurred ', error);
    }
  };

  const fetchPriorityData = async () => {
    try {
      const response = await fetchDeveloperUsedPriorityCount();
      setUsedPriorityValues(response.result);
    } catch (error) {
      console.error('An error occurred', error);
    }
  };


  const handleRemovePreviewImage = ()=>{
    setPreview("");
}


const handleSubmit = async (values, { resetForm }) => {
  // Submission logic
  try {

      const data = {
          ...values,
      }
      
      if(imageFile){
          data.developerImage = imageFile;
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
      const response = await editDeveloperById(formDataFields,developerId);
      // Display success message and reset the form
      console.log(values,'values')
      successToast("Successfully updated");
      navigate('/admin/view-developers')

      
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
    { data &&  <Formik
        initialValues={{...defaultInitialValues,...data}} // Initial values for the form
        validationSchema={editDeveloperValidationSchema} // Validation schema for the form
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
src={ preview ? preview : values?.imageLink ? `${DEVELOPER_IMAG_URL}/${values?.imageLink}`:  PlaceHolder}
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
              <DeveloperListingCard preview={preview} values={values} />
            </div>
          </div>
        )}
      </Formik>}
    </div>
  </div>
  )
}

export default EditDeveloper










/**
 * Wrapper Component
 * A reusable component to provide consistent padding around form fields.
 * @param {Object} children - The child components to wrap.
 */
function Wrapper({ children }) {
  return <div className='pb-3'>{children}</div>;
}


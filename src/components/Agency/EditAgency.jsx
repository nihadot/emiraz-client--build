import React, { useState } from 'react';
import { errorToast, successToast } from '../../toast';
import { useNavigate, useParams } from 'react-router-dom';
import { getAgency, getAgencyById, SERVER_URL, updateAgency } from '../../api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ADMIN_TOKEN, CLOUDINARY_NAME, CLOUDINARY_PERSISTENT } from '../../api/localstorage-varibles';
import axios from 'axios';
import LanguageDropDown from './LanguageDropDown';
import CountryDropDown from './CountryDropDown';
import UploadingImage from '../uploading/UploadingImage';
import { CiCircleRemove } from 'react-icons/ci';
import MultiSelectDropdown from './MultiSelectDropdown';

function EditAgency() {
  const navigate = useNavigate();
  const { id: agencyId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  // --------------------------------------------
  const [refresh,setRefresh] = useState(false);

  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    name: "",
    username:"",
    password: "",
    country: "",
    language: "",
  });

  const[visible,setVisible] = React.useState('password')
  const [image,setImage] = useState(null);
  const [imagePreview,setImagePreview] = useState(null);
  const [existingImage,setExistingImages] = useState(null);
  const [existingLanguage,setExistingLanguage] = useState([]);
  const [existingCountry,setExistingCountry] = useState(null);

  const [countries,setCountries] = useState();
  const [language,setLanguage] = useState();
  const [clearForms, setClearForms] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);


  const handleClear = () => {
    setClearForms(!clearForms); // Trigger clearing
  };

  // -----------------------------------------------------------------

  
  // -----------------------------------------------
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // -------------------------------------------------

  const handleSubmit = async e => {
    e.preventDefault();

    if(!formData.name){
      errorToast("Name is required");
      return;
    }

    if(!formData.username){
      errorToast("Username is required");
      return;
    }


    if(!formData.password){
      errorToast("Password is required");
      return;
    }

    // if(image === null){
    //   errorToast("Please select an image");
    //   return;
    // }

    // if(imagePreview === null){
    //   errorToast("Please select an image");
    //   return;
    // }

    if(!formData.country){
      errorToast("Please select a country");
      return;
    }

    // if(!existingLanguage.length > 0){
    //   errorToast("Please select a language");
    //   return;
    // }
    setIsLoading(true);

    const data = {
      name: formData.name,
      username:formData.username,
      password: formData.password,
      country: formData.country,
      language: selectedLanguages.map((item)=> item._id ),

    }


    if(image){
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', CLOUDINARY_PERSISTENT); 
      formData.append('folder', 'agency_upload'); 

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${ CLOUDINARY_NAME}/image/upload`, // Replace your_cloud_name
        formData
      );
      // console.log(response.data);
      if (response?.data) {
        data.imageFile = {
          asset_id: response.data.asset_id,
          secure_url: response.data.secure_url,
          url: response.data.url,
          public_id: response.data.public_id,
        };
      }
    }



    try {
      await updateAgency(data, agencyId);
      successToast('Successfully updated');
      navigate('/admin/view-agents');
    } catch (error) {
      errorToast(
        error.response.data.message ||
          error.message ||
          'An error occurred during login.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [agencyId]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await getAgencyById(agencyId);
      setFormData({...result.result});
setExistingImages(result.result.imageFile);
      const response = await axios.get(`${SERVER_URL}/banner/get-all-countries`,{
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      const filteredCountries = response.data.result.filter(country => country._id !== result.result.country)
  setCountries(filteredCountries);
      const findTheCountry = response.data.result.find(i => result.result.country === i._id )
setExistingCountry(findTheCountry);
  const response_lang = await axios.get(`${SERVER_URL}/banner/get-all-languages`,{
    headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
  });
  const filteredLang = response_lang.data.result.filter(lang =>   !result.result.language.includes(lang._id))

  setLanguage(filteredLang);
const findTheLang = response_lang.data.result.filter(i => result.result.language.includes(i._id) )
setExistingLanguage(findTheLang);
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'error occur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectionChange = (selections) => {
    setSelectedLanguages(selections);
  };

  const handleRemove = async({_id:langId})=>{
    const status = window.confirm('Are you sure you want to remove');
    if(!status){
      return;
    }

    if(existingLanguage.length === 1){
      return errorToast('At least one language should be there.')
    }
 
    try {
      const response = await axios.delete(`${SERVER_URL}/agency/delete/lang/${langId}/${agencyId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      // console.log('[Response]: => ', response);
      navigate('/admin/view-agents');
      successToast('Deleted successfully');
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'Error occurred while deleting property');
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <form onSubmit={handleSubmit}  className='flex flex-wrap'>
      <div className='flex-1'>
        {/*  Name */}
        <div className='flex flex-col gap-2 mx-3'>
          <label
            htmlFor='name'
            className='sf-medium font-medium text-sm text-[#000000]'
          >
            Name
          </label>
          <input
            disabled={isLoading}
            autoComplete='name'
            value={formData.name}
            name='name'
            onChange={handleChange}
            type='text'
            id='name'
            placeholder='Name'
            title='Name'
            className='border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666]  outline-none'
          />
        </div>

        {/* username */}
        <div className='flex mt-3 flex-col gap-2 mx-3'>
          <label
            htmlFor='username'
            className='sf-medium font-medium text-sm text-[#000000]'
          >
            Username
          </label>
          <input
            disabled={isLoading}
            autoComplete=''
            name='username'
            value={formData.username}
            onChange={handleChange}
            type='text'
            id='username'
            placeholder='Username'
            className='border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none'
          />
        </div>

        <div className='mt-6 relative flex flex-col gap-2 mx-3'>
       <label
            htmlFor='password'
            
            className='sf-medium font-medium text-sm text-[#000000]'
            >
            Password
          </label>
          <input
            disabled={isLoading}
            name='password'
            onChange={handleChange}
            value={formData.password}
            autoComplete='current-password'
            type={visible}
            id='password'
            placeholder='Password'
            className='border border-[#E4E4E4] py-4 ps-5 pe-16 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none'
            />
          <div className='absolute right-7   top-11'>
            {visible === 'password' ? (
              <FaEye size={20} onClick={() => setVisible('text')} />
            ) : (
              <FaEyeSlash size={20} onClick={() => setVisible('password')} />
            )}
          </div>
            </div>





<div className="py-3">

        <CountryDropDown 
        name="country"
        clearForms={clearForms}

        // value={existingCountry}
        onChange={(e)=>{

         setFormData({

          ...formData,
           country: e.id
         })
        }}
        isLoading={isLoading}
        options={countries}
      />

      <label className='text-sm rounded-[10px] px-5 ms-3 mt-3 border py-4' htmlFor="">{existingCountry?.countryName}</label>
      </div>




          {/* languages */}
          {/* <LanguageDropDown 
        name="language"
        clearForms={clearForms}

        // value={existingLanguage}
        onChange={(e)=>{
         setFormData({
          ...formData,
           language: e.id
         })
        }}
        isLoading={isLoading}
        options={language}
      /> */}


<div className="py-2">

<MultiSelectDropdown refresh={refresh} data={language} onSelectionChange={handleSelectionChange} />


      <div className="flex gap-0">
        {
          existingLanguage.length > 0  && existingLanguage.map((item)=>{
            return (
              <div key={item._id} className='text-sm w-fit rounded-[10px] px-5 ms-3 mt-0 border py-4 capitalize'>
                {item.languageName}
               
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  className="ml-2 text-red-500 text-xs hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )
          })
        }
      </div>
      {/* <label className='text-sm rounded-[10px] px-5 ms-3 mt-3 border py-4 capitalize' htmlFor="">{existingLanguage?.languageName}</label> */}
      </div>





   


        <div className='mt-6 relative flex flex-col gap-2 mx-3'>
   




          <div className="px-4 flex-1 mt-5">
            {/* Main image */}
            {/* <h1 className="mb-3 text-4xl font-medium sf-medium">Media</h1> */}
            {/* <h2 className="sf-medium font-medium text-sm mb-3">Main Image  <span className="text-lg text-red-600">*</span></h2>  */}
           
            <div className="flex gap-3 items-center">
              <div className="w-80 h-64 relative rounded-[20px] overflow-hidden">
                <img
                src={imagePreview || existingImage?.secure_url  }
                  // src={ imagePreview ? imagePreview  : URL.createObjectURL(setImagePreview) :   || PlaceHolder}
                  alt="placeholder"
                  className="w-full h-full object-cover"
                />
                {imagePreview && (
                  <span
                    onClick={() => {
                      // setFieldValue("image", "");
                      setImage(null);
                      setImagePreview(null);
                      // setFieldValue("preview", "")
                    }}
                    className="absolute top-2 left-3 cursor-pointer"
                  >
                    <CiCircleRemove className="text-red-600" size={24} />
                  </span>
                )}
              </div>

     
              <UploadingImage
                isLoading={isLoading}
                onError={(error) => errorToast(error)}
                previewUrl={(url) => setImagePreview(url)}
                selectedFile={(file) => {
                  // setFieldValue("image", file);
                  setImage(file);
                }}
              />


            </div>
{/* <ErrorMessage name="image" component="div" className="text-red-500 text-sm" /> */}

            {/* Submit */}
            {/* <div className="p-3 poppins-semibold text-lg">
              <button
                disabled={isLoading}
                type="submit"
                className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer"
              >
                {isLoading ? "Loading..." : "Save"}
              </button>
            </div> */}
          </div>


          <div className="p-0 mt-6 poppins-semibold text-lg">
          <button disabled={isLoading} type="submit" className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
            
              { isLoading ? 'loading...' :  'Save'}
            
          </button>
        </div>
        
        </div>

       











      </div>

      <div className='px-4 flex-1'></div>
    </form>
  );
}

export default EditAgency;

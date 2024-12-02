import { useEffect, useState } from 'react';
import { errorToast, successToast } from '../toast';
import { addingNotification, fetchNotification, fetchNotificationByIdAPI, SERVER_URL, updateNotificationByIdAPI } from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import PropertyDropDown from './PropertyDropDown';
import axios from 'axios';

function EditNotification() {
  const [isLoading, setIsLoading] = useState(false);
  const {id:notificationId} = useParams();
  // --------------------------------------------
  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    title: '',
  });
  const [projects,setProjects] = useState([]);
  const navigator = useNavigate();
  // -----------------------------------------------------

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------------------------

  const [clearForms, setClearForms] = useState(false);

const [existingProject,setExistingProject] = useState();
  const handleClear = () => {
    setClearForms(!clearForms); // Trigger clearing
  };
  const handleSubmit = async e => {
    try {

        if(!formData.title){
          errorToast('Title is required');
          return;
        }

        const data = {
          title: formData.title,
        }

        if(formData.project){
          data.project = formData.project;

        }

      e.preventDefault();
      setIsLoading(true);

   
      await updateNotificationByIdAPI(formData,formData._id);
      successToast('Successfully added');
      // setFormData({ title: '' });

      setIsLoading(false);
      navigator('/admin/view-notification')
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message || error.message);
      }
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    fetchData()
  },[]);
  const fetchData = async () => {
    try {
      const result = await fetchNotificationByIdAPI(notificationId);
      setFormData({...result.result});

      const response = await axios.get(`${SERVER_URL}/property`);
      const filteredData = await response.data.result?.filter(item => item._id !== result.result.project )
      setProjects(filteredData);
      const filtered = response.data.result?.find(item => item._id === result.result.project);
      setExistingProject(filtered);
    } catch (error) {
      errorToast(error.response.data.message || error.message || 'error occur');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-wrap'>
      <div className='flex-1'>
        {/* Title */}
        <div className='flex mt-3 flex-col gap-2 mx-3'>
          <label
            htmlFor='cityName'
            className='sf-medium font-medium text-sm text-[#000000]'
          >
            Message
          </label>
          <textarea
            cols={'30'}
            rows={'10'}
            name='title'
            placeholder='Type here...'
            disabled={isLoading}
            value={formData.title}
            onChange={handleChange}
            id='title'
            title='Title'
            className='border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666]  outline-none'
          ></textarea>
        </div>




        <PropertyDropDown 
        name="property"
        clearForms={clearForms}

        // value={[values.developer]}
        onChange={(e)=>{
         setFormData({
          ...formData,
          project: e.id
         })
        }}
        isLoading={isLoading}
        options={projects}
      />

{ existingProject && existingProject?.projectTitle && <label className='text-sm rounded-[10px] px-5 ms-3 my-3 border py-4' htmlFor="">{existingProject?.projectTitle}</label>
}


        <div className='p-3 mt-5 poppins-semibold text-lg'>
          <button
            disabled={isLoading}
            type='submit'
            className='w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer'
          >
            {isLoading ? 'loading...' : 'Save'}
          </button>
        </div>
      </div>

      <div className='px-4 flex-1'>{/* submit */}</div>
    </form>
  );
}

export default EditNotification;

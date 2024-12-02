import { useEffect, useState } from 'react';
import { errorToast, successToast } from '../toast';
import { addingNotification, SERVER_URL } from '../api';
import PropertyDropDown from './PropertyDropDown';
import axios from 'axios';

function AddNotification() {
  const [isLoading, setIsLoading] = useState(false);
  // --------------------------------------------
  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    title: '',
  });
  // -----------------------------------------------------

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------------------------

  const [clearForms, setClearForms] = useState(false);


  const handleClear = () => {
    setClearForms(!clearForms); // Trigger clearing
  };


  const handleSubmit = async e => {
    try {
      e.preventDefault();

      if(!formData.title){
        errorToast('Title is required');
        return;
      }

      const data = {
        title: formData.title,
        // project: formData.project,
      }

      if(formData.project){
        data.project = formData.project;
      }
      setIsLoading(true);
      // const formDataFields = new FormData();
      // formDataFields.append('title', formData.title);

      await addingNotification(data);
      successToast('Successfully added');
      setFormData({ title: '' });
handleClear();
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message || error.message);
      }
      setIsLoading(false);
    }
  };

  const [projects,setProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/property`);
      setProjects(response.data.result);
  
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'Error occurred');
    }
  };
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






        <div className='p-3 poppins-semibold text-lg'>
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

export default AddNotification;

import { useState } from 'react';
import { errorToast, successToast } from '../toast';
import { addingNotification } from '../api';

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

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const formDataFields = new FormData();
      formDataFields.append('title', formData.title);

      await addingNotification(formDataFields);
      successToast('Successfully added');
      setFormData({ title: '' });

      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message || error.message);
      }
      setIsLoading(false);
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

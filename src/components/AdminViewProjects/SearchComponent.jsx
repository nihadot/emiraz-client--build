import React from 'react'
import { FaSearch } from 'react-icons/fa';

function SearchComponent({
    setSearchTerm,
}) {

    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
      };

  return (
    <div className='flex justify-between flex-row relative'>
    <div className='flex  max-w-[271px] w-[271px] h-[53px] max-h-[53px] font-extralight text-sm sf-normal text-[#666666] justify-center items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]'>
      <input
        type='search'
        onChange={handleSearchChange}
        name=''
        className='bg-transparent outline-none pe-3 w-full ps-6'
        id=''
        placeholder='Search...'
      />
      <FaSearch color='#666666' className='me-6' />
    </div>
 
  
  </div>
  )
}

export default SearchComponent
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import {
  developers,
  Search,
  cities,
  apartment,
  villa,
  pentHouse,
  townhouse,
} from '../../assets/icons';
import { fetchPropertyTypeAPI, searchAPI } from '../../api';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../toast';

function SearchSection({handleSearchQuery}) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [data, setData] = useState([]);


  // useEffect(() => {
  //   if (query.length > 2) {
  //     const timerId = setTimeout(() => {
  //       fetchQuery(query);
  //     }, 300); // Debouncing with 300ms delay

  //     return () => {
  //       clearTimeout(timerId);
  //     };
  //   }
  // }, [query]);
  const [isFormSubmitLoading,setIsFormSubmitLoading] = useState(false);

  const handleSubmit = e => {
    setIsFormSubmitLoading(true);
    e.preventDefault();
    fetchQuery(query);
  };

  const fetchQuery = async searchQuery => {
    try {
      const response = await searchAPI(encodeURIComponent(searchQuery));

      if (response.result) {
        navigate(
          `/property/${response?.result?.propretyHeadline
            ?.trim()
            .toLowerCase()
            .replace(/\s+/g, '-')}/${response?.result?._id}`,
          { state: response?.result }
        );
      }
    } catch (err) {
      errorToast('Not found property');
      setIsFormSubmitLoading(false);
    }
  };

  React.useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
        setIsLoading(true)
      const response = await fetchPropertyTypeAPI();
      setData(response.result)
      setIsLoading(false)
    }  catch (error) {
        errorToast(error.response.data.message || error.message || 'An error occurred ')
        setIsLoading(false)
    }
  };


  useEffect(()=>{
    handleSearchQuery(query)
    // console.log(query,'--search')
  },[query]);
  return (
    <>
      <div className='hidden   max-w-[1300px] px-5 sm:flex md:w-full lg:px-[3rem] mx-auto bg-white justify-between items-center gap-10 h-[130px] '>
        <h1 className='poppins font-bold text-[25px]'>
          {' '}
          Discover Off Plan Properties in Dubai and Other Emirates.{' '}
        </h1>

        <div
          className={`${
            false ? 'border-none' : ' border shadow-sm'
          }  relative  text-black h-[45px] ps-4 overflow-hidden bg-white w-[280px] lg:w-[260px] rounded-[50px] flex justify-start items-center `}
        >
          <img src={Search} alt='' className='cursor-pointer h-[20px] w-6' />

          <input
            className={`w-full ms-2 sf-normal text-[14px] bg-transparent placeholder:text-[#404040] outline-none border-none `}
            type='text'
            placeholder='Search properties...'
            value={query}
            disabled={isFormSubmitLoading}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='flex-col mt-[18px] mx-5 sf-bold flex sm:hidden justify-start items-start mb-0 '>
        <h1 className='poppins text-start font-bold text-[23px] tracking-tight leading-7'>
          Discover Off Plan Properties in Dubai and Other Emirates.
        </h1>
        <div
          className={`my-3 bg-[#F7F7F7]  border shadow-sm w-full relative  text-black h-[45px] overflow-hidden px-5 rounded-[50px] flex justify-start gap-2 items-center `}
        >
          <img onClick={handleSubmit} src={Search} alt='' className='cursor-pointer h-[20px] w-6' />

          <input
            className={` sf-normal  text-[14px] bg-transparent placeholder:text-[#404040] pe-2 outline-none border-none `}
            type='text'
            placeholder='Search properties...'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {/* <img onClick={handleSubmit} src={Search} alt='' className='cursor-pointer h-[18px]' /> */}
        </div>

        {/* developers and cities */}

        <div className='text-[#000000] grid grid-cols-2 h-[85px] w-full gap-[9px]'>
          <div onClick={()=>navigate('/our-developers')} className='sf-normal text-15px] 356px:gap-4 340px:py-0 py-3 340px:flex-row flex-col gap-2 justify-between px-2 356px:px-3 items-center flex border-[##D4D4D4] border rounded-[5px]'>
            <p className=''>Developers</p>
            <img
              src={developers}
              alt=''
              className='w-[44px] h-[44px] object-contain'
            />
          </div>
          <div onClick={()=>navigate('/all-cities')} className='sf-normal 340px:flex-row flex-col 340px:py-0 py-3 px-2 356px:px-3 text-15px  356px:gap-4 gap-2 flex justify-between items-center  border-[##D4D4D4] border rounded-[5px]'>
            <p className=''>City Based</p>
            <img
              src={cities}
              alt=''
              className='w-[44px] h-[44px] object-contain'
            />
          </div>
        </div>

        <h2 className='sf-normal font-normal text-[#666666] my-4'>
          Browse Based On Property Type
        </h2>

<div className='grid grid-cols-4 w-full gap-[9px]'>
{ data && data.map((item)=>{

  const propertyIcon = 
  item.propertyType.name?.toLowerCase()?.trim() === 'apartment' ? apartment : 
  item.propertyType.name?.toLowerCase()?.trim() === 'villa'  ? villa : 
  item.propertyType.name?.toLowerCase()?.trim() === 'penthouse' ? pentHouse :
  item.propertyType.name?.toLowerCase()?.trim() ==='townhouse' ? townhouse : null;

  return(
          <div onClick={()=>navigate(`/property-type/${item.propertyType._id}/${item.propertyType.name}`)} className='rounded-[5px] sf-normal justify-center items-center text-[12px] h-[85px] flex-col px-3 pt-3  flex border-[##D4D4D4] border'>
            <img
              src={propertyIcon}
              alt=''
              className='w-[32px] h-[32px] object-contain'
            />
            <p className='sf-normal text-[12px] pt-1 capitalize'>{item.propertyType.name}</p>
          </div>

)
})}



        <div onClick={()=>navigate(`/property-type/villa`)} className='rounded-[5px] sf-normal justify-center items-center text-[12px] h-[85px] flex-col px-3 pt-3  flex border-[##D4D4D4] border'>
          <img
            src={villa}
            alt=''
            className='w-[32px] h-[32px] object-contain'
          />
          <p className='sf-normal text-[12px] pt-1 capitalize'>Villa</p>
        </div>


        <div onClick={()=>navigate(`/property-type/apartment`)} className='rounded-[5px] sf-normal justify-center items-center text-[12px] h-[85px] flex-col px-3 pt-3  flex border-[##D4D4D4] border'>
          <img
            src={apartment}
            alt=''
            className='w-[32px] h-[32px] object-contain'
          />
          <p className='sf-normal text-[12px] pt-1 capitalize'>Apartment</p>
        </div>


        <div onClick={()=>navigate(`/property-type/penthouse`)} className='rounded-[5px] sf-normal justify-center items-center text-[12px] h-[85px] flex-col px-3 pt-3  flex border-[##D4D4D4] border'>
          <img
            src={pentHouse}
            alt=''
            className='w-[32px] h-[32px] object-contain'
          />
          <p className='sf-normal text-[12px] pt-1 capitalize'>Penthouse</p>
        </div>


        <div onClick={()=>navigate(`/property-type/townhouse`)} className='rounded-[5px] sf-normal justify-center items-center text-[12px] h-[85px] flex-col px-3 pt-3  flex border-[##D4D4D4] border'>
          <img
            src={townhouse}
            alt=''
            className='w-[32px] h-[32px] object-contain'
          />
          <p className='sf-normal text-[12px] pt-1 capitalize'>Townhouse</p>
        </div>

</div>

      </div>
    </>
  );
}

export default SearchSection;

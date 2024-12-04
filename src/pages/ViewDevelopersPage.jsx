import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { errorToast, successToast } from '../toast';
import { setError, setLoading } from '../features/blogSlice.js';
import { MAIN_IMAG_URL, deleteDeveloper, getDevelopers } from '../api/';
import { deleteDeveloperSuccess, fetchDevelopers } from '../features/developerSlice.js';
import Profile from "../components/Profile.jsx"
import Lazyloading from '../components/Lazyloading/Lazyloading.jsx';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Placeholder from "../assets/placeholder/placeholder-image.png"

function ViewDevelopersPage() {

  const dispatch = useDispatch();
  // const { developers } = useSelector((state) => state.developer); 
  const [refresh,setRefresh] = React.useState(true);
  const [developers,setDevelopers] = useState([]);
  React.useEffect(()=>{
    fetchdata()
  },[refresh])

  const fetchdata =async ()=>{
    try {
      // dispatch(setLoading());
      const response = await getDevelopers()
      // dispatch(fetchDevelopers(response));
      // console.log(response.result,'response.result')
      setDevelopers(response.result);
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'Error occurred');
    }
  }

    const navigate = useNavigate();
    const [searchKeyWord, setSearchKeyWord] = useState('');

    const handleDelete = async (id) => {
      if (!id) return errorToast("Id Is Not Provided!");
  
      try {
        // dispatch(setLoading());
        await deleteDeveloper(id);
        // dispatch(deleteDeveloperSuccess());
        successToast("Successfully Deleted");
        setRefresh(!refresh);
      }  catch (error) {
        errorToast(error?.response?.data?.message || error?.message || "Error occurred");
  
      }
    };
  const [filteredProperties, setFilteredProperties] = useState([]);


    useEffect(() => {
      // Filter and sort properties when data or searchKeyWord changes
      filterAndSortProperties();
    }, [developers, searchKeyWord]);


    const filterAndSortProperties = () => {
      const lowerCaseSearchTerm = searchKeyWord.toLowerCase();
      const filteredData = developers.filter((item) => {
        const searchFields = [
          // item._id?.toString(), // Convert _id to string
          item.developerName?.toLowerCase(),
          item.password?.toLowerCase(),
          item.priority?.toString(), // Convert priority to string
          item.username?.toLowerCase(), // Convert priority to string
        ];
  
        return searchFields.some(
          (field) => field && field.includes(lowerCaseSearchTerm)
        );
      });
  
      // Update state with filtered properties
      setFilteredProperties(filteredData);
    };

  return (
        <>
    {/* <div className=" sm:flex gap-3 md:gap-8 grid grid-cols-2 sm:justify-center sm:items-center sm:flex-wrap mx-6 ">
        {developers && developers.map((item)=> <Profile refresh={refresh} setRefresh={setRefresh} key={item._id} item={item} /> )}

    </div> */}

    
    <div className="sticky top-0 bg-white flex justify-between pt-6">
          <h1 className="sf-medium font-medium text-5xl">Developers</h1>
        </div>
    <div className="mx-0 mb-4 lg:mb-14 mt-4 lg:mt-8 items-center  ">
    <SearchAndFilter setSearchTerm={setSearchKeyWord} />

            <section className="mt-5 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4  mb-5  gap-7 max-w-[1300px]">
                
                  {filteredProperties &&
                    filteredProperties.length > 0 &&
                    filteredProperties.map((item, index) => {
                      return (
                        <div className='flex flex-col relative'>
            {<span className="flex absolute top-2 right-2 rounded-full w-9 h-9 bg-black z-40 text-white justify-center items-center">{item?.projectCount}</span>}

                        <div
                      
                              className="cursor-pointer relative flex-col p-5 lg:h-[252px] sm:w-[180px] h-[172px]  lg:w-[264px] rounded-[15px] flex justify-center items-center border"
                              key={item._id}
                              >
            { item.priority &&  <span className="flex absolute top-2 right-2 rounded-full w-9 h-9 bg-black z-40 text-white justify-center items-center">{item.priority}</span>}

                          <Lazyloading
                            src={item?.imageFile?.secure_url || Placeholder}
                            alt={item?.developerName}
                            className={"my-10 object-contain max-h-[120px]"}
                            />

                            <label htmlFor="">{item?.developerName}</label>
                            
                        </div>
                    

              <div className="mt-4  flex gap-2 w-full px-0">
            <button 
            
            onClick={() =>
              navigate(`/admin/edit-developer/${item._id}`, {
                state: item,
              })
            }
            className='flex-1 py-2.5 rounded poppins-semibold text-[10px] bg-[#D2D2D2] text-[#000000]' >Edit</button>
            <button
            onClick={() => {
              const status = confirm('Are you want to delete!')
              if(status){

                handleDelete(item._id)
              }
            }}
             className='flex-1 py-2.5 rounded poppins-semibold text-[10px] bg-[#000000] text-[#ffffff]' >Delete</button>
         </div>
                            </div>
                      );
                    })}
                </section>
              </div>
              </>
  )
}

export default ViewDevelopersPage








function SearchAndFilter({ setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-between flex-row relative mb-3">
      <div className="flex max-w-[271px] w-[271px] h-[53px] max-h-[53px] font-extralight text-sm sf-normal text-[#666666] justify-center items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]">
        <input
          type="search"
          onChange={handleSearchChange}
          className="bg-transparent outline-none pe-3"
          placeholder="Search..."
        />
        <FaSearch color="#666666" />
      </div>
    </div>
  );
}
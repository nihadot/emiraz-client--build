import { useEffect, useState } from 'react';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa6';
import { getAgency, getDevelopers, SERVER_URL } from '../api';
import { errorToast } from '../toast';
import CustomSelect from './CustomSelect';
import CustomSelectSold from "./CustomSelectSold"
import axios from 'axios';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
function SearchAndFilter({
  setSearchTerm,
  setSelectedFilterDeveloper,
  setData
}) {

  const [developersFilterOptionVisible, setDevelopersFilterOptionVisible] =
    useState(false);
  const [developersFilterOptionItem, setDevelopersFilterOptionItem] = useState(
    {}
  );

  
  const [developers, setDevelopers] = useState([]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };



  const handleFilterSelectionDevelopers = item => {
    setDevelopersFilterOptionVisible(false);
    setDevelopersFilterOptionItem(item);
    setSelectedFilterDeveloper(item);
  };



  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const [developersResponse] = await Promise.all([
        getDevelopers(),
      ]);

      setDevelopers(developersResponse.result);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
      } else {
        errorToast('An error occurred during login.');
      }
    }
  };



  const handleStatus = async(type)=>{

    let draft = 'false';
    try {

        if(type === 'draft'){
            draft = 'true';
        }else{
            draft = 'false';
        }

        

       
    //  const response = await axios.put(`${SERVER_URL}/property/draft/status/${projectId}`, data, {
const response = await axios.get(`${SERVER_URL}/property?draft=${draft}&issold=${''}`,{

         headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
       });
   
       setData(response.data.result);
 
     } catch (error) {
       errorToast(error?.response?.data?.message || error?.message  || 'Error')
     } 
}

const [status, setStatus] = useState({
    draft: false,
    issold: false,
  });

  const handleSelectUser = async (value) => {
    // Update status and call the API
    setStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus };

      switch (value) {
        case 'draft':
          updatedStatus.draft = true;
          break;
        case 'non-draft':
          updatedStatus.draft = false;
          break;
        case 'sold':
          updatedStatus.issold = true;
          break;
        case 'non-sold':
          updatedStatus.issold = false;
          break;
        default:
          break;
      }

      // Call the API with updated status
      callApi(updatedStatus.draft, updatedStatus.issold);

      return updatedStatus;
    });
  };



  const callApi = async (draft, issold) => {
    try {
      const response = await axios.get(`${SERVER_URL}/property`, {
        params: {
          draft,
          issold,
        },
      });

      setData(response.data.result);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className='flex justify-start gap-6 flex-row relative mb-4'>
      <div className='flex max-w-[271px] w-[271px] h-[53px] max-h-[53px] font-extralight text-sm sf-normal text-[#666666] justify-center items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]'>
        <input
          type='search'
          onChange={handleSearchChange}
          name=''
          className='bg-transparent outline-none pe-3'
          id=''
          placeholder='Search...'
        />
        <FaSearch color='#666666' />
      </div>
      <div className='flex gap-5'>
      

        <div
          onClick={() =>
            setDevelopersFilterOptionVisible(!developersFilterOptionVisible)
          }
          className=' relative cursor-pointer flex w-[188px] h-[53px] max-h-[53px] justify-between px-10 items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]'
        >
          <span className='w-[#666666] text-black font-extralight text-sm sf-normal capitalize'>
            {developersFilterOptionItem?.developerName
              ? developersFilterOptionItem?.developerName
              : 'Developer'}
          </span>
          {developersFilterOptionVisible ? <FaAngleUp /> : <FaAngleDown />}

          {developersFilterOptionVisible && (
            <div className='bg-white text-start poppins-medium text-[14px] px-2 absolute z-50 right-0 top-16 border py-3 rounded-[10px] border-[#E4E4E4] max-w-48 max-h-80 h-fit overflow-y-auto w-48 ps-4'>
              <div
                className='py-2 capitalize cursor-pointer'
                onClick={() =>
                  handleFilterSelectionDevelopers({
                    developerName: 'All',
                    _id: 'all',
                  })
                }
              >
                All
              </div>

              {developers &&
                developers?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleFilterSelectionDevelopers(item)}
                      className='py-2 capitalize cursor-pointer'
                    >
                      {item.developerName}
                    </div>
                  );
                })}
            </div>
          )}
        </div>



        <div className="">
          <CustomSelect setUserSelected={handleSelectUser}  setData={setData}/>
        </div>



        <div className="">
          <CustomSelectSold setUserSelected={handleSelectUser} setData={setData}/>
        </div>


        
      </div>



   
    </div>
  );
}

export default SearchAndFilter;

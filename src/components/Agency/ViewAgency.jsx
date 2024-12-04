import React, { useEffect, useState } from 'react'
import AgencyCard from './AgencyCard'
import { deleteAgency, getAgency } from '../../api';
import { FaSearch } from 'react-icons/fa';

function ViewAgency() {

    const [agency, setAgency] = useState([]);
  const [refresh,setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAgency();
        setAgency(response.result);
      } catch (error) {
        console.error('Error fetching Agency:', error);
      }
    };

    fetchData();
  }, [refresh]);



  const handleDelete = async (id) => {
    if (!id) return errorToast("Id Is Not Provided!");

    try {
      await deleteAgency(id);
      setRefresh(!refresh);
    } catch (error) {
        errorToast(error.response.data.message || error.message || 'error');
    }
  };

  const [searchKeyWord, setSearchKeyWord] = useState('');

    
  useEffect(()=>{
    filterAndSortProperties();

  },[searchKeyWord,agency]);

  const [filteredProperties, setFilteredProperties] = useState([]);


  const filterAndSortProperties = () => {
    const lowerCaseSearchTerm = searchKeyWord.toLowerCase();
    const filteredData = agency.filter((item) => {
      const searchFields = [
        // item._id?.toString(), // Convert _id to string
        item.username?.toLowerCase(),
        item.name?.toLowerCase(),
        item.priority?.toString(), // Convert priority to string
      ];

      return searchFields.some(
        (field) => field && field.includes(lowerCaseSearchTerm)
      );
    });

    // Update state with filtered properties
    setFilteredProperties(filteredData);
  };
  
  return (
    <div className=''>
        <SearchAndFilter setSearchTerm={setSearchKeyWord} />

<div className="grid grid-cols-4 gap-3">

        {
          filteredProperties.length > 0 && filteredProperties.map((item)=>(
            <AgencyCard item={item} key={item._id} handleDelete={handleDelete}/>
          ))
        }
        
        </div>
    </div>
  )
}

export default ViewAgency









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
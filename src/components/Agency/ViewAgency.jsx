import React, { useEffect, useState } from 'react'
import AgencyCard from './AgencyCard'
import { deleteAgency, getAgency } from '../../api';

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
    
  return (
    <div className='grid grid-cols-4 gap-3'>
        {
            agency && agency.map((item)=>(
                <AgencyCard item={item} key={item._id} handleDelete={handleDelete}/>
            ))
        }
        
    </div>
  )
}

export default ViewAgency
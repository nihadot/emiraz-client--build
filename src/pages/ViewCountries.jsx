import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import { errorToast } from '../toast';

function ViewCountries() {

    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState([]);
  
    const navigate = useNavigate();


    
    useEffect(() => {
 

        fetchData();
      }, [refresh]);

      const fetchData = async () => {
        try {
    
          const response = await axios.get(
            `${SERVER_URL}/banner/get-all-countries`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
              },
            }
          );
    
          setData(response.data.result);
        } catch (error) {
          const errorMsg = error?.response?.data?.message || error?.message || "An error occurred during the operation.";
          errorToast(errorMsg);
        }
      };

      

      const handleDelete = async (id) => {

        const status = window.confirm('Are you sure you want to delete');
        
            if(!status){
              return true;
            }
          
            if (!id) return errorToast("Id Is Not Provided!");
        
            try {
              const response = await axios.delete(
                `${SERVER_URL}/banner/delete-country/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
                  },
                }
              );
              setRefresh(!refresh);
            } catch (error) {
                errorToast(error?.response?.data?.message || error?.message || 'Error deleting');
            }
          };

  return (
    <div className='grid grid-cols-5 gap-4'>

    { data.length > 0 && data.map((item)=>{
return(
 <div className="border rounded-md px-4 capitalize py-4">
       <p className='py-3'>{item?.countryName}</p>
       <div className="flex gap-4">
         <button onClick={()=>navigate(`/admin/edit-country/${item._id}`,{state:item})} className='p-1 w-full  text-white bg-green-600' >Edit</button>
         <button onClick={()=>handleDelete(item._id)} className='p-1 w-full  text-white bg-red-600' >Delete</button>
       </div>
 </div>
)
    }) }
     



   </div>
  )
}

export default ViewCountries
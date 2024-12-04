import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import { useNavigate } from 'react-router-dom';

function AdminClosedEnqPage() {

    const [data,setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/property/property-closed-status/`, {
              headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
            });
            setData(response.data.result)
          } catch (error) {
            throw error || "An error occurred during login.";
          }
    };

    fetchData();
  }, []);


  return (
    <div className='grid gap-2 grid-cols-1'>

<div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-4xl">View Closed Status</h1>
        </div>
{
    data.length > 0 && data.map((item)=>{
        return(
            <Cards item={item}  />
        )
    })
}
    </div>
  )
}

export default AdminClosedEnqPage





function Cards({item}) {

    const navigate = useNavigate();
  return (
    <section>

        <div
          className='sf-medium gap-2 text-sm flex flex-col rounded-[5px] px-4 py-2 border shadow-md'
        >
           <label htmlFor=""> Closed enquiry</label>
           <label htmlFor="" className=' capitalize'>Agent Name : {item?.agentDetails?.name}</label>
           {/* <label htmlFor="" className='text-blue-500 underline' onClick={()=> navigate(`/admin/enquiries/`,{state:{id:item?.enqId}}) }>Click to view</label> */}
        </div>
    
  </section>
  )
}

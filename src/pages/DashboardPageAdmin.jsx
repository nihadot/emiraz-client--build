import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import { errorToast } from '../toast';

function DashboardPageAdmin() {


    const [count,setCount] = useState(null);

    useEffect(()=>{
        fetchAllCounts();
    },[])


    const fetchAllCounts = async ()=>{
        try {
            const response = await axios.get(`${SERVER_URL}/admin/count-all`, {
                headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
              });
            setCount(response?.data?.result)
          } catch (error) {
            errorToast(
                error?.response?.data?.message ||
                  error?.message ||
                  "An error occurred during login."
              );
          }
    }

  return (
    <div>
        <div className="grid grid-cols-3 gap-3 ">

        <div className="bg-black rounded-xl flex justify-center gap-4 items-center h-[100px]">
            <label className='text-white text-xl' htmlFor="">Projects</label>
            <label className='text-white text-[30px]' htmlFor="">{count?.projects}</label>
        </div>




        <div className="bg-black rounded-xl flex justify-center gap-4 items-center h-[100px]">
            <label className='text-white text-xl' htmlFor="">Developers</label>
            <label className='text-white text-[30px]' htmlFor="">{count?.developer}</label>
        </div>





        <div className="bg-black rounded-xl flex justify-center gap-4 items-center h-[100px]">
            <label className='text-white text-xl' htmlFor="">Agents</label>
            <label className='text-white text-[30px]' htmlFor="">{count?.agency}</label>
        </div>



        <div className="bg-black rounded-xl flex justify-center gap-4 items-center h-[100px]">
            <label className='text-white text-xl' htmlFor="">Cities</label>
            <label className='text-white text-[30px]' htmlFor="">{count?.cities}</label>
        </div>



        <div className="bg-black rounded-xl flex justify-center gap-4 items-center h-[100px]">
            <label className='text-white text-xl' htmlFor="">Blogs</label>
            <label className='text-white text-[30px]' htmlFor="">{count?.blog}</label>
        </div>



        <div className="bg-black rounded-xl flex justify-center gap-4 items-center h-[100px]">
            <label className='text-white text-xl' htmlFor="">Leads</label>
            <label className='text-white text-[30px]' htmlFor="">{count?.enquiries}</label>
        </div>
        </div>
    </div>
  )
}

export default DashboardPageAdmin
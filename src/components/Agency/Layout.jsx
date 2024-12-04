import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LeftAgencyPanel from "./LeftAgencyPanel"
import axios from 'axios';
import { SERVER_URL } from '../../api';
import { AGENCY_ID, AGENCY_TOKEN } from '../../api/localstorage-varibles';

function Layout() {
  const [profile,setProfile] = useState({});

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${SERVER_URL}/agency/profile`,{
              headers: { Authorization: `Bearer ${localStorage.getItem(AGENCY_TOKEN)}` },
            });

          setProfile(response.data.result);
        } catch (error) {
          console.error('Error fetching Agency:', error);
        }
      };
  
      fetchData();
    }, []);


  return (
    <div className="flex mx-3 flex-row items-center justify-start  min-h-screen">
      
      <LeftAgencyPanel />
      <div className=" lg:ps-[245px] lg:pe-5 w-full h-[98vh]">
        <MobileMenu profile={profile}/>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout



function MobileMenu({profile}) {

  const navigate = useNavigate();
  const handleLogout = ()=> {
    const status = window.confirm('Are you sure you want to logout?')
    if(!status){
        return;
    }
    localStorage.removeItem(AGENCY_ID)
    localStorage.removeItem(AGENCY_TOKEN)
    navigate('/agent-login');
}

  return (
    <div className="flex lg:hidden mt-4 justify-between">
      <div className="flex gap-4 items-center">
      <img className='w-16 rounded-full h-16' src={profile?.imageFile?.secure_url} alt="" />
      <label htmlFor="">{profile?.name}</label>
      </div>
      <div className="">
        <button onClick={()=>handleLogout()} className='bg-red-500 text-white p-4 rounded'>Logout</button>
      </div>
    </div>
  )
}

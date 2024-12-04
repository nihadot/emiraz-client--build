import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ImageSVG from "../../assets/logo/ps_logo.png"


// --------------------REACT-ICONS---------------------------------//
import { FaRegCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { ADMIN_TOKEN, AGENCY_ID, AGENCY_TOKEN } from '../../api/localstorage-varibles';
import { FaUsers } from 'react-icons/fa';
import axios from 'axios';
import { SERVER_URL } from '../../api';
// --------------------REACT-ICONS---------------------------------//

function LeftAgencyPanel() {


    const navigate = useNavigate()
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
    <>
    <div className={`hidden z-50 fixed md:overflow-clip overflow-scroll top-0 left-0 ease-out duration-1000 max-w-60 h-screen bg-[#000000] text-white lg:block`}>
        <div className="pt-14 px-6">
            <img src={ImageSVG} alt="logo" className='w-44 h-12 object-contain'  />
        </div>
        <div className="flex justify-center items-center font-medium sf-medium flex-col">
            <div className="mt-12  ">
                { profile && profile.imageFile ? <img className='rounded-full w-[100px] h-[100px]' src={profile.imageFile.secure_url} alt="" /> : <FaRegCircleUser size={50} />}
                { profile && <label className=' flex mt-4 cursor-pointer capitalize text-lg justify-center  items-center gap-2' htmlFor="">{profile.name}</label> }
            </div>
         
            <h3 className=' flex mt-2 cursor-pointer text-xs text-white/50 justify-center  items-center gap-2' onClick={handleLogout}>Logout <MdLogout/></h3>
        </div> 
        <div className="flex justify-center text-[#ffffff] sf-medium font-medium pt-10 pb-12 px-4 ">
            <ul className='w-full'>
           
                <Link to={'/agent-dashboard/enquiries'}>
                    <li className='flex transition-all duration-150 ease-in-out hover:scale-105  items-center gap-3  hover:bg-white hover:text-black py-3 ps-4  w-full rounded-lg' > <FaUsers/> Leads</li>
                </Link>
               
            </ul>
        </div>
       
    </div>
  
    </>
  )
}

export default LeftAgencyPanel
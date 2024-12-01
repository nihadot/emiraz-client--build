import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ImageSVG from "../../assets/logo/ps_logo.png"


// --------------------REACT-ICONS---------------------------------//
import { FaRegCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { AGENCY_ID, AGENCY_TOKEN } from '../../api/localstorage-varibles';
import { FaUsers } from 'react-icons/fa';
// --------------------REACT-ICONS---------------------------------//

function LeftAgencyPanel() {


    const navigate = useNavigate()


  
    const handleLogout = ()=> {
        localStorage.removeItem(AGENCY_ID)
        localStorage.removeItem(AGENCY_TOKEN)
        navigate('/agent-login');
    }
    


  return (
    <>
    <div className={`block z-50 fixed md:overflow-clip overflow-scroll top-1 left-0 ease-out duration-1000 max-w-60 h-[99vh] rounded-e-[50px] bg-[#000000] text-white`}>
        <div className="pt-14 px-6">
            <img src={ImageSVG} alt="logo" className='w-44 h-12 object-contain'  />
        </div>
        <div className="flex justify-center items-center font-medium sf-medium flex-col">
            <div className="mt-12  ">
                <FaRegCircleUser size={50} />
            </div>
         
            <h3 className=' flex mt-4 cursor-pointer justify-center text-sm items-center gap-2' onClick={handleLogout}>Logout <MdLogout/></h3>
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
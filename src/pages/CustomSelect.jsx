import React from 'react'
import { errorToast } from '../toast';
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import axios from 'axios';

function CustomSelect({setData,setUserSelected}) {


    // const handleStatus = async(type)=>{

    //     let draft = 'false';
    //     try {
    
    //         if(type === 'draft'){
    //             draft = 'true';
    //         }else{
    //             draft = 'false';
    //         }


           
    //     //  const response = await axios.put(`${SERVER_URL}/property/draft/status/${projectId}`, data, {
    // const response = await axios.get(`${SERVER_URL}/property?draft=${draft}&issold=${}`,{

    //          headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    //        });
       
    //        setData(response.data.result);
     
    //      } catch (error) {
    //        errorToast(error?.response?.data?.message || error?.message  || 'Error')
    //      } 
    // }

  return (
    <div>
        <div className="bg-[#f7f7f7] font-extralight text-sm sf-normal border  text-black py-3.5 ps-4 me-4 w-40 rounded-3xl">
        <select name="" onChange={(e)=>setUserSelected(e.target.value)} id="" className='bg-transparent border-none outline-none w-[85%]'>
            <option value="non-draft">Not Draft</option>
            <option value="draft">Draft Items</option>
        </select>
        </div>

    </div>
  )
}

export default CustomSelect
import React from 'react'
import { errorToast } from '../toast';
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import axios from 'axios';

function CustomSelectSold({setData,setUserSelected}) {


  
  return (
    <div>
        <div className="bg-[#f7f7f7] font-extralight text-sm sf-normal border  text-black py-3.5 ps-4 me-4 w-40 rounded-3xl">
        <select name="" onChange={(e)=>setUserSelected(e.target.value)} id="" className='bg-transparent border-none outline-none w-[85%]'>
            <option value="non-sold">Not Sold Items</option>
            <option value="sold">Sold Items</option>
        </select>
        </div>

    </div>
  )
}

export default CustomSelectSold
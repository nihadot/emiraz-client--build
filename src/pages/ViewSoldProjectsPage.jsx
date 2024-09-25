import React, { useEffect, useState } from 'react'
import {  getProperties } from '../api';
import Cards from "../components/Cards"

import { errorToast } from '../toast';

function ViewSoldProjectsPage() {

  const [data,setData] = useState([]);


  useEffect(()=>{
    fetchdata()
  },[])

  const fetchdata =async ()=>{
    try {
      const response =  await getProperties('issold=sold')
      setData(response.result);
    } catch (error) {
     return errorToast(error.response.data.message || error.message || 'error occurs!')
    }
  }


  return (
    <div className='grid h-fit grid-cols-3 gap-2 flex-wrap'>
        { data && data?.map((item)=> <Cards disableDelete={true}  key={item._id} item={item} /> )}
    </div>
  )
}

export default ViewSoldProjectsPage
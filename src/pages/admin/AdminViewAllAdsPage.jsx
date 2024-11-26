import React, { useEffect, useState } from 'react'
import { deleteSideBanners, getCities, SERVER_URL } from '../../api';
import axios from 'axios';
import { ADMIN_TOKEN } from '../../api/localstorage-varibles';
import { errorToast } from '../../toast';

function AdminViewAllAdsPage() {

    const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/sidebar`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
          });
    //   const response = await getCities();
      setData(response.data.result);
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'Error occurred');
    }
  };


  const handleDelete = async (id) => {
    // console.log(id,'---')
    // return true;
    if (!id) return errorToast("Id Is Not Provided!");

    try {
      await deleteSideBanners(id);
    //   setRefresh(!refresh);
    } catch (error) {
    //   if (error.response && error.response.data) {
        errorToast(error?.response?.data?.message || error?.message || 'Error deleting');
    //   } else {
        // errorToast("An error occurred during login.");
    //   }
    }
  };

  console.log(data,'data')
  return (
    <div>
                
          <div className="flex gap-3 flex-wrap justify-center items-center">
            {data.length > 0 && data.map((item,index)=>{

             return (  <div key={index} className="" >
                  <img
                    className="w-[338px] h-[670px] my-3 lg:my-0"
                    src={item?.imageFile?.secure_url}
                    key={item._id}
                    alt="loading"
                    loading="lazy"
                  />

                  <p className="my-2 capitalize py-3 text-sm"> {item?.name} </p>
                 
                  <a
                    onClick={() => {
                      const status = confirm("Are you want to delete!");
                      if (status) {
                        handleDelete(item._id);
                      }
                    }}
                    className="text-red-500 cursor-pointer text-xs  hover:underline font-medium"
                  >
                    Delete
                  </a>
                </div>)
            })
                
}
            
          </div>
    </div>
    
  )
}

export default AdminViewAllAdsPage
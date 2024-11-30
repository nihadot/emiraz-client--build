import { useEffect, useState } from "react";
import { MAIN_IMAG_URL, SERVER_URL, deleteBannerLogo, deleteSideBanners, fetchSideBanners, getBannerLogos, getProperties } from "../api";
import { errorToast } from "../toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ADMIN_TOKEN } from "../api/localstorage-varibles";

function ViewSideBar() {
 

  const [data, setData] = useState([]);
  const [refresh,setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
  
    if (!id) return errorToast("Id Is Not Provided!");

    try {
      await deleteSideBanners(id);
      setRefresh(!refresh);
    } catch (error) {
        errorToast(error?.response?.data?.message || error?.message || 'Error deleting');
    }
  };

  return (
    <div>
                
          <div className="flex gap-3 flex-wrap flex-col justify-center items-start">
            {data.length > 0 && data.map((item,index)=>{

             return (  <div key={index} className="mb-20" >
               
               <div className="flex gap-3">

                  <img
                    className="w-[338px] h-[670px] my-3 lg:my-0"
                    src={item?.imageFile?.secure_url}
                    key={item._id}
                    alt="loading"
                    loading="lazy"
                  />


<img
                    className="w-[481px] h-[400px] my-3 lg:my-0"
                    src={item?.landScape?.secure_url}
                    key={item._id}
                    alt="loading"
                    loading="lazy"
                  />
               </div>


                  <p className="my-2 capitalize py-2 text-sm">Ads Name :  {item?.name} </p>
                  <p className="my-2  capitalize py-2 text-sm">Property Name :  {item?.property?.projectTitle} </p>
                 
                  <a
                    onClick={() => {
                      const status = confirm("Are you want to delete!");
                      if (status) {
                        handleDelete(item._id);
                      }
                    }}
                    className="text-red-500 cursor-pointer text-xs  hover:underline font-medium"
                  >
                   Delete Option :  Delete
                  </a>
                </div>)
            })
                
}
            
          </div>
    </div>
    
  )

}

export default ViewSideBar;

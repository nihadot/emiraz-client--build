import React from 'react'
import { useLocation } from 'react-router-dom'
import { errorToast } from '../../toast';
import { deleteSideBanners } from '../../api';

function AdminPropertyAdsViewPage() {


    const {state } = useLocation();

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

  return (
    <div className='flex gap-4'>
                
          <div className="flex gap-3 flex-wrap justify-center items-center">
            {state &&
                <div className="" >
                  <img
                    className="w-[338px] h-[670px] my-3 lg:my-0"
                    src={state?.adsDetails?.imageFile?.secure_url}
                    // key={item._id}
                    alt="loading"
                    loading="lazy"
                  />

                  <p className="my-2 capitalize py-3 text-sm"> {state?.adsDetails?.name} </p>
                 
                  <a
                    onClick={() => {
                      const status = confirm("Are you want to delete!");
                      if (status) {
                        handleDelete(state?.adsDetails._id);
                      }
                    }}
                    className="text-red-500 cursor-pointer text-xs  hover:underline font-medium"
                  >
                    Delete
                  </a>
                </div>
}
            
          </div>




          <div className="flex gap-3 flex-wrap justify-center items-center">
            {state &&
                <div className="" >
                  <img
                    className="w-[481px] h-[400px]  my-3 lg:my-0"
                    src={state?.adsDetails?.landScape?.secure_url}
                    // key={item._id}
                    alt="loading"
                    loading="lazy"
                  />

                  {/* <p className="my-2 capitalize py-3 text-sm"> {state?.adsDetails?.name} </p> */}
                 
            
                </div>
}
            
          </div>
    </div>
  )
}

export default AdminPropertyAdsViewPage
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBannerSuccess, fetchBanner, setLoading } from '../features/bannerSlice';
import { deleteBanner, getBanners } from '../api';
import { setError } from '../features/propertiesSlice';
import { errorToast, successToast } from '../toast';
import { useNavigate } from 'react-router-dom';

function EditBanners() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { data } = useSelector((state) => state.banner); 
  const [refresh,setRefresh] = React.useState(true);


  React.useEffect(()=>{
    fetchdata()
  },[refresh])

  const fetchdata =async ()=>{
    try {
      dispatch(setLoading());
      const response = await
       getBanners()
      dispatch(fetchBanner(response));

    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response.data.message)
      } else {
        dispatch(setError('An error occurred during login.'));
        errorToast('An error occurred during login.');
      }
    }
    }


    const handleDelete = async (id) => {
        if (!id) return errorToast("Id Is Not Provided!");
    
        try {
          dispatch(setLoading());
          await deleteBanner(id);
          dispatch(deleteBannerSuccess());
          successToast("Successfully Deleted");
          setRefresh(!refresh);
        } catch (error) {
          if (error.response && error.response.data) {
            dispatch(setError(error.response.data.message));
            errorToast(error.response.data.message);
          } else {
            dispatch(setError("An error occurred during login."));
            errorToast("An error occurred during login.");
          }
        }
      };

  return (
    <>

        <div className='mt-3'>
            {
                data?.map((item)=>{
                    return(
                        <>
                        <div key={item._id} className="w-full h-52 flex rounded-[20px] overflow-hidden">
                            <div className="flex-[55%] text-[#FFFFFF] bg-[#000000] ps-8 pt-10">
                                <h1 className='poppins-semibold text-3xl pb-3 '>{item.bannerHeadline.length > 26 ? item.bannerHeadline.slice(0,26) + '...' : item.bannerHeadline}</h1>
                                <p className='poppins-medium text-lg pb-2'>
                                    {item.bannerSubtext.length > 108 ? item.bannerSubtext.slice(0,108) + '...' : item.bannerHeadline}
                                </p>
                                <button onClick={()=>navigate(`/admin/${item.buttonLink}`)} className='text-[#000000] py-3 px-5 bg-[#ffffff] rounded-[10px] poppins-semibold text-xs'>
                                {item.buttonText.length > 19 ? item.buttonText.slice(0,19) + '...' : item.buttonText}
                                </button>
                            </div>
                            <div className="flex-[45%] relative">
                                <img src={item.mainImgaeLink} className='w-full object-cover h-full ' alt="banner" />
                                <div className="shadow from-black absolute z-30 top-1 left-1 to-blue-400 w-28 h-64">
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 w-28 h-12 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
                            <span onClick={()=>navigate(`/admin/edit-banner/${item._id}`,{state:item})} className="poppins-semibold text-lg">Edit</span>
                        </div>
                        <div className="mt-4 w-28 h-12 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
                            <span onClick={()=>handleDelete(`${item._id}`)} className="poppins-semibold text-lg">Delete</span>
                        </div>
                        </>

                    )
                })
            }
            
        </div>

       
    </>
  )
}

export default EditBanners
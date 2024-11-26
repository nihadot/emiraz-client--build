import { useEffect, useState } from "react";
import { MAIN_IMAG_URL, deleteBannerLogo, deleteSideBanners, fetchSideBanners, getBannerLogos, getProperties } from "../api";
import { errorToast } from "../toast";
import { useNavigate } from "react-router-dom";

function ViewSideBar() {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchdata();
  // }, [refresh]);

  const fetchdata = async () => {
    try {
      const response = await fetchSideBanners();
      console.log(response,'response')
      const result = response.filter(item => item.adsDetails);
      console.log(result,'result')
      setData(result);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
      } else {
        errorToast("An error occurred during login.");
      }
    }
  };




    // Fetch initial data when component mounts
    useEffect(() => {
      fetchInitialData();
    }, []);
  
    const fetchInitialData = async () => {
      try {
        const response = await getProperties({ page: 1, limit: 100 }); // Fetch first 100 records
        // console.log(response,'----')
        const result = response.result.filter(item => item.adsDetails);
        setData(result);
        // console.log(result,'result')
        // setHasMore(response?.result.length === 100); // If we got 100, assume more data is available
      } catch (error) {
        errorToast(
          error?.response?.data?.message ||
            error?.message ||
            "Error occurred while fetching properties"
        );
      }
    };

    console.log(data,'data')

    const handleClick = (item)=>{
      navigate(`/admin/ads/view-ads/${item._id}`,{state:item});
    }

  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium  font-medium text-5xl">Views</h1>
        </div>


      {data.length > 0 && data.map((item,index)=>{
        return(
          <div onClick={()=>handleClick(item)} className="w-full hover:scale-[1.01] hover:border-gray-300 hover:border duration-300 ease-in-out transition-all my-2 h-20 rounded p-2 bg-slate-100  object-cover items-center justify-start gap-4 flex">
          <img className="object-cover max-w-32  w-full h-full" src={item.imageFile.secure_url} alt="" />
          <p className="my-2 text-sm"> {item.projectTitle} </p>
        </div>
        )
})}


      </div>
    </div>
  );
}

export default ViewSideBar;

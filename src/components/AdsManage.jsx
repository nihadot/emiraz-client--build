import { useEffect, useState } from "react";
import { getProperties, updateAdsStatusAPI, updateEnquiryStatus } from "../api";
import { errorToast } from "../toast";

function AdsManage() {
  const [properties, setProprties] = useState([]);
  const [status, setStatus] = useState({ status: false, id: "" });
  const [toggleButton, setToggleButton] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchdata();
  }, [refresh]);

  const fetchdata = async () => {
    try {
      const response = await getProperties();
      setProprties(response.result);
    } catch (error) {
        console.log(error)
    }
  };

  const handleStatus = (status, id) => setStatus({ status, id });

  const handleStatusOfAds = async (status,id) => {
    try {
      await updateAdsStatusAPI({status,id});
      setRefresh(!refresh);
    } catch (error) {
      errorToast(
        error.response.data.message ||
          error.message ||
          "An error occurred during login."
      );
    }
  };

  return (
    <div className=" md:h-[65vh] overflow-scroll md:overflow-scroll">
        <div className="flex gap-3 my-4 mx-5">
            <button onClick={()=>setToggleButton(true)} className={`capitalize text-center h-[45px] ${toggleButton ? 'bg-black text-white border-none shadow-none' : 'border shadow-md bg-white'}  transition-all ease-in-out duration-200 w-[150px] rounded-full`} >Properties</button>
            <button onClick={()=>setToggleButton(false)} className={`capitalize text-center h-[45px] ${!toggleButton ? 'bg-black text-white border-none shadow-none' : 'border shadow-md bg-white'}  transition-all ease-in-out duration-200 w-[150px] rounded-full`} >Ads</button>
        </div>
      <table className="w-full">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="p-3 text-[23px] poppins-semibold">Name</th>
            <th className="p-3 text-[23px] poppins-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {[...properties]?.map((item,index) => {
            return (
                <>
                {item?.isAds === false && toggleButton === true  &&
              <tr key={item._id} className="bg-transparent hover:bg-[#EBEBEB]">
                
                <td className="p-3 poppins-medium text-[14px] ">
                  {item?.propretyHeadline}
                </td>
                <td>
                <button onClick={()=>handleStatusOfAds(false,item._id)} className={`mr-1 text-[14px] capitalize text-center h-[34px] ${!item?.isAds ? 'bg-black text-white border-none shadow-none' : 'border shadow-md bg-white'}  transition-all ease-in-out duration-200 w-[90px] rounded-full`} >Normal</button>
                <button onClick={()=>handleStatusOfAds(true,item._id)} className={`text-[14px] capitalize text-center h-[34px] ${item?.isAds ? 'bg-black text-white border-none shadow-none' : 'border shadow-md bg-white'}  transition-all ease-in-out duration-200 w-[90px] rounded-full`} >Ads</button>
                </td>
                
               
              </tr>  }


              {item?.isAds === true && toggleButton === false  &&
              <tr key={item._id} className="bg-transparent hover:bg-[#EBEBEB]">
                
                <td className="p-3 poppins-medium text-[14px] ">
                  {item?.propretyHeadline}
                </td>
                <td>
                <button onClick={()=>handleStatusOfAds(false,item._id)} className={`mr-1 text-[14px] capitalize text-center h-[34px] ${!item?.isAds ? 'bg-black text-white border-none shadow-none' : 'border shadow-md bg-white'}  transition-all ease-in-out duration-200 w-[90px] rounded-full`} >Normal</button>
                <button onClick={()=>handleStatusOfAds(true,item._id)} className={`text-[14px] capitalize text-center h-[34px] ${item?.isAds ? 'bg-black text-white border-none shadow-none' : 'border shadow-md bg-white'}  transition-all ease-in-out duration-200 w-[90px] rounded-full`} >Ads</button>
                </td>
                
               
              </tr>}
                </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdsManage;

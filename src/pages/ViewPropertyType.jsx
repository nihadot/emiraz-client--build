import { useEffect, useState } from "react";
import { errorToast, successToast } from "../toast";
import { MAIN_IMAG_URL, deletePropertyType, fetchPropertyTypeAPI } from "../api";
import { Navigate, useNavigate } from "react-router-dom";

function ViewPropertyType() {
  const [isLoading, setIsLoading] = useState();
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate([]);

  useEffect(() => {
    fetchdata();
  }, [refresh]);

  const fetchdata = async () => {
    try {
        setIsLoading(true)
      const response = await fetchPropertyTypeAPI();
      setData(response.result)
      setIsLoading(false)
    }  catch (error) {
        errorToast(error.response.data.message || error.message || 'An error occurred ')
        setIsLoading(false)
    }
  };

  const handleDelete = async (id) => {
      
    try {
      if (!id) return errorToast("Id Is Not Provided!");
      await deletePropertyType(id);
      successToast("Successfully Deleted");
      setRefresh(!refresh);
    } catch (error) {
        errorToast(error.response.data.message || error.message || 'An error occurred ')
        setIsLoading(false)
    }
  };

  return (
    <div>
      <div className="h-fit">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium  font-medium text-5xl">Property Types</h1>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          { data && data.map((item) => (
            <div key={item.propertyType._id} className="w-full border border-[##D2D2D2] flex justify-center items-center  md:w-fit m-auto   p-4 rounded-[15px]">
            <div className="poppins-medium w-full">
               
                <img src={`${MAIN_IMAG_URL}/${item.propertyType.mainImgaeLink}`} alt='loading' className="md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]" loading="lazy" />
                <h1 className="mt-2 text-[25px]">{item.propertyType.name}</h1>
                <p className="mt-2text-[15px] text-[#666666]">
                    <span className="me-1"> {item.counts} </span>
                     {'New Projects Availble'}</p>
                     <div className="flex gap-3 mb-2">
                <span onClick={()=>navigate(`/admin/edit-property-type/${item.propertyType._id}`,{ state: item.propertyType })} className="border cursor-pointer bg-green-500 rounded-md px-6 py-1 text-white">Edit</span>
                    <span
                    onClick={() => {
                        const status = confirm('Are you want to delete!')
                        if(status){
                            handleDelete(item.propertyType._id)
                        }
                      }}
                     className="border cursor-pointer bg-red-600 rounded-md px-3 py-1 text-white">Delete</span>
                </div>
            </div>
        </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewPropertyType;






import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_IMAG_URL, fetchPropertyTypeAPI, getPropertiesCounts } from "../../api";
import { errorToast } from "../../toast";
import Lazyloading from "../Lazyloading/Lazyloading";
function PropertyType() {

    const [isLoading, setIsLoading] = useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate([]);

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


    React.useEffect(() => {
        fetchdata();
      }, []);

    
    
  return (
    <section>
      <h1 className="mb-8 sf-medium sf-medium-600 justify-center items-center text-[30px] md:text-[50px] flex flex-col leading-[23px] md:leading-tight lg:flex-row gap-4">
        <span className="block text-center ">Availability Based on</span>
        <span className="block text-center text-[#666666]">Property Types</span>
      </h1>

      <div className="mt-4 grid justify-items-center  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 capitalize">
                   { data && data.map((item)=>{
                    return(
                        <div key={item.propertyType._id} onClick={()=>navigate(`/property-type/${item.propertyType._id}/${item.propertyType.name}`)} className="w-full cursor-pointer border border-[#D2D2D2] flex justify-center items-center  md:w-fit   p-4 rounded-[15px]">
                        <div className="poppins-medium w-full">
                            <Lazyloading src={`${MAIN_IMAG_URL}/${item.propertyType.mainImgaeLink}`} alt={item.propertyType.name} className="md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]" loading="lazy" />
                            <h1 className="mt-2 text-[25px]">{item.propertyType.name}</h1>
                            <p className="mt-2text-[15px] text-[#666666]">
                                <span className="me-1"> { item.counts } </span>
                                 { item?.counts === 0 ? 'Not available' : item?.counts === 1 ? 'Project Available': 'Projects Available'}</p>
                        </div>
                    </div>
                    )
                   }) }

                   
      </div>
    </section>
  );
}

export default PropertyType;

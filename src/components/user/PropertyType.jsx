import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_IMAG_URL, SERVER_URL, fetchPropertyTypeAPI, getPropertiesCounts } from "../../api";
import { errorToast } from "../../toast";
import Lazyloading from "../Lazyloading/Lazyloading";
import { apartment, penthouse, townhouse, villa } from "../../assets/images";
import axios from "axios";
function PropertyType() {

  const [data,setData] = useState([]);


  useEffect(()=>{
    fetchData();
  },[])


  const fetchData = async()=>{
   await axios.get(`${SERVER_URL}/property/get-property-type/count`).then((response)=>{
  //  console.log(response.data.result,'ddfd')
  setData(response.data.result);
    }).catch((error)=> console.log(`Error si : ${error?.message}`) )
  }

  const navigate = useNavigate();
  

  // console.log(data,'data')
    const apartment__data = data.find((item)=> item.propertyType === 'apartment');
    const townhouse__data = data.find((item)=> item.propertyType === 'townhouse');
    const penthouse__data = data.find((item)=> item.propertyType === 'penthouse');
    const villa__data = data.find((item)=> item.propertyType === 'villa');
  return (
    <section>
      <h1 className="mb-8 min-[1037px]:flex sf-medium sf-medium-600  text-[30px] md:text-[50px]  leading-[23px] md:leading-tight  justify-center items-center flex-row   gap-4">
        <span className="block text-center ">Availability Based on</span>
        <span className="block text-center text-[#666666]">Property Types</span>
      </h1>
{/* 
      <h1 className="mb-8 sf-medium sf-medium-600 justify-center items-center text-[30px] md:text-[50px]  flex flex-col leading-[23px] md:leading-tight lg:flex-row gap-4">
        <span className="block text-center ">Availability Based on</span>
        <span className="block text-center text-[#666666]">Property Types</span>
      </h1> */}

      <div className="mt-4 grid justify-items-center  grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-3 capitalize">
                   {/* { data && data.map((item)=>{ */}
                    {/* return( */}
                        <div  onClick={()=>navigate(`/property-type/apartment/`)} className="w-full cursor-pointer border border-[#D2D2D2] flex justify-center items-center  md:w-fit   p-4 rounded-[15px]">
                        <div className="poppins-medium w-full">
                            <Lazyloading src={apartment} alt={'apartment'} className="md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]" loading="lazy" />
                            <h1 className="mt-2 text-[25px]">Apartment</h1>
                            <p className="mt-2text-[15px] text-[#666666]">
                                <span className="me-1"> { apartment__data?.totalProperties } </span>
                                 { apartment__data === 0 ? 'Not available' : apartment__data === 1 ? 'Project Available': 'Projects Available'}</p>
                        </div>
                    </div>



                    <div  onClick={()=>navigate(`/property-type/villa/`)} className="w-full cursor-pointer border border-[#D2D2D2] flex justify-center items-center  md:w-fit   p-4 rounded-[15px]">
                        <div className="poppins-medium w-full">
                            <Lazyloading src={villa} alt={'apartment'} className="md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]" loading="lazy" />
                            <h1 className="mt-2 text-[25px]">Villa</h1>
                            <p className="mt-2text-[15px] text-[#666666]">
                                <span className="me-1"> { villa__data?.totalProperties } </span>
                                 { villa__data === 0 ? 'Not available' : villa__data === 1 ? 'Project Available': 'Projects Available'}</p>
                        </div>
                    </div>




                    <div  onClick={()=>navigate(`/property-type/townhouse/`)} className="w-full cursor-pointer border border-[#D2D2D2] flex justify-center items-center  md:w-fit   p-4 rounded-[15px]">
                        <div className="poppins-medium w-full">
                            <Lazyloading src={townhouse} alt={'townhouse'} className="md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]" loading="lazy" />
                            <h1 className="mt-2 text-[25px]">Townhouse</h1>
                            <p className="mt-2text-[15px] text-[#666666]">
                                <span className="me-1"> { townhouse__data?.totalProperties } </span>
                                 { townhouse__data === 0 ? 'Not available' : townhouse__data === 1 ? 'Project Available': 'Projects Available'}</p>
                        </div>
                    </div>




                    <div  onClick={()=>navigate(`/property-type/penthouse/`)} className="w-full cursor-pointer border border-[#D2D2D2] flex justify-center items-center  md:w-fit   p-4 rounded-[15px]">
                        <div className="poppins-medium w-full">
                            <Lazyloading src={penthouse} alt={'penthouse'} className="md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]" loading="lazy" />
                            <h1 className="mt-2 text-[25px]">Penthouse</h1>
                            <p className="mt-2text-[15px] text-[#666666]">
                                <span className="me-1"> { penthouse__data?.totalProperties } </span>
                                 { penthouse__data === 0 ? 'Not available' : penthouse__data === 1 ? 'Project Available': 'Projects Available'}</p>
                        </div>
                    </div>





                    {/* <div key={item.propertyType._id} onClick={()=>navigate(`/property-type/${item.propertyType._id}/${item.propertyType.name}`)} className="w-full cursor-pointer border border-[#D2D2D2] flex justify-center items-center  md:w-fit   p-4 rounded-[15px]">
                        <div className="poppins-medium w-full">
                            <Lazyloading src={`${MAIN_IMAG_URL}/${item.propertyType.mainImgaeLink}`} alt={item.propertyType.name} className="md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]" loading="lazy" />
                            <h1 className="mt-2 text-[25px]">{item.propertyType.name}</h1>
                            <p className="mt-2text-[15px] text-[#666666]">
                                <span className="me-1"> { item.counts } </span>
                                 { item?.counts === 0 ? 'Not available' : item?.counts === 1 ? 'Project Available': 'Projects Available'}</p>
                        </div>
                    </div> */}
                    {/* )
                   }) } */}

                   
      </div>
    </section>
  );
}

export default PropertyType;

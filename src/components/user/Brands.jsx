import React from "react";
import { MAIN_IMAG_URL, getBannerLogos } from "../../api";
import { errorToast } from "../../toast";
import Lazyloading from "../Lazyloading/Lazyloading";

function Brands() {

  const [data,setData] = React.useState([]);


  React.useEffect(()=>{
    fetchdata()
  },[])

  const fetchdata =async ()=>{
    try {
      const response = await getBannerLogos()
      setData(response.result)

    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message)
      } else {
        errorToast('An error occurred during login.');
      }
    }
    }

  return (
    <div className="justify-center lg:justify-start flex-wrap mt-6 md:mt-3 flex gap-4 md:gap-2 items-center">
      {
        data && data.length > 0 && data.map((item)=>{
          return <div className="me-[10px]" key={item._id}>

           { item?.mainImgaeLink && <Lazyloading
              src={`${MAIN_IMAG_URL}/${item?.mainImgaeLink}`}
              alt={'premium slots'}
              className=" object-cover bg-transparent brand-logo w-full my-3 lg:my-0"
              // className=" w-full h-full  my-3 lg:my-0 "
            />}
          </div>
        })
      }
    </div>
  );
}

export default Brands;

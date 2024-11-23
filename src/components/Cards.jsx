import { FaBed } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { PiShareFatThin } from "react-icons/pi";

import PlaceHolder from "../assets/placeholder/placeholder-image.png";
// swipper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { MAIN_IMAG_URL, SMALL_IMAG_URL } from "../api";
import Lazyloading from "./Lazyloading/Lazyloading";
import { ShareIcon, MoneyIcon } from "../assets/icons";
import { useEffect } from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function PropertiesCard({ view,item,handleDelete,disableDelete = false }) {


  const formattedDate = item?.handoverDate
  ? new Date(item.handoverDate).toISOString().split('T')[0] // Extract YYYY-MM-DD
  : 'N/A';

  const navigate = useNavigate()
  const handleShare = (title, url) => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: `https://propertyseller.ae/${url}`,
        })
        .then(() => console.log("Thanks for sharing!"))
        .catch(console.error);
    }
  };

  const propertyTypesResult = item?.propertyType?.map((i, index) => {
    return (
      <p key={index}>
        {i} {item?.propertyType?.length > index + 1 && ","}
      </p>
    );
  }) ;
  useEffect(() => {
    const indicators = document.querySelectorAll(".swiper-pagination");

    // console.log(indicators,'indicators')
    // indicators.style.width = '300px'
    for (let index = 0; index < indicators.length; index++) {
      // console.log(index)
      const element = indicators[index];
      for (let i = 0; i < element.childNodes.length; i++) {
        // const e = element[i];
        // const indicators = document.querySelectorAll(".swiper-pagination");
        if (i > 8) {
          const e = element.childNodes[i];
          e.style.display = "none";
        }
        // e.style.display = "none"
        // console.log(e,'--')
      }
      // console.log(element.childNodes.length,'-ssss')
      // if (7 < index) {
      // console.log(element.length)
      // }
    }

    // console.log(indicators,'indicators')
  }, []);



  const FirstImage =item && (
    <SwiperSlide className="relative">
    { item?.isSold && <div className="w-full h-full bg-black/60 absolute z-50 text-white flex justify-center items-center sf-bold text-[35px]">Sold Out</div>}

      { !view && <Lazyloading
        src={item?.imageFile ? URL.createObjectURL(item?.imageFile) : PlaceHolder}
        className="w-full h-full object-cover"
        alt={item?.projectTitle}
      />}

      {
        view &&<Lazyloading
        src={item?.imageFile?.secure_url}
        className="w-full h-full object-cover"
        alt={item?.projectTitle}
      />
      }
    </SwiperSlide>
  )

  const OtherImages = item && item?.imageFiles?.map((i, index) => {
    return (
      <SwiperSlide key={index} className="relative">
    {  item?.isSold && <div className="w-full h-full bg-black/60 absolute z-50 text-white flex justify-center items-center sf-bold text-[35px]">Sold Out</div>}

       { !view &&  <Lazyloading
          src={`${ i  && URL.createObjectURL(i)}`}
          className="w-full border-radious-20 h-full object-cover"
          alt={item?.projectTitle}
        />}
{/* {console.log(i.secure_url,'i?.secure_url')} */}
        {
          view &&<Lazyloading
          src={i.secure_url}
          className="w-full border-radious-20 h-full object-cover"
          alt={item?.projectTitle}
        />
        }
      </SwiperSlide>
    );
  })

  return (
    <div className="card-container max-w-[370px] w-full border-radious-20 overflow-hidden">
      <div className="card-slider relative border-radious-20 overflow-hidden">
        <Swiper
          cssMode={true}
          style={{ width: "100%", height: "100%",borderRadius:"20px",overflow:"hidden", textAlign: "center" }}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {FirstImage || ''}
          {OtherImages || ''}
        </Swiper>
        { item.priority &&  <span className="flex absolute top-3 right-3 rounded-full w-9 h-9 bg-black z-40 text-white justify-center items-center">{item.priority}</span>}
        { item.draft &&  <span className="flex absolute top-14 right-3 rounded-lg w-16 h-9 bg-black z-40 text-white justify-center items-center">Draft</span>}


        {/* desktop */}
        {/* <div className="hidden absolute w-full md:flex justify-between  z-30 px-4 top-4 left-0 ">
          <div className="">
            <div className=" px-1 flex items-center py-1 h-[29px] w-[205px] bg-[#000000] text-[#ffffff]  justify-center gap-3  rounded-md ">
              <SlCalender />
              <p className="poppins font-semibold text-[10px]">
                Hand Over Date : {item.handoverDate}
              </p>
            </div>
            {item?.isChecked && (
              <div className=" mt-1 flex items-center w-[205px] px-1 bg-[#fff] text-[#000] py-1 h-[29px] justify-center gap-3  rounded-md ">
                <GiReceiveMoney />
                <p className="uppercase poppins font-semibold text-[10px]">
                  Post Handover Payment Plan
                </p>
              </div>
            )}
          </div>
          <div
            onClick={() =>
              handleShare(
                item.propretyHeadline,
                `item/${item.propretyHeadline
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${item._id}`
              )
            }
            className="bg-[#ffffff] cursor-pointer rounded-md w-8 h-8 flex  justify-center items-center"
          >
            <PiShareFatThin />
          </div>
        </div> */}
        {/* desktop */}

        <div className="flex  absolute w-full justify-between  z-30 px-4 top-4 left-0 ">
          <div className=" w-full ">
            <div className="  flex items-center w-[170px]  bg-[#000000] text-[#ffffff]  h-[20px] justify-center gap-3  rounded-[3px] ">

              <p className="uppercase poppins font-semibold text-[10px]">
                HandOver Date : {formattedDate}
                {/* {console.log(item.handoverDate,'sdsd')} */}
              </p>
            </div>
            {item?.isChecked && (
              <div className=" mt-1 flex items-center w-[170px]  bg-[#fff] text-[#000]  h-[20px] justify-center gap-3  rounded-[3px] ">
                <p className="uppercase poppins font-semibold text-[10px]">
                  Post Handover Payment Plan
                </p>
              </div>
            )}

          </div>
          <div
            onClick={() =>
              handleShare(
                item.projectTitle,
                `property/${item.projectTitle
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${item._id}`
              )
            }
            className="bg-[#ffffff] cursor-pointer rounded-md w-8 h-8 flex  justify-center items-center"
          >
            <PiShareFatThin />
          </div>
        </div>
      </div>
      <div className="px-5 py-3 poppins-medium">
        <div className="text-[#545454] font-normal text-xs  flex justify-between items-center">
          <div className="capitalize flex gap-0.5">{propertyTypesResult}</div>
          <div className="flex gap-2 justify-center items-center">
            <FaBed color="#545454" size={18} />
            <span className="font-normal text-[10px] max-w-[200px]">{item.beds}</span>
          </div>
        </div>
        <div className=" poppins-semibold text-[#000000] text-xl mt-3">
          { item?.projectTitle ? <h1
            className="overflow-hidden w-full whitespace-nowrap"
            style={{ textOverflow: "ellipsis" }}
          >
            {item.projectTitle}
          </h1> : <h1 className="h-7"></h1>}
        </div>
        <div className="poppins-semibold text-[#000000] text-base mt-3">
          <h1 className="font-medium">
            Starting from{" "}
            <span className="font-bold text-xl">{item.priceInAED}</span>
          </h1>
        </div>

        <div className="flex justify-start items-center gap-1 mt-3">
          <IoLocationSharp  size={19} className="-ms-1 ps-0" color="#545454" />
          <p className="font-normal line-clamp-1 poppins text-xs text-[#545454]">
            {item?.address}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <FaBuilding color="#545454" size={15} />
          <p className=" capitalize font-semibold text-[10px] poppins">
            { view ? item?.developerDetails?.developerName : item?.developer?.developerName}
          </p>
        </div>

        <div className="mt-5 mb-2.5 flex gap-2">
          <button
          disabled={!view}
            onClick={() =>
              navigate(`/admin/edit-property-page/${item._id}`, { state: item })
            }
            className={` ${ !view && 'opacity-20' } flex-1 py-2.5 rounded font-semibold border border-[#000] text-[10px] bg-whire text-[#000000]`}
          >
            Edit
          </button>
          <button
          
          disabled={!view}
            className={`flex-1 ${ !view && 'opacity-20' } py-2.5 rounded font-semibold text-[10px] ${disableDelete ? 'bg-black/45' : 'bg-[#000000]'} text-[#ffffff]`}
            onClick={() => {
              const status = confirm("Are you want to delete!");
              if (status) {
                handleDelete(item._id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertiesCard;

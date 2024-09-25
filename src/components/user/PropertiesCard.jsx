import { FaBed } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { PiShareFatThin } from "react-icons/pi";

import PlaceHolder from "../../assets/placeholder/placeholder-image.png";
// swipper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./card.css";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { MAIN_IMAG_URL, SMALL_IMAG_URL } from "../../api";
import Lazyloading from "../Lazyloading/Lazyloading";
import { useEffect } from "react";

function PropertiesCard({ item, handleRegister, navigate }) {
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

  const result = item.propertyType.map((i, index) => {
    return (
      <p key={index}>
        {i.name} {item.propertyType?.length > index + 1 && ","}
      </p>
    );
  });
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

  return (
    <div className="card-container  rounded-[10px] overflow-hidden">
      <div className="card-slider relative rounded-[10px] overflow-hidden">
     
        <Swiper
          cssMode={true}
          style={{ width: "100%", height: "100%",overflow:"hidden", textAlign: "center" }}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
          {item.mainImgaeLink && (
            <SwiperSlide className="relative">
            { item.isSold && <div className="w-full h-full bg-black/60 absolute z-50 text-white flex justify-center items-center sf-bold text-[35px]">Sold Out</div>}
              <Lazyloading
                src={`${
                  item?.mainImgaeLink
                    ? MAIN_IMAG_URL + "/" + item?.mainImgaeLink
                    : PlaceHolder
                }`}
                className="w-full h-full object-cover"
                alt={item?.propretyHeadline}
              />
            </SwiperSlide>
          )}
          {item?.smallImage?.map((i, index) => {
            return (
              <SwiperSlide key={index} className="relative">
              { item.isSold && <div className="w-full h-full bg-black/60 absolute z-50 text-white flex justify-center items-center sf-bold text-[35px]">Sold Out</div>}
                <Lazyloading
                  src={`${i ? SMALL_IMAG_URL + "/" + i : PlaceHolder}`}
                  className="w-full rounded-[10px] h-full object-cover"
                  alt={item?.propretyHeadline}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

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
          <div className="">
            <div className="  flex items-center w-[170px]  bg-[#000000] text-[#ffffff]  h-[20px] justify-center gap-3  rounded-[3px] ">
              <p className="uppercase poppins font-semibold text-[10px]">
                HandOver Date : {item?.handoverDate}
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
                item?.propretyHeadline,
                `property/${item?.propretyHeadline
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${item?._id}`
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
          <div className="capitalize flex gap-0.5">{result}</div>
          <div className="flex gap-2 justify-center items-center">
            <FaBed color="#545454" size={18} />
            <span className="font-normal text-[10px]">{item?.beds}</span>
          </div>
        </div>
        <div className=" poppins-semibold text-[#000000] text-xl mt-3">
          <h1
            className="overflow-hidden w-full whitespace-nowrap"
            style={{ textOverflow: "ellipsis" }}
          >
            {item?.propretyHeadline}
          </h1>
        </div>
        <div className="poppins-semibold text-[#000000] text-base mt-3">
          <h1 className="font-medium">
            Starting from{" "}
            <span className="font-bold text-xl">{item?.price}</span>
          </h1>
        </div>

        <div className="flex justify-start items-center gap-1 mt-3">
          <IoLocationSharp  size={19} className="-ms-1 ps-0" color="#545454" />
          <p className="font-normal poppins text-xs text-[#545454]">
            {item?.address}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <FaBuilding color="#545454" size={15} />
          <p className="font-semibold text-[10px] poppins">
            {item?.developerInfo?.developerName}
          </p>
        </div>

        <div className="mt-5 mb-2.5 flex gap-2">
          <button
            onClick={() => {
              navigate(
                `/property/${item?.propretyHeadline?.trim().toLowerCase().replace(/\s+/g, "-")}/${item._id}`,
                {
                  state: item,
                }
              );
            }}
            className="flex-1 border border-[#000000] py-2 rounded font-semibold text-[10px] bg-white text-[#000000]"
          >
            Details
          </button>
          <button
            className="flex-1 py-2 rounded font-semibold text-[10px] bg-[#000000] text-[#ffffff]"
            onClick={() => {
              handleRegister(item?._id, item?.developerRef);
            }}
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertiesCard;

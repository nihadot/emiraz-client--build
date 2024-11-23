import React, { useEffect } from 'react'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css"

import PlaceHolder from "../../assets/placeholder/placeholder-image.png";
// swipper
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import Lazyloading from '../Lazyloading/Lazyloading';
import { MAIN_IMAG_URL, PROJECT_MAIN_IMAGE_URL, PROJECT_SUB_IMAGE_URL } from '../../api';
import { PiShareFatThin } from 'react-icons/pi';
import { FaBed, FaBuilding } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { formatDate } from '../../utils/formatDate';


function PropertyListingCard({previewLink,modify,prevMain,viewMain,preview,normal,user,item, handleRegister, navigate,enqButtonStatus,handleDelete}) {

    // gone developerName = field if user select an developer then find the developer and assining developerName as the developerName
console.log(item,'imagesLink')
    //  enquiry now button status - true or false = field is enqButtonStatus
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


  const result = item?.projectTypes?.map((i, index) => {
    return (
      <p key={index}>
        {i} {item?.projectTypes?.length > index + 1 && ","}
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
        <div className="card-container relative rounded-[10px] overflow-hidden max-w-[382px] w-full">
                        {item?.priority && <div className="w-8 h-8 rounded-full absolute top-2 z-40 right-3 bg-black text-white text-sm flex items-center justify-center">{item?.priority}</div>}
          <div className="card-slider relative rounded-[10px] overflow-hidden">
          { item?.isSold && <div className="w-full h-full bg-black/60 absolute z-50 text-white flex justify-center items-center sf-bold text-[35px]">Sold Out</div>}

          

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

{ item?.isDraft && 
                
                <div className="z-10 mt-1 px-4 absolute bottom-3 left-3   flex items-center  bg-[#000] text-[#fff]  h-[20px] justify-center gap-3  rounded-[3px] ">
                    <p className="uppercase poppins font-semibold text-[10px]">
                      Not Published
                    </p>
                  </div>
                }

              {true && (
                <SwiperSlide className="relative">
             
                  <Lazyloading
                    src={`${
                      item?.preview ? item.preview : previewLink ? previewLink : item?.imageLink
                        ? PROJECT_MAIN_IMAGE_URL + "/" + item?.imageLink
                        : PlaceHolder
                    }`}
                    className="w-full h-full object-cover"
                    alt={item?.name}
                  />
                </SwiperSlide>
              )}
              {preview && item?.projectImagesPreview?.map((i, index) => {
                return (
                  <SwiperSlide key={index} className="relative">
                  { item.isSold && <div className="w-full h-full bg-black/60 absolute z-50 text-white flex justify-center items-center sf-bold text-[35px]">Sold Out</div>}
                    <Lazyloading
                      src={`${URL.createObjectURL(i)}`}
                      className="w-full rounded-[10px] h-full object-cover"
                      alt={item?.name}
                    />
                  </SwiperSlide>
                );
              })}


{item?.imagesLink?.map((i, index) => {
                return (
                  <SwiperSlide key={index} className="relative">
                  { item.isSold && <div className="w-full h-full bg-black/60 absolute z-50 text-white flex justify-center items-center sf-bold text-[35px]">Sold Out</div>}
                    <Lazyloading
                      src={`${PROJECT_SUB_IMAGE_URL}/${i}`}
                      className="w-full rounded-[10px] h-full object-cover"
                      alt={item?.name}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>


{console.log(item?.projectImagesPreview,'item?.projectImagesPreview')}
    
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
                    item.name,
                    `item/${item.name
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
                {/* handover date */}
                <div className="  flex items-center w-[170px]  bg-[#000000] text-[#ffffff]  h-[20px] justify-center gap-3  rounded-[3px] ">
                  <p className="uppercase poppins font-semibold text-[10px]">
                    HandOver Date : {formatDate(item?.handoverDate)}
                  </p>
                </div>

                {/* if post handover is availbe */}
                {item?.postPaymentHandoverPlan && (
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
                    item?.name,
                    `property/${item?.name
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

            {/* bedrooms and property types */}
            <div className="text-[#545454]  font-normal text-xs  flex justify-between items-center">
              <div className="capitalize flex gap-0.5">{result}</div>
              <div className="flex gap-2 justify-end w-full overflow-hidden max-w-[80px] items-center">
                <FaBed color="#545454" size={18} />
                <span className="font-normal text-[10px]">{item?.bedrooms}</span>
              </div>
            </div>

            {/* project name */}
            <div className=" poppins-semibold text-[#000000] text-xl mt-3">
              <h1
                className="capitalize overflow-hidden w-full whitespace-nowrap"
                style={{ textOverflow: "ellipsis" }}
              >
                {item?.name}
              </h1>
            </div>

            {/* price starting from (AED) price tag */}
            <div className="poppins-semibold text-[#000000] text-base mt-3">
              <h1 
                className="font-medium overflow-hidden w-full whitespace-nowrap"
                style={{ textOverflow: "ellipsis" }}
              >
                Starting from{" "}
                <span className="font-bold text-xl">{item?.priceInAED}</span>
              </h1>
            </div>

            {/* Address */}
            <div className="flex justify-start items-center gap-1 mt-3">
              <IoLocationSharp  size={19} className="-ms-1 ps-0" color="#545454" />
              <p
               style={{ textOverflow: "ellipsis" }} 
              className=" overflow-hidden w-full whitespace-nowrap font-normal poppins text-xs text-[#545454]">
                {item?.address}
              </p>
            </div>


            {/* developer name */}
            <div className="flex items-center gap-1 mt-3">
              <FaBuilding color="#545454" size={15} />
              <p className="font-semibold capitalize text-[10px] poppins">
                {item?.developerName ? item?.developerName : item?.developerInfo ? item.developerInfo?.name : 'Not Available' }
              </p>
            </div>
    
            { normal && <div className="mt-5 h-[33px]  mb-2.5 flex gap-2">
              <div className="bg-slate-50 flex-1"></div>
              <div className="bg-slate-50 flex-1"></div>
            </div>}

            {
              modify &&  <div className="mt-5 mb-2.5 flex gap-2">
              <button
                   onClick={() =>
                    navigate(`/admin/edit-project/${item._id}`, { state: item })
                  }
                className="flex-1 border border-[#000000] py-2 rounded font-semibold text-[10px] bg-white text-[#000000]"
              >
                Edit
              </button>
              <button
                className="flex-1 py-2 rounded font-semibold text-[10px] bg-[#000000] text-[#ffffff]"
            onClick={()=>handleDelete(item)}
              >
                Delete
              </button>
            </div>
            }




{
              user &&  <div className="mt-5 mb-2.5 flex gap-2">
              <button
             
                className="flex-1 opacity-40 border border-[#000000] py-2 rounded font-semibold text-[10px] bg-white text-[#000000]"
              >
                Details
              </button>
              <button
                className="flex-1  opacity-40 py-2 rounded font-semibold text-[10px] bg-[#000000] text-[#ffffff]"
              >
                Enquire now
              </button>
            </div>
            }
          </div>
        </div>
      );
}

export default PropertyListingCard
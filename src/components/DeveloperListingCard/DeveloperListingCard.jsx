import React from 'react'
import Lazyloading from '../Lazyloading/Lazyloading'
import { CITY_IMAG_URL, DEVELOPER_IMAG_URL, MAIN_IMAG_URL } from '../../api'
import Placeholder from "../../assets/placeholder/placeholder-image.png"

function DeveloperListingCard({values,preview}) {
  return (
    <div
    // onClick={() =>
    //   navigate(
    //     `/developers/${item._id}/${item.developerName}`
    //   )
    // }
    className="cursor-pointer overflow-hidden relative p-5 lg:h-[252px] sm:w-[180px] h-[172px]  lg:w-[264px] rounded-[15px] flex justify-center items-center border"
  >
                        {values?.priority && <div className="w-8 h-8 rounded-full absolute top-2 z-40 right-3 bg-black text-white text-sm flex items-center justify-center">{values?.priority}</div>}

    {/* <Lazyloading
      src={`${MAIN_IMAG_URL}/${item?.mainImgaeLink}`}
      alt={item?.developerName}
      className={"my-10  object-contain max-h-[120px]"}
    /> */}
      {
                    <img
                        src={values?.preview ? values?.preview : preview ? preview : values.imageLink ? `${DEVELOPER_IMAG_URL}/${values?.imageLink}` : Placeholder}
                        alt="Preview"
      className={"my-10 object-contain max-h-[120px]"}
                    />}

  </div>
  )
}

export default DeveloperListingCard
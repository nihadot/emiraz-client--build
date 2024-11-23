import React from 'react'
import { CITY_IMAG_URL, MAIN_IMAG_URL } from '../../api'

function Preview({preview,values}) {
  return (
    <div
    className="cursor-pointer max-w-[213px] w-full h-[257px]  border rounded-[10px]"
  >
    <div className="relative rounded-[10px] overflow-hidden  h-[200px]">

      {/* Preview image */}
      {preview && values?.preview && (
                        <img
                            src={values?.preview}
                            alt="Preview"
                            className='w-full h-full object-cover'
                        />
                    )}

                    {/* Main image when no preview is available */}
                    {!preview && values?.imageLink && (
                        <img
                            src={`${CITY_IMAG_URL}/${values?.imageLink}`}
                            alt="Main Image"
                            className='w-full h-full object-cover'
                        />
                    )}

                    {/* Placeholder if neither preview nor main image is available */}
                    {((!values?.imageLink && !values?.preview)) && (
                        <div className="w-full h-full object-cover"></div>
                    )}
      <div className="bg-gradient-to-b from-black to-black absolute top-0 w-full h-full opacity-20 z-20"></div>
      <div className="px-3 py-3 absolute top-0 w-full h-full z-30">
        <span className="block capitalize text-white w-fit bg-[#666666] text-[10px] rounded-[40px] px-3 py-2">
          {values?.emirateName}
        </span>
        <p className="poppins-semibold capitalize text-[24px] text-white ">
          {values?.name}
        </p>
      </div>
    </div>
    <p className="py-4 capitalize px-6 text-[15px] poppins-medium">
      {0 === 0
        ? "Not available"
        : 0 === 1
        ? `0 Project available`
        : `0 Projects available`}
    </p>
  </div>
  )
}

export default Preview
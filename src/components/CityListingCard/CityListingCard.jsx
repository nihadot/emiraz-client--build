import React from 'react'
import { CITY_IMAG_URL } from '../../api'
import Placeholder from "../../assets/placeholder/placeholder-image.png"

function CityListingCard({ values,preview }) {

    return (
        <div className="cursor-pointer max-w-[213px] w-full h-[257px] relative  border rounded-[10px]" >
                        {values?.priority && <div className="w-8 h-8 rounded-full absolute top-2 z-40 right-3 bg-black text-white text-sm flex items-center justify-center">{values?.priority}</div>}

            <div className="relative rounded-[10px] overflow-hidden  h-[200px]">

                {
                    <img
                        src={values?.preview ? values?.preview : preview ? preview : values.imageLink ? `${CITY_IMAG_URL}/${values?.imageLink}` : Placeholder}
                        alt="Preview"
                        className='w-full h-full object-cover'
                    />}


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
                { values?.count ? values?.count === 0 ? "Not available" : values?.count === 1 ? `${values?.count} Project available` : `${values?.count} Projects available` : "Not available"}
               
            </p>
        </div>
    )
}

export default CityListingCard
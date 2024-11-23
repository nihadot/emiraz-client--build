import React from 'react';
import { MAIN_IMAG_URL } from '../../api';

function Preview({ values, preview = false }) {

    if (values) {
        return (
            <div className="w-full cursor-pointer border h-[285px] border-[#D2D2D2] flex justify-center items-center max-w-[284px] p-4 rounded-[15px]">
                <div className="poppins-medium w-full">
                    {/* Preview image */}
                    {preview && values?.preview && (
                        <img
                            src={values.preview}
                            alt="Preview"
                            className='md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]'
                        />
                    )}

                    {/* Main image when no preview is available */}
                    {!preview && values?.imageLink && (
                        <img
                            src={`${MAIN_IMAG_URL}/${values.imageLink}`}
                            alt="Main Image"
                            className='md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px]'
                        />
                    )}

                    {/* Placeholder if neither preview nor main image is available */}
                    {((!values?.imageLink && !values.preview)) && (
                        <div className="md:w-[250px] w-full object-cover h-[182px] rounded-t-[10px] bg-slate-50 animate-pulse"></div>
                    )}

                    {/* Property name */}
                    {values.name ? (
                        <h1 className="mt-2 text-[25px] capitalize line-clamp-1">{values.name}</h1>
                    ) : (
                        <h1 className='bg-slate-50 h-6 animate-pulse mt-2'></h1>
                    )}

                    {/* Projects available count */}
                    <p className="mt-0 text-[15px] text-[#666666]">
                        <span className="me-1">{4}</span>
                        {4 === 0
                            ? 'Not available'
                            : 4 === 1
                            ? 'Project Available'
                            : 'Projects Available'}
                    </p>
                </div>
            </div>
        );
    }



    return null;
}

export default Preview;

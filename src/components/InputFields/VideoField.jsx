import React from 'react'

function VideoField({
    label = "Label",
    disabled = false,
    value = "",
    name = "",
    onChange = () => {},
    type = "text",
    id = name,
    placeholder = "",
    classNameInput = "",
    classNameLabel = "",
    required = false,
    min = "",  // For date input validation
    error = null,  // Track validation error state
    touched = false, // Track if the field has been touched
    inputClassName="",
}) {
  return (

    <div className="">

   
    <div className=" flex flex-col gap-2">
          <label
            className={`sf-medium font-medium text-sm text-[#000000] ${classNameLabel}`}
            >
                 {label} {required ? <span className="text-red-500 text-lg">*</span> :  <span className='text-black/45 text-xs'>(option)</span> }

          </label>
          <input
            value={value}
            name={name}
            onChange={onChange}
            type={type}
            id={id}
            placeholder={placeholder}
            className={`border ${inputClassName} border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none`}
            />
            </div>


            <iframe
          src={value}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          className="mt-4 w-full h-[300px]"
        ></iframe>
        </div>
  )
}

export default VideoField
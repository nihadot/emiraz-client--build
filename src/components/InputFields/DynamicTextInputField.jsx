import React, { useEffect, useState } from 'react'
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

function DynamicTextInputField({
    label = "Label",
    disabled = false,
    labelClassName = "",
    name = "",
    onChange = () => { },
    type = "text",
    id = name,
    placeholder = "",
    required = false,
    dynamicContainerClassName,
    dynamicInputClassName,
    value = [],
    clearAllFields = () => { },
    values = [],
    clearFormField
}) {


    const [DynamicInputField, setDynamicInputField] = useState([]);


    const handleDynamicForm = (e, index) => {
        const DynamicInputFieldArray = [...DynamicInputField];
        DynamicInputFieldArray[index] = e.target.value;
        setDynamicInputField(DynamicInputFieldArray);
        onChange(DynamicInputFieldArray)
    };

    const handleAddMoreField = () => {
        setDynamicInputField([...DynamicInputField, '']);
    }


    useEffect(()=>{
        setDynamicInputField(values)
    },[])



    useEffect(()=>{
        if(clearFormField){
            setDynamicInputField([])
            onChange([])
        }
    },[clearFormField])

    const handleRemoveField = (index) => {
        const result = DynamicInputField.filter((item, i) => i !== index);
        setDynamicInputField(result);
        onChange(result);
    }

    return (
        <div className="flex max-h-[400px] h-fit overflow-y-auto flex-col gap-2 relative">
            <label
                htmlFor="FacilitiesAndAmenities"
                className={`${labelClassName} sf-medium font-medium text-sm text-[#000000]`}
            >
                {label} {required ? <span className="text-red-500 text-lg">*</span> : <span className='text-black/45 text-xs'>(option)</span>}

            </label>
            {DynamicInputField.map((item, index) => {
                return (
                    <div
                        className={`w-full flex justify-center items-center gap-2 ${dynamicContainerClassName}`}
                        key={index}
                    >
                        <input
                            value={item}
                            name={name}
                            onChange={(e) => handleDynamicForm(e, index)}
                            type={type}
                            id={id}
                            placeholder={`${placeholder} ${index + 1}`}
                            className={` ${dynamicInputClassName} border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none`}
                        />
                        <span
                            onClick={() =>
                                handleRemoveField(index)
                            }
                            className="text-white p-3 rounded-full hover:bg-slate-600 cursor-pointer bg-black text-lg block"
                        >
                            <IoMdRemove />
                        </span>
                    </div>
                );
            })}
            <div
                onClick={handleAddMoreField}
                className="flex cursor-pointer justify-center items-center border w-full border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
            >
                <span className="text-black text-lg ">
                    <IoMdAdd />
                </span>
            </div>
        </div>
    )
}

export default DynamicTextInputField
import React from 'react';
import { errorCloseRedIcon, greenTickIcon } from '../../assets/icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordInputField({
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

  const[visible,setVisible] = React.useState('password')



  return (
    <div className="flex mt-0 relative flex-col gap-2 w-full">
      <label
        htmlFor={id}
        className={`sf-medium w-full font-medium text-sm text-[#000000] ${classNameLabel}`}
      >
        {label} {required ? <span className="text-red-500 text-lg">*</span> :  <span className='text-black/45 text-xs'>(option)</span> }
      </label>

      <div className="w-full flex items-center relative">
        <input
          disabled={disabled}
          value={value}
          name={name}
          onChange={onChange}
          type={visible}
          id={id}
          min={min}
          placeholder={placeholder}
          className={`border w-full ${inputClassName} py-4 px-5 rounded-[10px] sf-normal text-sm text-[#666666] outline-none 
            ${!touched ? 'border-[#D9D9D9]' : error ? 'border-[#f4050579]' : 'border-[#46a246]'}
          `}
        />

<div className={`absolute top-4 ${touched ? 'right-16' : 'right-7' } `}>
            {
                visible === 'password' ? <FaEye title='Show' size={20} onClick={()=>setVisible('text')} /> : <FaEyeSlash title='hide' size={20} onClick={()=> setVisible('password')}/>
            }
        </div>
        
        <label htmlFor={id} className={`absolute right-3`}>
          {/* Display success or error icon */}
          {touched && !error ? (
            <img src={greenTickIcon} className='w-6 h-6 object-contain me-3' alt="Success" />
          ) : (
          touched && error && <img src={errorCloseRedIcon} className='w-10 h-6 object-cover ' alt="Error" />
          )}
        </label>
      </div>
    </div>
  );
}

export default PasswordInputField;

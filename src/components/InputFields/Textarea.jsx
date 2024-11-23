import React from 'react';
import { errorCloseRedIcon, greenTickIcon } from '../../assets/icons';

function Textarea({
  label,
  required,
  textareaClassName,
  disabled,
  cols = 30,
  rows = 6,
  name,
  id = name,
  placeholder,
  labelClassName,
  onChange,
  value,
  error,
  touched
}) {
  return (
    <div className='flex justify-center items-center'>
      <div className={`flex flex-col gap-2 w-full ${labelClassName}`}>
        <label
          htmlFor={id}
          className='sf-medium font-medium text-sm text-[#000000]'
        >
          {label}{' '}
          {required ? (
            <span className='text-red-500 text-lg'>*</span>
          ) : (
            <span className='text-black/45 text-xs'>(option)</span>
          )}
        </label>
        <div className="w-full flex items-center relative">

        <textarea
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
          id={id}
          cols={cols}
          rows={rows}
          className={` ${textareaClassName} w-full border py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666] ${!touched ? 'border-[#D9D9D9]' : error ? 'border-[#f4050579]' : 'border-[#46a246]'} outline-none`}
        ></textarea>

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
    </div>
  );
}

export default Textarea;

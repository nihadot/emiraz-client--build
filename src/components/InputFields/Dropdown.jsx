import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { errorCloseRedIcon, greenTickIcon } from '../../assets/icons';

function Dropdown({
  label = 'Label',
  disabled = false,
  value = '',
  name = '',
  onChange = () => {},
  type = 'text',
  id = name,
  placeholder = '',
  classNameInput = '',
  classNameLabel = '',
  required = false,
  min = '', // For date input validation
  error = null, // Track validation error state
  touched = false, // Track if the field has been touched
  inputClassName = '',
  labelClassName,
  options,
  existValue,
  clearFormField,
}) {
  const [toggleButton, setToggleButton] = useState(false);
  const [userObject, setUserObject] = useState({});
  const handleToggleButton = () => setToggleButton(!toggleButton);

  const handleUserClick = item => {
    onChange(item._id);
    setUserObject(item);
    handleToggleButton();
  };

  useEffect(()=>{
    if(clearFormField){
      setUserObject({});
      onChange('');
    }
  },[clearFormField])


  useEffect(()=>{
    if(existValue){
      setUserObject(existValue);
    }
  },[existValue])


  return (
    <div
      className={`flex ${
        disabled && 'select-none'
      } mt-3 flex-col gap-2 relative`}
    >
      <label
        htmlFor={id}
        className={`${labelClassName} sf-medium capitalize font-medium text-sm text-[#000000]`}
      >
        {label} {required ? <span className="text-red-500 text-lg">*</span> :  <span className='text-black/45 text-xs'>(option)</span> }
      </label>
      <div
        id={id}
        onClick={handleToggleButton}
        className={`flex cursor-pointer border w-full
         ${!touched ? 'border-[#D9D9D9]' : error ? 'border-[#f4050579]' : 'border-[#46a246]'}
         py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none`}
      >
        <span className='capitalize'>
          {userObject?.name ? userObject.name : placeholder}
        </span>
        <span className='absolute right-5 top-11'>
          {toggleButton ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}
        </span>
      </div>
      {toggleButton && (
        <div className='z-20 absolute capitalize max-h-[300px] h-fit  overflow-auto rounded-[10px] top-24 bg-white w-full border p-3'>
          {options.length > 0 &&
            options.map(item => (
              <p
                key={item._id}
                onClick={() => handleUserClick(item)}
                className='py-1 block cursor-pointer'
              >
                {item.name}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

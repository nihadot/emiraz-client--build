import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

/**
 * PriorityDropDown Component
 * Renders a dropdown for selecting priority values, excluding already used values.
 * @param {Object} props - Props passed to the component
 */
function PriorityDropDown({
    label = 'Label',
    disabled = false,
    name = '',
    onChange = () => {},
    id = name,
    placeholder = '',
    labelClassName,
    options,
    existValues,
    defaultValue = 'None',
    currentValue,
    clearFormField

  }) {

    console.log(options,'options')
    console.log(defaultValue,'default')
    console.log(existValues,'existValues')
    const [toggleButton, setToggleButton] = useState(false);
    const [userObject, setUserObject] = useState({});
  
    const handleToggleButton = () => setToggleButton(!toggleButton);
  
    const handleUserClick = (item) => {
        if(item._id === 0){
            onChange("");
            setUserObject({});
        }else{
            onChange(item._id);
            setUserObject(item);
        }
        handleToggleButton();
    };
  
    useEffect(() => {
      if(clearFormField){
          onChange("");
          setUserObject({});
      }
    }, [clearFormField]);

    useEffect(()=>{
        if(currentValue){
            setUserObject(currentValue)
        }
    },[currentValue])
  
    return (
      <div className={`flex ${disabled && 'select-none'} mt-0 flex-col gap-2 relative`}>
        <label
          htmlFor={id}
          className={`${labelClassName} sf-medium font-medium text-sm text-[#000000]`}
        >
          {label} <span className='text-black/45 text-xs'>(option)</span>
        </label>
        <div
          id={id}
          onClick={handleToggleButton}
          className={`flex cursor-pointer border w-full py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666] outline-none`}
        >
          <span className='capitalize'>
            {userObject?.name ? userObject.name : placeholder}
          </span>
          <span className='absolute right-5 top-11'>
            {toggleButton ? <FaAngleUp size={24} /> : <FaAngleDown size={24} />}
          </span>
        </div>
        {toggleButton && (
          <div className='z-20 absolute max-h-[300px] h-fit overflow-auto rounded-[10px] top-24 bg-white w-full border'>
             <p
                    onClick={() => handleUserClick({name:'none',_id:0})}
                    className={`py-2 px-3 cursor-pointer`}
                  >
                    {defaultValue}
                  </p>
            {options.length > 0 &&
              options.map((item) => {
                const isSelected = existValues?.includes(item._id);
                return (
                  <p
                    key={item._id}
                    onClick={() => !isSelected && handleUserClick(item)}
                    className={`py-2 px-3 ${isSelected ? 'text-red-500 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {item.name} {isSelected && <span className='ps-1'>Not available</span>}
                  </p>
                );
              })}
                 
          </div>
        )}
      </div>
    );
  }
export default PriorityDropDown;
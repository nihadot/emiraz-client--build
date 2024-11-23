import React from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

function ChooseOption({
  options = [],
  defaultValue = "Choose Option",
  userSelectedValue = {},
  defaultValueLabel = "None",
}) {


  const [toggleVisible, setToggleVisible] = React.useState(false);

  const handleToggleVisibility = () => setToggleVisible(!toggleVisible);
  const [userSelectedItem, setUserSelectedItem] = React.useState(null);
  const handleSelectOption = (item)  =>{
    handleToggleVisibility();
    setUserSelectedItem(item);
    userSelectedValue(item);
  }

  return (
    <div
    onClick={handleToggleVisibility}
    className=' relative cursor-pointer flex max-w-[220px] w-full h-[53px] max-h-[53px] justify-between px-10 items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]'
  >
    <span className=' text-black font-extralight text-sm sf-normal capitalize w-full'>
      {userSelectedItem ? userSelectedItem?.name: defaultValue}
    </span>
    {toggleVisible ? <FaAngleUp /> : <FaAngleDown />}

    {toggleVisible && (
      <div className='bg-white text-start poppins-medium text-[14px] px-2 absolute z-50 right-0 top-16 border py-3 rounded-[10px] border-[#E4E4E4] w-full max-h-80 h-fit overflow-y-auto ps-4'>
        <div
          className='py-2 capitalize cursor-pointer'
          onClick={()=>handleSelectOption({name:"none"})}
        >
          {defaultValueLabel}
        </div>

        {options &&
          options?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleSelectOption(item)}
                className='py-2 z-[3000] capitalize cursor-pointer'
              >
                {item.name}
              </div>
            );
          })}
      </div>
    )}
  </div>

  )
}

export default ChooseOption
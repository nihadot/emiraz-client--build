import { ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const AdsDropdown = ({ 
  isLoading, 
  name, 
  value, 
  onChange, 
  clearForms, 
  options, 
  includeAll = true, // Include "All" option
  includeNone = true // Include "None" option
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || "");

  const handleOptionClick = (option) => {
    if (option.name === "none") {
      setSelectedOption('');
      onChange(name,''); // Clear Formik value
    }else {
      setSelectedOption({name:option.name,_id:option._id});
      onChange(name, {name:option.name,_id:option._id});
    }
    setIsOpen(false); // Close dropdown
  };

  // Sync with external Formik value
  React.useEffect(() => {
    setSelectedOption(value || "");
  }, [value]);

  // Clear selection when `clearForms` changes
  React.useEffect(() => {
    setSelectedOption("");
    onChange(name, "");
  }, [clearForms]);

  return (
    <div className="flex mt-6 mb-6 flex-col gap-2">
      <label htmlFor={name} className="sf-medium font-medium text-sm text-[#000000]">
        Select an Ads
      </label>

      {/* Dropdown */}
      <div
        className={`capitalize border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ${
          isOpen ? "ring-2 ring-black" : ""
        } transition-all duration-300 ease-in-out`}
        onClick={() => !isLoading && setIsOpen((prev) => !prev)}
      >
        {/* {console.log(selectedOption.name === 'none')} */}
        
        {selectedOption.name || 'Select an Options' }
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-[#E4E4E4] rounded-[10px] bg-white mt-2 max-h-40 overflow-y-auto shadow-md"
          >
        
              <div
                onClick={() => handleOptionClick({name:'none'})}
                className={`py-3 px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer`}
              >
                None
              </div>
            
            {/* Render options dynamically */}
            {options?.map((option) => {
  return (
    <div
      key={option._id}
      onClick={() => {
        if (!option.property) {
          handleOptionClick(option);
        }
      }}
      className={`capitalize py-3 px-5 text-sm text-[#333333] 
        ${option.taken ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-black hover:text-white cursor-pointer'} 
        transition-all duration-300`}
    >
      {option.name}
      {option.property && <span className="ml-2 text-red-500">(Already Taken)</span>}
    </div>
  );
})}

            {/* "None" option */}
          
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2" />
    </div>
  );
};

export default AdsDropdown;

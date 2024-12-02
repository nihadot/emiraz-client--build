import { ErrorMessage, Field } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const PropertyTypeDropdown = ({ isLoading, name, value, onChange, clearForms }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(value || []); // Store multiple selected options

  const options = ["villa", "apartment", "penthouse", "townhouse"];

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      // Remove option if already selected
      setSelectedOptions((prev) => prev.filter((item) => item !== option));
    } else {
      // Add option if not selected
      setSelectedOptions((prev) => [...prev, option]);
    }
  };

  // Update Formik's value when the selection changes
  useEffect(() => {
    onChange(name, selectedOptions);
  }, [selectedOptions, onChange, name]);

  // Reset selected options when clearForms changes
  useEffect(() => {
    if (clearForms) {
      setSelectedOptions([]); // Clear selected options
      onChange(name, []); // Update Formik to reflect the cleared value
    }
  }, [clearForms, onChange, name]);

  return (
    <div className="flex mt-3 flex-col gap-2">
      <label
        htmlFor={name}
        className="sf-medium font-medium text-sm text-[#000000]"
      >
        Property Type <span className="text-lg text-red-600">*</span>
      </label>
      {/* Dropdown Box */}
      <div
        className={`border capitalize border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666] cursor-pointer outline-none relative ${isOpen ? "ring-2 ring-[#0d6efd]" : ""
          } transition-all duration-300`}
        onClick={() => !isLoading && setIsOpen((prev) => !prev)}
      >
        {selectedOptions.length > 0
          ? selectedOptions.map(
              (opt, index) => (index > 0 ? ", " : "") + opt.charAt(0).toUpperCase() + opt.slice(1)
            )
          : "Select Property Types"}
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      {/* Animated Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-[#E4E4E4] rounded-[10px] bg-white mt-2 max-h-40 overflow-y-auto shadow-lg"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`py-3 px-5 hover:bg-black hover:text-white text-sm text-[#666666] transition-all duration-300 cursor-pointer ${
                  selectedOptions.includes(option) ? "bg-black text-white font-medium" : ""
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hidden Field for Formik */}
      <Field
        type="hidden"
        name={name}
        value={selectedOptions.join(",")}
        className="hidden"
      />
     
    </div>
  );
};

export default PropertyTypeDropdown;

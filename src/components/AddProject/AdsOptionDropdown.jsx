import { ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const AdsOptionDropdown = ({ isLoading, name, value, onChange, clearForms, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAdOption, setSelectedAdOption] = useState(value || "");

  const handleAdOptionClick = (adOption) => {
    if (adOption === "none") {
      onChange(name, ""); // Reset value in Formik
      setSelectedAdOption(""); // Clear selected option
      setIsOpen(false); // Close dropdown
      return;
    }

    setSelectedAdOption(adOption.adOptionName); // Set selected option
    setIsOpen(false); // Close dropdown
  };

  // Update Formik value when `selectedAdOption` changes
  React.useEffect(() => {
    onChange(name, selectedAdOption);
  }, [selectedAdOption, onChange, name]);

  // Reset dropdown when `clearForms` is triggered
  React.useEffect(() => {
    onChange(name, "");
    setSelectedAdOption("");
  }, [clearForms, onChange, name]);

  return (
    <div className="flex mt-6 mb-6 flex-col gap-2">
      <label htmlFor={name} className="sf-medium font-medium text-sm text-[#000000]">
        Select Ads Option
      </label>

      {/* Dropdown Box */}
      <div
        className={`border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ${
          isOpen ? "ring-2 ring-black" : ""
        } transition-all duration-300 ease-in-out`}
        onClick={() => !isLoading && setIsOpen((prev) => !prev)}
      >
        {selectedAdOption || "Select an Ads Option"}
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
            className="border border-[#E4E4E4] rounded-[10px] bg-white mt-2 max-h-40 overflow-y-auto shadow-md"
          >
            {/* "None" Option */}
            <div
              onClick={() => handleAdOptionClick("none")}
              className="py-3 px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              None
            </div>

            {/* Dynamic Options */}
            {options?.map((adOption) => (
              <div
                key={adOption._id}
                onClick={() => handleAdOptionClick(adOption)}
                className={`py-3 px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer ${
                  selectedAdOption === adOption.adOptionName ? "bg-black text-white" : ""
                }`}
              >
                {adOption.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2" />
    </div>
  );
};

export default AdsOptionDropdown;

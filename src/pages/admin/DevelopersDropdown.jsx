import { ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const DevelopersDropdown = ({
  isLoading,
  name,
  value,
  onChange,
  options,
  mt6,
  existingData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState([]);

  // Filter options to exclude `existingData` developer
  useEffect(() => {
    if (options) {
      const updatedOptions = existingData
        ? options.filter((developer) => developer._id !== existingData._id)
        : options; // Exclude `existingData` only if provided
      setFilteredOptions(updatedOptions);
    }
  }, [options, existingData]);

  // console.log(existingData,'exisitng data')
  // console.log(options,'options data')
  // Sync the `value` with selected developer
  useEffect(() => {
    setSelectedDeveloper(value || null);
  }, [value]);

  const handleDeveloperClick = (developer) => {
    setSelectedDeveloper({ developerName: developer.developerName, id: developer._id });
    setIsOpen(false); // Close dropdown
    onChange(name, { developerName: developer.developerName, id: developer._id }); // Update Formik state
  };

  return (
    <div className={`flex mt-6 flex-col gap-2 ${mt6 ? "mt-4" : "mb-6"}`}>
      <label htmlFor={name} className="sf-medium font-medium text-sm text-[#000000]">
        Select Developer <span className="text-lg text-red-600">*</span>
      </label>

      {/* Dropdown Box */}
      <div
        className={`border relative border-[#E4E4E4] py-4 px-5 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer bg-white ${
          isOpen ? "ring-2 ring-black" : ""
        }`}
        onClick={() => !isLoading && setIsOpen((prev) => !prev)}
      >
        {selectedDeveloper ? selectedDeveloper.developerName : "Select a Developer"}
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Animated Options */}
      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-[#E4E4E4] rounded-[10px] bg-white mt-2 max-h-40 overflow-y-auto shadow-md"
          >
            {filteredOptions.map((developer) => (
              <div
                key={developer._id}
                onClick={() => handleDeveloperClick(developer)}
                className={`py-3 px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer ${
                  selectedDeveloper?.id === developer._id ? "bg-black text-white" : ""
                }`}
              >
                {developer.developerName}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default DevelopersDropdown;

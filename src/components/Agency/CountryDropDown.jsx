import { ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CountryDropDown = ({
  isLoading,
  name,
  value,
  onChange,
  options,
  mt6,
  clearForms
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);


console.log(value,'value')

  const handleCountryClick = (country) => {
    // console.log(country,'000')
    setSelectedCountry({ countryName: country.countryName, id: country._id }); // Update local state
    setIsOpen(false); // Close dropdown
    onChange({ countryName: country.countryName, id: country._id }); // Update Formik state
  };

  useEffect(() => {
    setSelectedCountry(value); // Sync value with Formik
  }, [value]);

  useEffect(()=>{
    onChange("");
    setIsOpen(false); // Close dropdown when value is cleared
    setSelectedCountry(null);
  },[clearForms])

  return (
    <div className={`flex mx-3 mt-6  flex-col ${mt6 ? 'mt-4' : 'mb-6'}`}>
      <label htmlFor={name} className="sf-medium mb-3 font-medium text-sm text-[#000000]">
        Select Country <span className="text-lg text-red-600">*</span>
      </label>

      {/* Dropdown Box */}
      <div
        className={`border relative capitalize border-[#E4E4E4] py-4 px-5 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer bg-white ${
          isOpen ? "ring-2 ring-black" : ""
        }`}
        onClick={() => !isLoading && setIsOpen((prev) => !prev)}
      >
        {selectedCountry ? selectedCountry.countryName : "Select Country"}
        <span className="absolute right-4 capitalize top-1/2 transform -translate-y-1/2">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Animated Options */}
      <AnimatePresence>
        {isOpen && options?.length >0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-[#E4E4E4] rounded-[10px] bg-white mt-2 max-h-40 overflow-y-auto shadow-md"
          >
            { options.map((country) => (
              <div
                key={country._id}
                onClick={() => handleCountryClick(country)}
                className={`py-3 px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer ${
                  selectedCountry?.id === country._id
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {country.countryName}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
    </div>
  );
};

export default CountryDropDown;

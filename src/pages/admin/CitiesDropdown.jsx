import { ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CitiesDropdown = ({ isLoading, name, value, onChange, options, clearForms, existingData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState(value || []);
  const [cities, setCities] = useState([]);
  const availableCities = options?.filter(
    (city) => !selectedCities.some((selectedCity) => selectedCity._id === city._id)
  );

  useEffect(() => {
    if (existingData && Array.isArray(existingData)) {
      // Filter out cities already in existingData from options
      const filteredOptions = options?.filter(
        (city) => !existingData.some((existingCity) => existingCity._id === city._id)
      );
      setCities(filteredOptions);
    } else {
      console.warn("No existing data provided or it is not an array.");
    }
  }, [existingData, options]);

  const handleCityClick = (city) => {
    setSelectedCities((prevSelectedCities) => {
      const updatedCities = [
        ...prevSelectedCities.filter((selectedCity) => selectedCity._id !== city._id),
        { cityName: city.cityName, _id: city._id },
      ];
      return updatedCities;
    });
    setIsOpen(false);
  };

  const handleRemoveCity = (city) => {
    setSelectedCities((prevSelectedCities) =>
      prevSelectedCities.filter((selectedCity) => selectedCity._id !== city._id)
    );
  };

  // Clear selected cities when `clearForms` changes
  useEffect(() => {
    if (clearForms) {
      clearSelectedCities();
    }
  }, [clearForms]);

  const clearSelectedCities = () => {
    setSelectedCities([]);
    onChange(name, []); // Reset Formik's value
  };

  // Update Formik value on selection or removal
  useEffect(() => {
    onChange(name, selectedCities);
  }, [selectedCities, onChange, name]);

  return (
    <div className="flex mt-3 flex-col gap-2">
      <label htmlFor={name} className="sf-medium font-medium text-sm text-[#000000]">
        Select Cities <span className="text-lg text-red-600">*</span>
      </label>

      <div
        className={`border capitalize sf-medium border-[#E4E4E4] py-4 px-5 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ${
          isOpen ? "ring-2 ring-black" : ""
        } transition-all duration-300 ease-in-out`}
        onClick={() => !isLoading && setIsOpen((prev) => !prev)}
      >
        {selectedCities.length === 0
          ? "Select Cities"
          : selectedCities.map((city) => city.cityName).join(", ")}
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-[#E4E4E4] rounded-[10px] bg-white mt-2 max-h-40 overflow-y-auto shadow-md"
          >
            {availableCities.map((city) => (
              <div
                key={city._id}
                onClick={() => handleCityClick(city)}
                className="py-3 capitalize px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
              >
                {city.cityName}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedCities.length > 0 && (
        <div className="mt-2">
          <span className="font-medium text-sm text-[#333333]">Selected Cities:</span>
          <div className="flex gap-2 mt-1 flex-wrap py-2">
            {selectedCities.map((city, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-800 py-4 capitalize px-3 rounded-lg flex items-center text-xs font-medium transition-all duration-200 hover:bg-gray-300 cursor-pointer"
              >
                {city.cityName}
                <button
                  type="button"
                  onClick={() => handleRemoveCity(city)}
                  className="ml-2 text-red-500 text-xs hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default CitiesDropdown;

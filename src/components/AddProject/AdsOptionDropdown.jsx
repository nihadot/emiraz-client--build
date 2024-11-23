import { ErrorMessage } from "formik";
import { AnimatePresence ,motion} from "framer-motion";
import React, { useState } from "react";

const AdsOptionDropdown = ({ isLoading, name, value, onChange,clearForms }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAdOption, setSelectedAdOption] = useState(value || "");
  
    // Dummy data for ads options
    const adsOptionsList = [
      { adOptionName: "Banner Ad", _id: "1" },
      { adOptionName: "Sidebar Ad", _id: "2" },
      { adOptionName: "Pop-up Ad", _id: "3" },
      { adOptionName: "Interstitial Ad", _id: "4" },
      { adOptionName: "Video Ad", _id: "5" },
    ];
  
    const handleAdOptionClick = (adOption) => {
      setSelectedAdOption(adOption.adOptionName);
      setIsOpen(false);
    };
  
    // Updating the Formik value when an ad option is selected
    React.useEffect(() => {
      onChange(name, selectedAdOption);
    }, [selectedAdOption, onChange, name]);


    React.useEffect(() => {
      onChange(name, '');
      setSelectedAdOption("");

    }, [clearForms]);
  
    return (
      <div className="flex mt-6 flex-col gap-2">
        <label htmlFor={name} className="sf-medium font-medium text-sm text-[#000000]">
          Select Ads Option 
        </label>
  
        {/* Dropdown Box */}
        <div
          className={`border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ${isOpen ? "ring-2 ring-black" : ""
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
              {adsOptionsList.map((adOption) => (
                <div
                  key={adOption._id}
                  onClick={() => handleAdOptionClick(adOption)}
                  className={`py-3 px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer ${selectedAdOption === adOption.adOptionName
                      ? "bg-black text-white"
                      : ""
                    }`}
                >
                  {adOption.adOptionName}
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
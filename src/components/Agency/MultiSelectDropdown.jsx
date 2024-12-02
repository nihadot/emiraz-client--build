import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MultiSelectDropdown = ({ data, onSelectionChange, mt6,refresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);


  // Toggle selection of an item
  const toggleSelection = (item) => {
    const isSelected = selectedItems.some(
      (selected) => selected._id === item._id
    );

    const updatedSelections = isSelected
      ? selectedItems.filter((selected) => selected._id !== item._id) // Remove item if already selected
      : [...selectedItems, item]; // Add item if not selected

    setSelectedItems(updatedSelections);

    if (onSelectionChange) {
      onSelectionChange(updatedSelections); // Notify parent component
    }
  };

  useEffect(()=>{
    setSelectedItems([]);
  },[refresh])

  return (
    <div className={`flex mx-3 mt-6 flex-col ${mt6 ? "mt-4" : "mb-6"}`}>
      <label
        htmlFor="multi-select"
        className="sf-medium mb-3 font-medium text-sm text-[#000000]"
      >
        Select Languages <span className="text-lg text-red-600">*</span>
      </label>

      {/* Dropdown Toggle */}
      <div
        className={`border relative border-[#E4E4E4] py-4 px-5 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer bg-white ${
          isOpen ? "ring-2 ring-black" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedItems.length > 0
          ? selectedItems.map((item) => item.languageName).join(", ")
          : "Select Languages"}
        <span className="absolute right-4 capitalize top-1/2 transform -translate-y-1/2">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {/* Animated Options */}
      <AnimatePresence>
        {isOpen && data?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border border-[#E4E4E4] rounded-[10px] bg-white mt-2 max-h-40 overflow-y-auto shadow-md"
          >
            {data.map((item) => (
              <div
                key={item._id}
                onClick={() => toggleSelection(item)}
                className={`py-3 px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer ${
                  selectedItems.some((selected) => selected._id === item._id)
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {item.languageName}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiSelectDropdown;

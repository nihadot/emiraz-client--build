import { useState, useEffect } from 'react';
import { ErrorMessage } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';

const PriorityDropdown = ({ name, value, onChange, clearForms, existingPriorities = [], priorities = [],priorityValue,setPriorityValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(value || "");
  const [data, setData] = useState([]);

  // Function to handle when a priority is selected
  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority); // Set selected priority to state
    setIsOpen(false); // Close dropdown after selection
  };

  // Update Formik value when a priority is selected
  useEffect(() => {
    onChange(name, selectedPriority);
  }, [selectedPriority, onChange, name]);

  // Function to clear the form or reset priority
  const handleClearPriority = () => {
    setSelectedPriority(""); // Clear UI state
    onChange(name, ""); // Reset Formik value
  };

  // Filter priorities: Remove already existing priorities from the available ones
  useEffect(() => {
      const prioritiesList = priorities.filter(item => !existingPriorities.includes(item));
      console.log(prioritiesList,'prioritiesList')
      setData(prioritiesList); // Update the data state with filtered priorities
  
  }, [existingPriorities, priorities]);

  // Reset priority when clearForms changes (e.g., after form submission)
  useEffect(() => {
    setSelectedPriority(""); // Clear UI state
    onChange(name, ""); // Reset Formik value
  }, [clearForms, name, onChange]);

  return (
    <div className="flex mt-8 flex-col gap-2">
      <label htmlFor={name} className="sf-medium font-medium text-sm text-[#000000]">
        Select Priority
      </label>

      {/* Dropdown Box */}
      <div
        className={`border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-normal text-sm text-[#333333] cursor-pointer outline-none relative bg-white ${isOpen ? "ring-2 ring-black" : ""} transition-all duration-300 ease-in-out`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedPriority ? `Priority ${selectedPriority}` : "Select a Priority"}
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
            {data.length > 0 && data.map((priority) => (
              <div
                key={priority}
                onClick={() => handlePriorityClick(priority)} // Handle priority selection
                className={`py-3 px-5 text-sm text-[#333333] hover:bg-black hover:text-white transition-all duration-300 cursor-pointer ${selectedPriority === priority ? "bg-black text-white" : ""}`}
              >
                Priority {priority}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Button */}
      {selectedPriority && (
        <button
          type="button"
          onClick={handleClearPriority} // Use the handleClearPriority function here
          className="mt-2 text-red-500 hover:text-red-700 transition duration-200"
        >
          ✕ Remove Priority
        </button>
      )}

      {/* Error Message */}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default PriorityDropdown;

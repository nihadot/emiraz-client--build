import { ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

const FacilitiesAndAmenities = ({ name, value, onChange, clear ,existingData}) => {
  const [fields, setFields] = useState(value || [""]);

  const handleAddField = () => {
    setFields([...fields, ""]);
  };

  const handleRemoveField = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleChange = (index, newValue) => {
    const updatedFields = [...fields];
    updatedFields[index] = newValue;
    setFields(updatedFields);
  };

  // Update the Formik value when fields change
  useEffect(() => {
    onChange(name, fields.filter((field) => field.trim() !== "")); // Remove empty fields
  }, [fields, onChange, name]);

  // Clear the fields if the clear prop is triggered
  useEffect(() => {

      setFields([]); // Reset to a single empty field or an empty array
      onChange(name, []); // Notify Formik with an empty array
    
  }, [clear]);


  useEffect(()=>{
   
    setFields(existingData);
  },[existingData])


  // console.log(existingData,'00')
  // console.log(fields,'sss')
  return (
    <div className="flex flex-col gap-4 mb-6">
      <label className="sf-medium font-medium text-sm text-[#000000]">
        Facilities & Amenities
      </label>

      {/* Dynamic Fields */}
      <AnimatePresence>
        {fields.map((field, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder={`Facility ${index + 1}`}
              value={field}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border border-[#E4E4E4] py-4 px-4 rounded-[10px] font-normal text-sm text-[#333333] w-full outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAddField}
        className="bg-[#333333] text-white py-4 px-4 rounded-[10px] font-medium text-sm hover:bg-black transition-all duration-300 self-start"
      >
        + Add Facility
      </button>

      {/* Error Message */}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2" />
    </div>
  );
};

export default FacilitiesAndAmenities;

import { ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const NearbyAreas = ({ name, value, onChange, clearForm }) => {
  const [nearbyAreas, setNearbyAreas] = useState(value || [""]);

  const handleAddArea = () => {
    setNearbyAreas([...nearbyAreas, ""]);
  };

  const handleRemoveArea = (index) => {
    setNearbyAreas((prevAreas) =>
      prevAreas.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, newValue) => {
    const updatedAreas = [...nearbyAreas];
    updatedAreas[index] = newValue;
    setNearbyAreas(updatedAreas);
  };

  // Update Formik value whenever nearby areas change
  useEffect(() => {
    onChange(name, nearbyAreas.filter((area) => area.trim() !== "")); // Remove empty areas
  }, [nearbyAreas, onChange, name]);

  // Reset the form when clearForm is triggered
  useEffect(() => {
      setNearbyAreas([""]); // Reset nearbyAreas to its initial state
      onChange(name, []); // Notify Formik of the cleared state
  }, [clearForm]);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <label className="sf-medium font-medium text-sm text-[#000000]">
        Nearby Areas
      </label>

      {/* Dynamic Nearby Areas Fields */}
      <AnimatePresence>
        {nearbyAreas.map((area, index) => (
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
              placeholder={`Nearby Area ${index + 1}`}
              value={area}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border border-[#E4E4E4] py-4 px-4 rounded-[10px] font-normal text-sm text-[#333333] w-full outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => handleRemoveArea(index)}
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
        onClick={handleAddArea}
        className="bg-[#333333] text-white py-4 px-4 rounded-[10px] font-medium text-sm hover:bg-black transition-all duration-300 self-start"
      >
        + Add Nearby Area
      </button>

      {/* Error Message */}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-2"
      />
    </div>
  );
};

export default NearbyAreas;

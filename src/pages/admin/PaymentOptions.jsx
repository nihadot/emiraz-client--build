import React, { useState, useEffect } from "react";
import { ErrorMessage } from "formik";
import { AnimatePresence, motion } from "framer-motion";

const PaymentOptions = ({ name, value, onChange, clearForm ,existingData}) => {
  const [paymentOptions, setPaymentOptions] = useState(value || [""]);

  const handleAddOption = () => {
    setPaymentOptions([...paymentOptions, ""]);
  };

  const handleRemoveOption = (index) => {
    setPaymentOptions((prevOptions) =>
      prevOptions.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, newValue) => {
    const updatedOptions = [...paymentOptions];
    updatedOptions[index] = newValue;
    setPaymentOptions(updatedOptions);
  };

  // Update Formik value whenever payment options change
  useEffect(() => {
    onChange(name, paymentOptions.filter((option) => option.trim() !== "")); // Remove empty options
  }, [paymentOptions, onChange, name]);

  // clearForm the payment options when clearForm prop changes
  useEffect(() => {
    if (clearForm) {
      setPaymentOptions([""]); // clearForm to a single empty field or initial state
      onChange(name, []); // Notify Formik with an empty array
    }
  }, [clearForm, onChange, name]);


  useEffect(()=>{
   
    setPaymentOptions(existingData);
  },[existingData])

  return (
    <div className="flex flex-col gap-4">
      <label className="sf-medium font-medium text-sm text-[#000000]">
        Payment Options
      </label>

      {/* Dynamic Payment Options Fields */}
      <AnimatePresence>
        {paymentOptions.map((option, index) => (
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
              placeholder={`Payment Option ${index + 1}`}
              value={option}
              onChange={(e) => handleChange(index, e.target.value)}
              className="border border-[#E4E4E4] py-4 px-4 rounded-[10px] font-normal text-sm text-[#333333] w-full outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => handleRemoveOption(index)}
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
        onClick={handleAddOption}
        className="bg-[#333333] text-white py-4 px-4 rounded-[10px] font-medium text-sm hover:bg-black transition-all duration-300 self-start"
      >
        + Add Payment Option
      </button>

      {/* Error Message */}
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-2" />
    </div>
  );
};

export default PaymentOptions;

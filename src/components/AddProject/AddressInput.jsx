import { Field } from "formik";
import { useEffect, useState } from "react";

const AddressInput = ({
  onChange,
  value = "",
  placeholder = "Enter address",
  maxLength = 200,
  name,
  clearForms, // New prop for clearing the input
}) => {
  const [address, setAddress] = useState(value);

  // Handle changes in the textarea and propagate to the parent component
  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress); // Update local state
    onChange(name, newAddress); // Notify parent about the change
  };

  // Clear the address field when "clear" prop changes to true
  useEffect(() => {
    if (clearForms) {
      setAddress(""); // Clear the local state
      onChange(name, ""); // Notify parent about the reset
    }
  }, [clearForms, onChange, name]);

  return (
    <div className="address-input mt-5">
      <label className="block text-sm mb-2 sf-medium font-medium">Address:</label>
      <Field
        as="textarea"

        name={name}
        className="border border-gray-300 sf-medium font-medium p-2 text-sm rounded-md w-full"
        placeholder={placeholder}
        // value={address}
        onChange={handleAddressChange}
        maxLength={maxLength}
        rows={4} // Display 4 rows by default
      />
      {/* Display character count */}
      <div className="text-right text-xs text-gray-500 mt-2">
        {address.length} / {maxLength} characters
      </div>
    </div>
  );
};

export default AddressInput;

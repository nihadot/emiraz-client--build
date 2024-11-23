import { ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";

const DescriptionInput = ({
  name = "description",
  value = "",
  onChange,
  placeholder = "Enter description",
  // maxLength = 500,
  // minLength = 20,
  isLoading = false,
  clearForms,
}) => {
  const [charCount, setCharCount] = useState(value.length);

  useEffect(() => {
    // Clear description when clearForms is triggered
    if (clearForms) {
      setCharCount(0);
    }
  }, [clearForms]);

  const handleDescriptionChange = (e) => {
    const desc = e.target.value;

    // Update character count
    setCharCount(desc.length);

    // Update Formik state
    if (onChange) {
      onChange(name, desc);
    }
  };

  return (
    <div className="flex mt-3 flex-col gap-2">
      <label
        htmlFor={name}
        className="sf-medium font-medium text-sm text-[#000000]"
      >
        Description
      </label>
      <Field
        as="textarea"
        name={name}
        disabled={isLoading}
        placeholder={placeholder}
        className="border border-[#E4E4E4] h-[400px] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666] outline-none"
        onInput={handleDescriptionChange}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm"
        />
        {/* <div>{`${charCount}/${maxLength} characters`}</div> */}
      </div>
    </div>
  );
};

export default DescriptionInput;

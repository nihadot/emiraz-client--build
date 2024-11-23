import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function MultipleFields({
  disabled,
  label,
  labelClassName,
  selectClassName,
  handleOnchange,
  options,
  name,
  required,
  error,    // Validation error state
  touched,  // Whether the field has been touched
  clearFormField
}) {
  const [optionsState, setOptionsState] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(null); // Track selected options

  function handleOnchangeFunction(value) {
    const result = value ? value.map(item => item.value) : [];
    setSelectedOptions(value);  // Update selected options state
    handleOnchange(result);
  }

  const convertIntoOptions = (arr) => {
    const result = arr.map(item => ({
      value: item._id,
      label: item.name,
    }));
    setOptionsState(result);
  };

  useEffect(() => {
    if (options.length > 0) {
      convertIntoOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (clearFormField) {
      setSelectedOptions(null); // Clear selected values if disabled
    }
  }, [clearFormField]);

  const animatedComponents = makeAnimated();

  // Dynamically set the border color based on the validation state
  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: !touched
        ? '#D9D9D9' // Default grey when untouched
        : error
        ? '#f4050579' // Red if there's an error
        : '#46a246',  // Green if valid
      '&:hover': {
        borderColor: !touched
          ? '#D9D9D9' // Hover grey if untouched
          : error
          ? '#f4050579' // Red hover if there's an error
          : '#46a246',  // Green hover if valid
      },
    }),
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='cursor-pointer'>
        <label
          className={`${labelClassName} font-sf-500 capitalize font-medium text-[14px] text-black`}
          htmlFor={name}
        >
          {label} {required ? <span className="text-red-500 text-lg">*</span> : <span className='text-black/45 text-xs'>(optional)</span>}
        </label>
        <Select
          isDisabled={disabled}
          name={name}
          onChange={handleOnchangeFunction}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          value={selectedOptions}  // Bind selected options
          className={`${selectClassName} sf-medium pt-1 font-medium text-sm`}
          options={optionsState}
          styles={customStyles}  // Apply custom border styles
        />
      </div>
    </div>
  );
}

export default MultipleFields;

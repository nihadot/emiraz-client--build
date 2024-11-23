const InputField = ({ name, label, placeholder, value, onChange, disabled, error, touched }) => (
    <div className="flex flex-col gap-2 mx-3">
      <label htmlFor={name} className="sf-medium font-medium text-sm text-[#000000]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`border ${error && touched ? "border-red-500" : "border-[#E4E4E4]"} py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666] outline-none`}
      />
      {error && touched && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
  export default InputField;
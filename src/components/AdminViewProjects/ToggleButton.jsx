import React, { useEffect, useState } from 'react';

function ToggleButton({
    toggleStatus = false,
    toggleOnLabel = "On",
toggleOffLabel="Off"
}) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  useEffect(()=>{
    toggleStatus(isOn)
  },[isOn])

  return (
    <div className="flex items-center">
      <div
        onClick={toggleSwitch}
        className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
          isOn ? 'bg-green-400' : 'bg-gray-300'
        }`}
      >
        {/* Switch circle */}
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
            isOn ? 'translate-x-6' : ''
          }`}
        ></div>
      </div>

      {/* Text indicator */}
      <span className="ml-3 text-sm font-medium">{isOn ? toggleOnLabel : toggleOffLabel}</span>
    </div>
  );
}

export default ToggleButton;

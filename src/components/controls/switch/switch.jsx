import React from 'react';

const Switch = ({ id, checked, onChange, disabled, label }) => {
  const handleChange = (event) => {
    if (!disabled) {
      console.log(`Switch ${id} toggled to: ${event.target.checked}`); // Debug log
      onChange(event.target.checked);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="peer sr-only"
        aria-checked={checked}
        aria-disabled={disabled}
        role="switch"
      />
      <label
        htmlFor={id}
        className={`
          w-11 h-6 rounded-full
          peer-focus:ring-2 peer-focus:ring-blue-300
          transition duration-200 ease-in-out
          ${checked ? 'bg-blue-600' : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div
          className={`
            w-5 h-5 bg-white rounded-full shadow-md
            transform transition duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </label>
      {label && (
        <span className="ml-2 text-gray-700 font-medium">{label}</span>
      )}
    </div>
  );
};

export default Switch;
import React from 'react';

const Switch = ({
  id,
  checked,
  onChange,
  disabled,
  label,
  activeColor = 'bg-gray-900', // Default active color (dark gray)
  inactiveColor = 'bg-gray-200', // Default inactive color
  focusRingColor = 'ring-gray-300', // Default focus ring color
}) => {
  const handleChange = (event) => {
    if (!disabled) {
      console.log(`Switch ${id} toggled to: ${event.target.checked}`);
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
          relative w-9 h-5 rounded-full
          peer-focus:ring-2 peer-focus:${focusRingColor}
          transition duration-200 ease-in-out
          ${checked ? activeColor : inactiveColor}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div
          className={`
            absolute top-0.5 left-0.5
            w-4 h-4 bg-white rounded-full shadow-sm
            transform transition duration-200 ease-in-out
            ${checked ? 'translate-x-4' : 'translate-x-0'}
          `}
        />
      </label>
      {label && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </div>
  );
};

export default Switch;
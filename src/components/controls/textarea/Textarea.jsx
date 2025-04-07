// components/Textarea.jsx
import React from "react";

const Textarea = ({ value, onChange, placeholder, className = "", ...props }) => {
  console.log("value inside text area",value)
  return (
    <textarea
      className={`w-full bg-white text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Textarea;

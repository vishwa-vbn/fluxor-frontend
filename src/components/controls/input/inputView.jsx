// components/ui/Input.js

import React from "react";

const Input = ({ label, type = "text", value, onChange, error, ...props }) => {
  return (
    <div className="space-y-1 mb-2">
      {label && (
        <label className="block text-sm text-gray-600">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...props}
        className={`w-full border p-2 text-sm text-black rounded-[5px] focus:outline-none ${
            error ? "border-red-400" : "border-gray-300"
          }`}
          
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;

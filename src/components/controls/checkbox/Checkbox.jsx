// components/Checkbox.jsx
import React from "react";

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <label className="cursor-pointer label space-x-2">
      <input 
        type="checkbox" 
        className="checkbox checkbox-primary" 
        checked={checked} 
        onChange={onChange} 
      />
      <span className="label-text">{label}</span>
    </label>
  );
};

export default Checkbox;

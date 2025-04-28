// // components/Checkbox.jsx
// import React from "react";

// const Checkbox = ({ checked, onChange, label }) => {
//   return (
//     <label className="cursor-pointer label space-x-2">
//       <input 
//         type="checkbox" 
//         className="checkbox checkbox-primary" 
//         checked={checked} 
//         onChange={onChange} 
//       />
//       <span className="label-text">{label}</span>
//     </label>
//   );
// };

// export default Checkbox;


import React from "react";

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <label className="cursor-pointer flex items-center space-x-2">
      <input
        type="checkbox"
        className="checkbox checkbox-primary text-white dark:text-blue-400 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-sm h-4 w-4 transition-colors duration-200"
        checked={checked}
        onChange={onChange}
      />
      <span className="text-gray-700 dark:text-gray-300 text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;
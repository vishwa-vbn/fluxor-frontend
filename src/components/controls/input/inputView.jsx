// // components/ui/Input.js

// import React from "react";

// const Input = ({ label, type = "text", value, onChange, error, ...props }) => {
//   return (
//     <div className="space-y-1 mb-2">
//       {label && (
//         <label className="block text-sm text-gray-600">{label}</label>
//       )}
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         {...props}
//         className={`w-full border p-2 text-sm text-black rounded-[5px] focus:outline-none ${
//             error ? "border-red-400" : "border-gray-300"
//           }`}
          
//       />
//       {error && <p className="text-xs text-red-500">{error}</p>}
//     </div>
//   );
// };

// export default Input;



import React from "react";

const Input = ({ label, type = "text", value, onChange, error, ...props }) => {
  return (
    <div className="space-y-1 mb-2">
      {label && (
        <label className="block text-sm text-gray-600 dark:text-gray-400">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        {...props}
        className={`w-full border p-2 text-sm rounded-[5px] focus:outline-none transition-colors duration-200 ${
          error
            ? "border-red-500 dark:border-red-400 text-red-500 dark:text-red-400"
            : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
        } focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
      />
      {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default Input;
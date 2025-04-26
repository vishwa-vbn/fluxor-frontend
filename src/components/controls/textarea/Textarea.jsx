// // components/Textarea.jsx
// import React from "react";

// const Textarea = ({ value, onChange, placeholder, className = "", ...props }) => {
//   console.log("value inside text area",value)
//   return (
//     <textarea
//       className={`w-full bg-white text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       {...props}
//     />
//   );
// };

// export default Textarea;


import React from "react";

const Textarea = ({ value, onChange, placeholder, className = "", ...props }) => {
  return (
    <textarea
      className={`w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Textarea;
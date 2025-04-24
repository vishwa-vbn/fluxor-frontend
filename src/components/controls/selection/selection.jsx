// import ReactSelect from "react-select";

// export default function Select({
//   label,
//   value,
//   onChange,
//   options = [],
//   placeholder = "Select…",
//   multiple = false,
// }) {
//   const getSingleValue = () => options.find((opt) => opt.value === value);
//   const getMultiValue = () => options.filter((opt) => value?.includes(opt.value));

//   const customStyles = {
//     control: (base, state) => ({
//       ...base,
//       backgroundColor: "white",
//       borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
//       boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
//       "&:hover": { borderColor: "#3b82f6" },
//       fontSize: "0.875rem",
//     }),
//     singleValue: (base) => ({ ...base, color: "#000" }),
//     multiValueLabel: (base) => ({ ...base, color: "#000" }),
//     input: (base) => ({ ...base, color: "#000" }),
//     placeholder: (base) => ({ ...base, color: "#6b7280" }),
//     menu: (base) => ({ ...base, zIndex: 100 }),
//     menuList: (base) => ({ ...base, backgroundColor: "white" }),
//     option: (base, { isFocused, isSelected }) => ({
//       ...base,
//       backgroundColor: isSelected
//         ? "#e5e7eb"
//         : isFocused
//         ? "#f3f4f6"
//         : "white",
//       color: "#000",
//       "&:active": { backgroundColor: "#e5e7eb" },
//     }),
//   };

//   return (
//     <div className="flex flex-col space-y-1 mb-2">
//       {label && (
//         <label className="text-sm font-medium text-gray-700">{label}</label>
//       )}
//       <ReactSelect
//         isMulti={multiple}
//         value={multiple ? getMultiValue() : getSingleValue()}
//         onChange={(selected) => {
//           if (multiple) {
//             onChange(selected.map((s) => s.value));
//           } else {
//             onChange(selected ? selected.value : "");
//           }
//         }}
//         options={options}
//         placeholder={placeholder}
//         styles={customStyles}
//         className="text-sm"
//         classNamePrefix="react-select"
//       />
//     </div>
//   );
// }



import React from "react";
import ReactSelect from "react-select";

export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  multiple = false,
}) {
  const getSingleValue = () => options.find((opt) => opt.value === value);
  const getMultiValue = () => options.filter((opt) => value?.includes(opt.value));

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? document.documentElement.classList.contains("dark")
          ? "#1f2937" /* gray-800 */
          : "#ffffff" /* white */
        : document.documentElement.classList.contains("dark")
        ? "#374151" /* gray-700 */
        : "#ffffff" /* white */,
      borderColor: state.isFocused
        ? document.documentElement.classList.contains("dark")
          ? "#3b82f6" /* blue-500 */
          : "#3b82f6" /* blue-600 */
        : document.documentElement.classList.contains("dark")
        ? "#4b5563" /* gray-600 */
        : "#d1d5db" /* gray-300 */,
      boxShadow: state.isFocused
        ? document.documentElement.classList.contains("dark")
          ? "0 0 0 1px #3b82f6" /* blue-500 */
          : "0 0 0 1px #3b82f6" /* blue-600 */
        : "none",
      "&:hover": {
        borderColor: document.documentElement.classList.contains("dark")
          ? "#3b82f6" /* blue-500 */
          : "#3b82f6" /* blue-600 */,
      },
      fontSize: "0.875rem",
      borderRadius: "5px",
    }),
    singleValue: (base) => ({
      ...base,
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6" /* gray-100 */
        : "#1f2937" /* gray-900 */,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6" /* gray-100 */
        : "#1f2937" /* gray-900 */,
    }),
    input: (base) => ({
      ...base,
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6" /* gray-100 */
        : "#1f2937" /* gray-900 */,
    }),
    placeholder: (base) => ({
      ...base,
      color: document.documentElement.classList.contains("dark")
        ? "#6b7280" /* gray-500 */
        : "#6b7280" /* gray-400 */,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
      backgroundColor: document.documentElement.classList.contains("dark")
        ? "#1f2937" /* gray-800 */
        : "#ffffff" /* white */,
      border: document.documentElement.classList.contains("dark")
        ? "1px solid #4b5563" /* gray-600 */
        : "1px solid #e5e7eb" /* gray-200 */,
      borderRadius: "5px",
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: document.documentElement.classList.contains("dark")
        ? "#1f2937" /* gray-800 */
        : "#ffffff" /* white */,
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? document.documentElement.classList.contains("dark")
          ? "#4b5563" /* gray-600 */
          : "#e5e7eb" /* gray-200 */
        : isFocused
        ? document.documentElement.classList.contains("dark")
          ? "#374151" /* gray-700 */
          : "#f3f4f6" /* gray-100 */
        : document.documentElement.classList.contains("dark")
        ? "#1f2937" /* gray-800 */
        : "#ffffff" /* white */,
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6" /* gray-100 */
        : "#1f2937" /* gray-900 */,
      "&:active": {
        backgroundColor: document.documentElement.classList.contains("dark")
          ? "#4b5563" /* gray-600 */
          : "#e5e7eb" /* gray-200 */,
      },
    }),
  };

  return (
    <div className="flex flex-col space-y-1 mb-2">
      {label && (
        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {label}
        </label>
      )}
      <ReactSelect
        isMulti={multiple}
        value={multiple ? getMultiValue() : getSingleValue()}
        onChange={(selected) => {
          if (multiple) {
            onChange(selected.map((s) => s.value));
          } else {
            onChange(selected ? selected.value : "");
          }
        }}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        className="text-sm"
        classNamePrefix="react-select"
      />
    </div>
  );
}
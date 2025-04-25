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
import clsx from "clsx";

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

  // Define custom styles for react-select components
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent", // Let Tailwind handle background
      border: "none", // Tailwind handles border
      boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none", // Match focus:ring-2
      "&:hover": {
        border: "none",
      },
      fontSize: "0.875rem", // text-sm
      borderRadius: "0.375rem", // rounded-md
      minHeight: "38px", // Match typical input height
    }),
    singleValue: (base) => ({
      ...base,
      color: "inherit", // Inherit from Tailwind text color
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: document.documentElement.classList.contains("dark")
        ? "#4b5563" // gray-600
        : "#e5e7eb", // gray-200
      borderRadius: "0.25rem", // rounded
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: document.documentElement.classList.contains("dark")
        ? "#e5e7eb" // gray-200
        : "#1f2937", // gray-900
      padding: "0.25rem 0.5rem", // px-2 py-1
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: document.documentElement.classList.contains("dark")
        ? "#9ca3af" // gray-400
        : "#6b7280", // gray-500
      "&:hover": {
        backgroundColor: document.documentElement.classList.contains("dark")
          ? "#374151" // gray-700
          : "#d1d5db", // gray-300
        color: document.documentElement.classList.contains("dark")
          ? "#e5e7eb" // gray-200
          : "#1f2937", // gray-900
      },
    }),
    input: (base) => ({
      ...base,
      color: "inherit",
    }),
    placeholder: (base) => ({
      ...base,
      color: "inherit",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
      backgroundColor: document.documentElement.classList.contains("dark")
        ? "#1f2937" // gray-800
        : "#ffffff", // white
      border: document.documentElement.classList.contains("dark")
        ? "1px solid #4b5563" // gray-600
        : "1px solid #e5e7eb", // gray-200
      borderRadius: "0.375rem", // rounded-md
      marginTop: "0.25rem", // mt-1
    }),
    menuList: (base) => ({
      ...base,
      padding: "0.25rem", // p-1
      backgroundColor: "transparent", // Inherit from menu
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? document.documentElement.classList.contains("dark")
          ? "#4b5563" // gray-600
          : "#e5e7eb" // gray-200
        : isFocused
        ? document.documentElement.classList.contains("dark")
          ? "#374151" // gray-700
          : "#f3f4f6" // gray-100
        : "transparent",
      color: document.documentElement.classList.contains("dark")
        ? "#e5e7eb" // gray-200
        : "#1f2937", // gray-900
      borderRadius: "0.25rem", // rounded
      padding: "0.5rem 0.75rem", // px-3 py-2
      cursor: "pointer",
      "&:active": {
        backgroundColor: document.documentElement.classList.contains("dark")
          ? "#4b5563" // gray-600
          : "#e5e7eb", // gray-200
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
        className={clsx(
          "text-sm",
          // Light theme
          "bg-white text-gray-900 border-gray-300 focus:ring-blue-600",
          // Dark theme
          "dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-blue-500",
          // General styles
          "border rounded-md focus:ring-2",
          // Placeholder
          "placeholder-gray-400 dark:placeholder-gray-500"
        )}
        classNamePrefix="react-select"
      />
    </div>
  );
}
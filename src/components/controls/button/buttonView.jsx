// import React from "react";
// import clsx from "clsx";

// const Button = ({
//   children,
//   loading,
//   disabled,
//   variant = "outline",
//   size = "md",
//   fullWidth = false,
//   className = "",
//   ...props
// }) => {
//   const baseClass = clsx(
//     "rounded-[5px] px-4 py-2 text-sm font-medium transition-colors duration-150",
//     "flex flex-row items-center justify-center flex-nowrap", // Added flex properties
//     {
//       "w-full": fullWidth,
//       "opacity-50 cursor-not-allowed": loading || disabled,
//       "text-ellipsis overflow-hidden whitespace-nowrap": true, // Keep overflow handling
//     }
//   );

//   const variantClass = {
//     outline: "border border-gray-400 text-gray-800 bg-white hover:bg-gray-100",
//     ghost: "border-none text-gray-800 bg-transparent hover:bg-gray-100",
//     primary: "border border-blue-500 text-blue-600 bg-white hover:bg-blue-50",
//     error: "border border-red-500 text-red-600 bg-white hover:bg-red-50",
//     success: "border border-green-500 text-green-600 bg-white hover:bg-green-50",
//     warning: "border border-yellow-500 text-yellow-600 bg-white hover:bg-yellow-50",
//   }[variant];

//   const sizeClass = {
//     sm: "text-sm py-1 px-2",
//     md: "text-base py-2 px-4",
//     lg: "text-lg py-3 px-6",
//     mini: "text-sm py-[5px] px-3",
//   }[size];

//   return (
//     <button
//       disabled={loading || disabled}
//       className={clsx(baseClass, variantClass, sizeClass, className)}
//       {...props}
//     >
//       {loading ? "Loading..." : children}
//     </button>
//   );
// };

// export default Button;


import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  loading,
  disabled,
  variant = "outline",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseClass = clsx(
    "rounded-[5px] px-4 py-2 text-sm font-medium transition-colors duration-150",
    "flex flex-row items-center justify-center flex-nowrap",
    {
      "w-full": fullWidth,
      "opacity-50 cursor-not-allowed": loading || disabled,
      "text-ellipsis overflow-hidden whitespace-nowrap": true,
    }
  );

  const variantClass = {
    outline: clsx(
      "border",
      // Light theme
      "text-gray-800 bg-white border-gray-400 hover:bg-gray-100",
      // Dark theme
      "dark:text-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
    ),
    ghost: clsx(
      "border-none",
      // Light theme
      "text-gray-800 bg-transparent hover:bg-gray-100",
      // Dark theme
      "dark:text-gray-200 dark:bg-transparent dark:hover:bg-gray-600"
    ),
    primary: clsx(
      "border",
      // Light theme
      "text-blue-600 bg-white border-blue-500 hover:bg-blue-50",
      // Dark theme
      "dark:text-blue-400 dark:bg-gray-800 dark:border-blue-600 dark:hover:bg-blue-900"
    ),
    error: clsx(
      "border",
      // Light theme
      "text-red-600 bg-white border-red-500 hover:bg-red-50",
      // Dark theme
      "dark:text-red-400 dark:bg-gray-800 dark:border-red-600 dark:hover:bg-red-900"
    ),
    success: clsx(
      "border",
      // Light theme
      "text-green-600 bg-white border-green-500 hover:bg-green-50",
      // Dark theme
      "dark:text-green-400 dark:bg-gray-800 dark:border-green-600 dark:hover:bg-green-900"
    ),
    warning: clsx(
      "border",
      // Light theme
      "text-yellow-600 bg-white border-yellow-500 hover:bg-yellow-50",
      // Dark theme
      "dark:text-yellow-400 dark:bg-gray-800 dark:border-yellow-600 dark:hover:bg-yellow-900"
    ),
  }[variant];

  const sizeClass = {
    sm: "text-sm py-1 px-2",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6",
    mini: "text-sm py-[5px] px-3",
  }[size];

  return (
    <button
      disabled={loading || disabled}
      className={clsx(baseClass, variantClass, sizeClass, className)}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
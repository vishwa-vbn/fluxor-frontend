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
    "flex flex-row items-center justify-center flex-nowrap", // Added flex properties
    {
      "w-full": fullWidth,
      "opacity-50 cursor-not-allowed": loading || disabled,
      "text-ellipsis overflow-hidden whitespace-nowrap": true, // Keep overflow handling
    }
  );

  const variantClass = {
    outline: "border border-gray-400 text-gray-800 bg-white hover:bg-gray-100",
    ghost: "border-none text-gray-800 bg-transparent hover:bg-gray-100",
    primary: "border border-blue-500 text-blue-600 bg-white hover:bg-blue-50",
    error: "border border-red-500 text-red-600 bg-white hover:bg-red-50",
    success: "border border-green-500 text-green-600 bg-white hover:bg-green-50",
    warning: "border border-yellow-500 text-yellow-600 bg-white hover:bg-yellow-50",
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
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
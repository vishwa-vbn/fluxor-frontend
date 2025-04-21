import React from "react";
import PropTypes from "prop-types";

export const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[5px] ${className}`}
  >
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardHeader = ({ children, className = "", customHeaderClass = "", onClick }) => (
  <div
    className={`px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-[5px] flex flex-col items-left justify-between cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 ${className} ${customHeaderClass}`}
    onClick={onClick}
  >
    {children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  customHeaderClass: PropTypes.string,
  onClick: PropTypes.func,
};

export const CardTitle = ({ children, className = "" }) => (
  <h2
    className={`text-base font-medium text-gray-900 dark:text-gray-100 ${className}`}
  >
    {children}
  </h2>
);

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardContent = ({ children, className = "" }) => (
  <div
    className={`px-4 py-4 text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out ${className}`}
  >
    {children}
  </div>
);

CardContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const CardFooter = ({ children, className = "" }) => (
  <div
    className={`px-4 py-3 border-t border-gray-200 dark:border-gray-700 rounded-b-[5px] ${className}`}
  >
    {children}
  </div>
);

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
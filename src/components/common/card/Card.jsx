// components/Card.jsx
import React from "react";

export const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white text-black border border-gray-200 rounded-[5px] ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="px-4 py-3 border-b border-gray-200 rounded-t-[5px]">
    {children}
  </div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-black">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="px-4 py-3 text-black">{children}</div>
);

export const CardFooter = ({ children }) => (
  <div className="px-4 py-3 border-t border-gray-200 rounded-b-[5px]">
    {children}
  </div>
);

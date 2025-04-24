// import React, { useState, useEffect } from "react";

// export const Tabs = ({ children, defaultValue, value, onValueChange }) => {
//   // Use internal state for uncontrolled mode, or controlled value if provided
//   const [internalActiveTab, setInternalActiveTab] = useState(defaultValue);
//   const activeTab = value !== undefined ? value : internalActiveTab;

//   // Update internal state when defaultValue changes (for uncontrolled mode)
//   useEffect(() => {
//     if (value === undefined) {
//       setInternalActiveTab(defaultValue);
//     }
//   }, [defaultValue, value]);

//   // Handle tab change
//   const handleTabChange = (newValue) => {
//     if (value !== undefined) {
//       // Controlled mode: Call onValueChange
//       onValueChange?.(newValue);
//     } else {
//       // Uncontrolled mode: Update internal state
//       setInternalActiveTab(newValue);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {React.Children.map(children, (child) =>
//         React.cloneElement(child, { activeTab, setActiveTab: handleTabChange })
//       )}
//     </div>
//   );
// };

// export const TabsList = ({ children, activeTab, setActiveTab }) => (
//   <div className="flex space-x-2 border-b border-gray-200">
//     {React.Children.map(children, (child) =>
//       React.cloneElement(child, { activeTab, setActiveTab })
//     )}
//   </div>
// );

// export const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => (
//   <button
//     className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
//       activeTab === value
//         ? "bg-gray-100 text-gray-900"
//         : "text-muted-foreground hover:bg-gray-50"
//     }`}
//     onClick={() => setActiveTab(value)}
//   >
//     {children}
//   </button>
// );

// export const TabsContent = ({ value, activeTab, children }) => {
//   if (value !== activeTab) return null;
//   return <div className="space-y-2">{children}</div>;
// };

import React, { useState, useEffect } from "react";
import clsx from "clsx";

export const Tabs = ({ children, defaultValue, value, onValueChange }) => {
  // Use internal state for uncontrolled mode, or controlled value if provided
  const [internalActiveTab, setInternalActiveTab] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalActiveTab;

  // Update internal state when defaultValue changes (for uncontrolled mode)
  useEffect(() => {
    if (value === undefined) {
      setInternalActiveTab(defaultValue);
    }
  }, [defaultValue, value]);

  // Handle tab change
  const handleTabChange = (newValue) => {
    if (value !== undefined) {
      // Controlled mode: Call onValueChange
      onValueChange?.(newValue);
    } else {
      // Uncontrolled mode: Update internal state
      setInternalActiveTab(newValue);
    }
  };

  return (
    <div className="space-y-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab: handleTabChange })
      )}
    </div>
  );
};

export const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className={clsx(
    "flex space-x-2 border-b",
    // Light theme
    "border-gray-200",
    // Dark theme
    "dark:border-gray-700"
  )}>
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

export const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => (
  <button
    className={clsx(
      "px-4 py-2 text-sm font-medium rounded-t-md transition-colors duration-150",
      activeTab === value
        ? clsx(
            // Light theme (active)
            "bg-gray-100 text-gray-900",
            // Dark theme (active)
            "dark:bg-gray-800 dark:text-gray-200"
          )
        : clsx(
            // Light theme (inactive)
            "text-gray-500 hover:bg-gray-50",
            // Dark theme (inactive)
            "dark:text-gray-400 dark:hover:bg-gray-700"
          )
    )}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, activeTab, children }) => {
  if (value !== activeTab) return null;
  return (
    <div className={clsx(
      "space-y-2 p-4",
      // Light theme
      "bg-white text-gray-900",
      // Dark theme
      "dark:bg-gray-900 dark:text-gray-200"
    )}>
      {children}
    </div>
  );
};
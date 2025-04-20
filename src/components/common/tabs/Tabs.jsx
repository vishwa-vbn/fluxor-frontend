import React, { useState } from "react";

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className="space-y-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex space-x-2 border-b border-gray-200">
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

export const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => (
  <button
    className={`px-4 py-2 text-sm font-medium rounded-t-md transition-colors ${
      activeTab === value
        ? "bg-gray-100 text-gray-900"
        : "text-muted-foreground hover:bg-gray-50"
    }`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ value, activeTab, children }) => {
  if (value !== activeTab) return null;
  return <div className="space-y-2">{children}</div>;
};
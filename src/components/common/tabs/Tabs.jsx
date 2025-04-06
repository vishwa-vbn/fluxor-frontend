// components/Tabs.jsx
import React, { useState } from "react";

export const Tabs = ({ children, value, onChange }) => {
  return <div>{children}</div>;
};

export const TabsList = ({ children }) => (
  <div className="tabs tabs-boxed mb-2">{children}</div>
);

export const TabsTrigger = ({ value, activeTab, setActiveTab, children }) => (
  <a
    className={`tab ${activeTab === value ? "tab-active" : ""}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </a>
);

export const TabsContent = ({ value, activeTab, children }) => {
  if (value !== activeTab) return null;
  return <div className="mt-2">{children}</div>;
};

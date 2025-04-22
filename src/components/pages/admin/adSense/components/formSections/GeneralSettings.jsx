import React from "react";
import Input from "../../../../../controls/input/inputView";
import Select from "../../../../../controls/selection/selection";

const GeneralSettings = ({ formData, errors, handleChange, handleNestedChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input
        label="Ad Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        name="name"
        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />
      <Input
        label="Ad Code"
        value={formData.code}
        onChange={(e) => handleChange("code", e.target.value)}
        error={errors.code}
        name="code"
        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />
      <Select
        label="Ad Type"
        options={[
          { value: "banner", label: "Banner" },
          { value: "video", label: "Video" },
          { value: "native", label: "Native" },
          { value: "custom", label: "Custom" },
        ]}
        value={formData.ad_type}
        onChange={(value) => handleChange("ad_type", value)}
        name="ad_type"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
      <Select
        label="Placement"
        options={[
          { value: "header", label: "Header" },
          { value: "sidebar", label: "Sidebar" },
          { value: "in_content", label: "In Content" },
          { value: "footer", label: "Footer" },
          { value: "custom", label: "Custom" },
        ]}
        value={formData.placement}
        onChange={(value) => handleChange("placement", value)}
        name="placement"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
      <Input
        label="Width (px)"
        type="number"
        value={formData.dimensions.width}
        onChange={(e) => handleNestedChange("dimensions", "width", Number(e.target.value))}
        error={errors.dimensions}
        name="dimensions_width"
        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />
      <Input
        label="Height (px)"
        type="number"
        value={formData.dimensions.height}
        onChange={(e) => handleNestedChange("dimensions", "height", Number(e.target.value))}
        error={errors.dimensions}
        name="dimensions_height"
        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />
      <Input
        label="Priority"
        type="number"
        value={formData.priority}
        onChange={(e) => handleChange("priority", Number(e.target.value))}
        name="priority"
        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.is_active}
          onChange={(e) => handleChange("is_active", e.target.checked)}
          name="is_active"
          className="dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="text-sm text-gray-700 dark:text-gray-300">Active</label>
      </div>
    </div>
  );
};

export default GeneralSettings;
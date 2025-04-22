import React from "react";
import Select from "../../../../../controls/selection/selection";
import Textarea from "../../../../../controls/textarea/Textarea";
import { adSenseConstants } from "../../adSenseConstants";

const TargetingSettings = ({ formData, errors, handleNestedChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Select
        label="Page Match Type"
        value={formData.target_pages.match_type}
        options={adSenseConstants.matchTypeOptions}
        onChange={(val) => handleNestedChange("target_pages", "match_type", val)}
        name="match_type"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
      <Textarea
        label="Paths (comma separated)"
        value={formData.target_pages.paths.join(", ")}
        onChange={(e) =>
          handleNestedChange(
            "target_pages",
            "paths",
            e.target.value.split(",").map((p) => p.trim()).filter((p) => p)
          )
        }
        error={errors.target_pages}
        name="paths"
        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />
      <Select
        label="Devices"
        isMulti
        value={formData.target_audience.device}
        options={adSenseConstants.deviceOptions}
        onChange={(val) => handleNestedChange("target_audience", "device", val)}
        name="device"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
      <Select
        label="Age Range"
        isMulti
        value={formData.target_audience.age_range}
        options={adSenseConstants.ageRangeOptions}
        onChange={(val) => handleNestedChange("target_audience", "age_range", val)}
        name="age_range"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
      <Select
        label="Interests"
        isMulti
        value={formData.target_audience.interests}
        options={adSenseConstants.interestOptions}
        onChange={(val) => handleNestedChange("target_audience", "interests", val)}
        name="interests"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
      <Select
        label="Geo"
        isMulti
        value={formData.target_audience.geo}
        options={adSenseConstants.geoOptions}
        onChange={(val) => handleNestedChange("target_audience", "geo", val)}
        name="geo"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
    </div>
  );
};

export default TargetingSettings;
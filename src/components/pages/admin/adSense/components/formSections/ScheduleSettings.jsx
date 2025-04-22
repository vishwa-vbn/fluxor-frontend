import React from "react";
import DateTimePicker from "../../../../../controls/datetimePicker/DateTimePicker";
import Input from "../../../../../controls/input/inputView";

const ScheduleSettings = ({ formData, errors, handleNestedChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <DateTimePicker
        label="Start Time"
        value={formData.schedule.start}
        onChange={(val) => handleNestedChange("schedule", "start", val)}
        error={errors.schedule}
        name="start"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
      <DateTimePicker
        label="End Time"
        value={formData.schedule.end}
        onChange={(val) => handleNestedChange("schedule", "end", val)}
        error={errors.schedule}
        name="end"
        className="dark:bg-gray-700 dark:text-gray-100"
      />
      <Input
        label="Timezone"
        value={formData.schedule.timezone}
        onChange={(e) => handleNestedChange("schedule", "timezone", e.target.value)}
        name="timezone"
        className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
      />
    </div>
  );
};

export default ScheduleSettings;
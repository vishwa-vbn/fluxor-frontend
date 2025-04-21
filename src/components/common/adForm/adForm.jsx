import React, { useState, useEffect } from "react";
import Input from "../../controls/input/inputView";
import Select from "../../controls/selection/selection";
import Textarea from "../../controls/textarea/Textarea";
import FileUpload from "../../controls/fileUpload/fileUpload";
import DateTimePicker from "../../controls/datetimePicker/DateTimePicker";
import AdPreview from "../../common/adPreview/adPreview";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../controls/button/buttonView";
import {Card,CardHeader,CardTitle,CardContent   } from '../../common/card/Card'

const defaultAudience = {
  geo: [],
  device: [],
  interests: [],
  age_range: [],
};

const defaultSchedule = {
  start: "",
  end: "",
  timezone: "UTC",
};

const defaultDimensions = {
  width: 0,
  height: 0,
  unit: "px",
};

const defaultCustomContent = {
  html: "",
  css: "",
  js: "",
  image_url: "",
  youtube_url: "",
  text: "",
  content_type: "url",
};

const normalizeAdData = (ad) => ({
  id: ad.id || null,
  name: ad.name || "",
  code: ad.code || "",
  ad_type: ad.ad_type || "display",
  placement: ad.placement || "header",
  custom_content: { ...defaultCustomContent, ...ad.custom_content },
  dimensions: { ...defaultDimensions, ...ad.dimensions },
  is_active: ad.is_active ?? true,
  target_pages: {
    match_type: ad.target_pages?.match_type || "exact",
    paths: Array.isArray(ad.target_pages?.paths) ? ad.target_pages.paths : [],
  },
  target_audience: { ...defaultAudience, ...ad.target_audience },
  schedule: { ...defaultSchedule, ...ad.schedule },
  priority: ad.priority || 0,
  status: ad.status || (ad.is_active ? "active" : "draft"),
  custom_file_id: ad.custom_file_id || "",
  file: null,
});

const matchTypeOptions = [
  { value: "exact", label: "Exact Match" },
  { value: "prefix", label: "Starts With" },
  { value: "regex", label: "Regex Match" },
];

const deviceOptions = ["Mobile", "Desktop", "Tablet"].map((d) => ({
  label: d,
  value: d.toLowerCase(),
}));
const ageRangeOptions = ["18-24", "25-34", "35-44", "45-54", "55+"].map((r) => ({
  label: r,
  value: r,
}));
const interestOptions = ["Tech", "Finance", "Travel", "Fitness", "Gaming"].map((i) => ({
  label: i,
  value: i.toLowerCase(),
}));
const geoOptions = ["US", "UK", "CA", "IN", "AU"].map((g) => ({
  label: g,
  value: g,
}));

const contentTypeOptions = {
  display: [
    { value: "url", label: "Image URL" },
    { value: "custom_image", label: "Upload Image" },
  ],
  video: [
    { value: "url", label: "YouTube URL" },
    { value: "custom_video", label: "Upload Video" },
  ],
};

const AdForm = ({ ad = {}, onSubmit, size = "lg" }) => {
  const [formData, setFormData] = useState(normalizeAdData(ad));
  const [errors, setErrors] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    content: false,
    targeting: false,
    schedule: false,
  });

  useEffect(() => {
    setFormData(normalizeAdData(ad));
  }, [ad]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleNestedChange = (group, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: { ...prev[group], [key]: value },
    }));
    setErrors((prev) => ({ ...prev, [group]: null }));
  };

  const handleCustomContentChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      custom_content: { ...prev.custom_content, [key]: value },
    }));
    setErrors((prev) => ({ ...prev, custom_content: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("file", file);
      const previewUrl = URL.createObjectURL(file);
      handleCustomContentChange(
        formData.ad_type === "video" ? "youtube_url" : "image_url",
        previewUrl
      );
      handleChange("custom_file_id", `file_${Date.now()}`);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Ad name is required";
    if (!formData.code) newErrors.code = "Ad code is required";
    if (
      formData.ad_type === "video" &&
      formData.custom_content.content_type === "url" &&
      !formData.custom_content.youtube_url
    ) {
      newErrors.youtube_url = "YouTube URL is required for video ads";
    }
    if (
      formData.ad_type === "video" &&
      formData.custom_content.content_type === "custom_video" &&
      !formData.file
    ) {
      newErrors.file = "Video file is required for custom video ads";
    }
    if (
      formData.ad_type === "display" &&
      formData.custom_content.content_type === "url" &&
      !formData.custom_content.image_url
    ) {
      newErrors.image_url = "Image URL is required for display ads";
    }
    if (
      formData.ad_type === "display" &&
      formData.custom_content.content_type === "custom_image" &&
      !formData.file
    ) {
      newErrors.file = "Image file is required for custom image ads";
    }
    if (
      formData.ad_type === "custom" &&
      !formData.custom_content.html &&
      !formData.custom_content.css &&
      !formData.custom_content.js
    ) {
      newErrors.custom_content = "At least one of HTML, CSS, or JS is required for custom ads";
    }
    if (formData.dimensions.width <= 0 || formData.dimensions.height <= 0) {
      newErrors.dimensions = "Valid dimensions are required";
    }
    if (formData.target_pages.paths.length === 0) {
      newErrors.target_pages = "At least one target page path is required";
    }
    if (
      formData.schedule.start &&
      formData.schedule.end &&
      new Date(formData.schedule.start) >= new Date(formData.schedule.end)
    ) {
      newErrors.schedule = "End time must be after start time";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const dataToSend = {
      id: formData.id,
      name: formData.name,
      code: formData.code,
      ad_type: formData.ad_type,
      placement: formData.placement,
      dimensions: formData.dimensions,
      is_active: formData.is_active,
      target_pages: formData.target_pages,
      target_audience: formData.target_audience,
      schedule: formData.schedule,
      priority: formData.priority,
      status: formData.status,
      custom_file_id: formData.custom_file_id,
      custom_content: formData.custom_content,
    };

    console.log("Submitted AdForm Data:", dataToSend);

    if (formData.file) {
      const formDataToSend = new FormData();
      Object.keys(dataToSend).forEach((key) => {
        if (typeof dataToSend[key] === "object" && key !== "file") {
          formDataToSend.append(key, JSON.stringify(dataToSend[key]));
        } else {
          formDataToSend.append(key, dataToSend[key]);
        }
      });
      formDataToSend.append("file", formData.file);
      console.log("Submitted FormData with File:", Object.fromEntries(formDataToSend));
      onSubmit(formDataToSend);
    } else {
      onSubmit(dataToSend);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const gridCols = size === "lg" ? "lg:grid-cols-3 grid-cols-1 gap-6" : "grid-cols-1 gap-4";

  return (
    <div className={`grid ${gridCols} gap-6 dark:bg-gray-900 dark:text-gray-100`}>
      <div className="col-span-2 space-y-6">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* General Settings */}
          <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <CardHeader
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("general")}
            >
              <CardTitle>General Settings</CardTitle>
              {expandedSections.general ? (
                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </CardHeader>
            {expandedSections.general && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      { value: "display", label: "Display" },
                      { value: "video", label: "Video" },
                      { value: "native", label: "Native" },
                      { value: "custom", label: "Custom" },
                    ]}
                    value={formData.ad_type}
                    onChange={(value) => {
                      handleChange("ad_type", value);
                      handleCustomContentChange("content_type", contentTypeOptions[value]?.[0]?.value || "url");
                    }}
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
              </CardContent>
            )}
          </Card>

          {/* Content Settings */}
          <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <CardHeader
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("content")}
            >
              <CardTitle>Content Settings</CardTitle>
              {expandedSections.content ? (
                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </CardHeader>
            {expandedSections.content && (
              <CardContent className="space-y-4">
                {(formData.ad_type === "display" || formData.ad_type === "video") && (
                  <Select
                    label="Content Type"
                    options={contentTypeOptions[formData.ad_type] || []}
                    value={formData.custom_content.content_type}
                    onChange={(value) => {
                      handleCustomContentChange("content_type", value);
                      handleCustomContentChange("image_url", "");
                      handleCustomContentChange("youtube_url", "");
                      handleChange("file", null);
                    }}
                    name="content_type"
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
                {formData.ad_type === "display" && formData.custom_content.content_type === "url" && (
                  <Input
                    label="Image URL"
                    value={formData.custom_content.image_url}
                    onChange={(e) => handleCustomContentChange("image_url", e.target.value)}
                    error={errors.image_url}
                    name="image_url"
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                )}
                {formData.ad_type === "display" && formData.custom_content.content_type === "custom_image" && (
                  <FileUpload
                    label="Upload Image"
                    value={formData.custom_content.image_url}
                    onChange={handleFileChange}
                    accept="image/*"
                    preview={true}
                    error={errors.file}
                    name="file"
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
                {formData.ad_type === "video" && formData.custom_content.content_type === "url" && (
                  <Input
                    label="YouTube URL"
                    value={formData.custom_content.youtube_url}
                    onChange={(e) => handleCustomContentChange("youtube_url", e.target.value)}
                    error={errors.youtube_url}
                    name="youtube_url"
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                )}
                {formData.ad_type === "video" && formData.custom_content.content_type === "custom_video" && (
                  <FileUpload
                    label="Upload Video"
                    value={formData.custom_content.youtube_url}
                    onChange={handleFileChange}
                    accept="video/*"
                    preview={true}
                    error={errors.file}
                    name="file"
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                )}
                {formData.ad_type === "native" && (
                  <Textarea
                    label="Native Ad Text"
                    value={formData.custom_content.text}
                    onChange={(e) => handleCustomContentChange("text", e.target.value)}
                    error={errors.custom_content}
                    name="text"
                    className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                  />
                )}
                {formData.ad_type === "custom" && (
                  <div className="space-y-4">
                    <Textarea
                      label="HTML"
                      value={formData.custom_content.html}
                      onChange={(e) => handleCustomContentChange("html", e.target.value)}
                      error={errors.custom_content}
                      name="html"
                      className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    />
                    <Textarea
                      label="CSS"
                      value={formData.custom_content.css}
                      onChange={(e) => handleCustomContentChange("css", e.target.value)}
                      name="css"
                      className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    />
                    <Textarea
                      label="JS"
                      value={formData.custom_content.js}
                      onChange={(e) => handleCustomContentChange("js", e.target.value)}
                      name="js"
                      className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    />
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Targeting Settings */}
          <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <CardHeader
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("targeting")}
            >
              <CardTitle>Targeting Settings</CardTitle>
              {expandedSections.targeting ? (
                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </CardHeader>
            {expandedSections.targeting && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Page Match Type"
                    value={formData.target_pages.match_type}
                    options={matchTypeOptions}
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
                        e.target.value
                          .split(",")
                          .map((p) => p.trim())
                          .filter((p) => p)
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
                    options={deviceOptions}
                    onChange={(val) => handleNestedChange("target_audience", "device", val)}
                    name="device"
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                  <Select
                    label="Age Range"
                    isMulti
                    value={formData.target_audience.age_range}
                    options={ageRangeOptions}
                    onChange={(val) => handleNestedChange("target_audience", "age_range", val)}
                    name="age_range"
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                  <Select
                    label="Interests"
                    isMulti
                    value={formData.target_audience.interests}
                    options={interestOptions}
                    onChange={(val) => handleNestedChange("target_audience", "interests", val)}
                    name="interests"
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                  <Select
                    label="Geo"
                    isMulti
                    value={formData.target_audience.geo}
                    options={geoOptions}
                    onChange={(val) => handleNestedChange("target_audience", "geo", val)}
                    name="geo"
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Schedule Settings */}
          <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <CardHeader
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("schedule")}
            >
              <CardTitle>Schedule Settings</CardTitle>
              {expandedSections.schedule ? (
                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </CardHeader>
            {expandedSections.schedule && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </CardContent>
            )}
          </Card>

          {/* Sticky Action Bar */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 py-4 border-t dark:border-gray-700 flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData(normalizeAdData({}))}
              className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {formData.id ? "Update Ad" : "Create Ad"}
            </Button>
          </div>
        </form>
      </div>

      {/* Preview Pane */}
      <div className="col-span-1">
        <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700 sticky top-4">
          <CardHeader>
            <CardTitle>Ad Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <AdPreview ad={formData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdForm;
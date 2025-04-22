import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../common/card/Card";
import Button from "../../../../controls/button/buttonView";
import AdPreview from "../../../../common/adPreview/adPreview";
import GeneralSettings from "./formSections/GeneralSettings";
import ContentSettings from "./formSections/ContentSettings";
import TargetingSettings from "./formSections/TargetingSettings";
import ScheduleSettings from "./formSections/ScheduleSettings";
import { ChevronDown, ChevronUp } from "lucide-react";
import { adSenseConstants } from "../adSenseConstants";

const AdForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  editingAd,
  onSaveAd,
  onUpdateAd,
  defaultAd,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    content: true,
    targeting: true,
    schedule: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

  const handleFileChange = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
        custom_content: {
          ...prev.custom_content,
          [formData.ad_type === "video" ? "youtube_url" : "image_url"]: file,
        },
      }));
      setErrors((prev) => ({ ...prev, file: null }));
    }
  };

  const handleSaveAd = (e) => {
    e.preventDefault();
    const dataToSend = {
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
      status: formData.is_active ? "active" : "draft",
      custom_content: {
        ...formData.custom_content,
        image_url:
          formData.custom_content.image_url instanceof File
            ? ""
            : formData.custom_content.image_url,
        youtube_url:
          formData.custom_content.youtube_url instanceof File
            ? ""
            : formData.custom_content.youtube_url,
      },
    };

    if (formData.file) {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.file);
      formDataToSend.append("data", JSON.stringify(dataToSend));
      editingAd
        ? onUpdateAd({ id: formData.id, data: formDataToSend })
        : onSaveAd(formDataToSend);
    } else {
      editingAd
        ? onUpdateAd({ id: formData.id, data: dataToSend })
        : onSaveAd(dataToSend);
    }

    setFormData(adSenseConstants.normalizeAdData(defaultAd));
    setErrors({});
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1 lg:col-span-2 space-y-6">
        <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              {editingAd ? "Edit Ad" : "Create New Ad"}
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Configure your custom ad unit with detailed settings and preview it in real-time.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <CardHeader
                className="flex flex-row justify-between items-center cursor-pointer py-3"
                onClick={() => toggleSection("general")}
              >
                <CardTitle className="text-base">General Settings</CardTitle>
                {expandedSections.general ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </CardHeader>
              {expandedSections.general && (
                <CardContent className="space-y-4 pt-4">
                  <GeneralSettings
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleNestedChange={handleNestedChange}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <CardHeader
                className="flex flex-row justify-between items-center cursor-pointer py-3"
                onClick={() => toggleSection("content")}
              >
                <CardTitle className="text-base">Content Settings</CardTitle>
                {expandedSections.content ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </CardHeader>
              {expandedSections.content && (
                <CardContent className="space-y-4 pt-4">
                  <ContentSettings
                    formData={formData}
                    errors={errors}
                    handleCustomContentChange={handleCustomContentChange}
                    handleFileChange={handleFileChange}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <CardHeader
                className="flex flex-row justify-between items-center cursor-pointer py-3"
                onClick={() => toggleSection("targeting")}
              >
                <CardTitle className="text-base">Targeting Settings</CardTitle>
                {expandedSections.targeting ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </CardHeader>
              {expandedSections.targeting && (
                <CardContent className="space-y-4 pt-4">
                  <TargetingSettings
                    formData={formData}
                    errors={errors}
                    handleNestedChange={handleNestedChange}
                  />
                </CardContent>
              )}
            </Card>

            <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <CardHeader
                className="flex flex-row justify-between items-center cursor-pointer py-3"
                onClick={() => toggleSection("schedule")}
              >
                <CardTitle className="text-base">Schedule Settings</CardTitle>
                {expandedSections.schedule ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </CardHeader>
              {expandedSections.schedule && (
                <CardContent className="space-y-4 pt-4">
                  <ScheduleSettings
                    formData={formData}
                    errors={errors}
                    handleNestedChange={handleNestedChange}
                  />
                </CardContent>
              )}
            </Card>

            <div className="sticky bottom-0 bg-white dark:bg-gray-900 py-4 border-t dark:border-gray-700 flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData(adSenseConstants.normalizeAdData(defaultAd))}
                className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
              >
                Reset
              </Button>
              <Button
                type="button"
                onClick={handleSaveAd}
                variant="outline"
                className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
              >
                {editingAd ? "Update Ad" : "Create Ad"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1">
        <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700 sticky top-4">
          <CardHeader>
            <CardTitle className="text-base">Ad Preview</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Real-time preview of your ad configuration
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
              <AdPreview ad={formData} />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Type:</span>
                <span className="text-gray-800 dark:text-gray-100">{formData.ad_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Placement:</span>
                <span className="text-gray-800 dark:text-gray-100">{formData.placement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Dimensions:</span>
                <span className="text-gray-800 dark:text-gray-100">
                  {formData.dimensions.width}x{formData.dimensions.height}px
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Status:</span>
                <span className="text-gray-800 dark:text-gray-100">
                  {formData.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdForm;
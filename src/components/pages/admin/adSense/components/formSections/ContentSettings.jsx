import React from "react";
import Select from "../../../../../controls/selection/selection";
import Input from "../../../../../controls/input/inputView";
import FileUpload from "../../../../../controls/fileUpload/fileUpload";
import Textarea from "../../../../../controls/textarea/Textarea";
import { adSenseConstants } from "../../adSenseConstants";

const ContentSettings = ({ formData, errors, handleCustomContentChange, handleFileChange }) => {
  return (
    <div className="space-y-4">
      {(formData.ad_type === "banner" || formData.ad_type === "video") && (
        <Select
          label="Content Type"
          options={adSenseConstants.contentTypeOptions[formData.ad_type] || []}
          value={formData.custom_content.content_type}
          onChange={(value) => {
            handleCustomContentChange("content_type", value);
            handleCustomContentChange("image_url", "");
            handleCustomContentChange("youtube_url", "");
            handleFileChange(null);
          }}
          name="content_type"
          className="dark:bg-gray-700 dark:text-gray-100"
        />
      )}
      {formData.ad_type === "banner" && formData.custom_content.content_type === "url" && (
        <Input
          label="Image URL"
          value={formData.custom_content.image_url}
          onChange={(e) => handleCustomContentChange("image_url", e.target.value)}
          error={errors.image_url}
          name="image_url"
          className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />
      )}
      {formData.ad_type === "banner" && formData.custom_content.content_type === "custom_image" && (
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
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
          />
          <Textarea
            label="CSS"
            value={formData.custom_content.css}
            onChange={(e) => handleCustomContentChange("css", e.target.value)}
            name="css"
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
          />
          <Textarea
            label="JS"
            value={formData.custom_content.js}
            onChange={(e) => handleCustomContentChange("js", e.target.value)}
            name="js"
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
          />
        </div>
      )}
    </div>
  );
};

export default ContentSettings;
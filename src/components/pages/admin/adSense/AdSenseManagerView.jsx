import React, { useState, useMemo, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../common/tabs/Tabs";
import Input from "../../../controls/input/inputView";
import Select from "../../../controls/selection/selection";
import Textarea from "../../../controls/textarea/Textarea";
import FileUpload from "../../../controls/fileUpload/fileUpload";
import DateTimePicker from "../../../controls/datetimePicker/DateTimePicker";
import AdPreview from "../../../common/adPreview/adPreview";
import { ChevronDown, ChevronUp, Plus, Trash2, Eye } from "lucide-react";
import Button from "../../../controls/button/buttonView";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../common/card/Card";
import Modal from "../../../common/modal/modal";

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
  name: ad.name || "",
  code: ad.code || "",
  ad_type: ad.ad_type || "banner",
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
const ageRangeOptions = ["18-24", "25-34", "35-44", "45-54", "55+"].map(
  (r) => ({
    label: r,
    value: r,
  })
);
const interestOptions = ["Tech", "Finance", "Travel", "Fitness", "Gaming"].map(
  (i) => ({
    label: i,
    value: i.toLowerCase(),
  })
);
const geoOptions = ["US", "UK", "CA", "IN", "AU"].map((g) => ({
  label: g,
  value: g,
}));

const contentTypeOptions = {
  banner: [
    { value: "url", label: "Image URL" },
    { value: "custom_image", label: "Upload Image" },
  ],
  video: [
    { value: "url", label: "YouTube URL" },
    { value: "custom_video", label: "Upload Video" },
  ],
};

const densityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const formatOptions = [
  { value: "banner", label: "Banner" },
  { value: "responsive", label: "Responsive" },
  { value: "native", label: "Native" },
];

const pageOptions = [
  { value: "all", label: "All Pages" },
  { value: "home", label: "Home Page" },
  { value: "posts", label: "Blog Posts" },
];

const AdSenseManagerView = ({
  publisherId,
  adClient,
  placements,
  adDensity,
  adFormat,
  targetPages,
  adUnits,
  loading,
  error,
  onSaveAdSenseSettings,
  onUpdatePlacement,
  onAddCustomAd,
  onUpdateCustomAd,
  onDeleteAdUnit,
  onSaveAdSettings,
}) => {
  const [editingAd, setEditingAd] = useState(null);
  const [previewAd, setPreviewAd] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [formData, setFormData] = useState(normalizeAdData({}));
  const [errors, setErrors] = useState({});
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    content: true,
    targeting: true,
    schedule: true,
  });

  const defaultAd = useMemo(
    () => ({
      name: "",
      code: "",
      ad_type: "banner",
      placement: "header",
      custom_content: {},
      dimensions: { width: 0, height: 0 },
      is_active: true,
      target_pages: [],
      target_audience: {},
      schedule: {},
      priority: 0,
    }),
    []
  );

  useEffect(() => {
    // Set default tab to adsense on initial load
    setActiveTab("adsense");
  }, []);


  useEffect(() => {
 console.log("active tab is",activeTab)
  }, [activeTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (newTab !== "create") {
      setEditingAd(null);
      setFormData(normalizeAdData({}));
    } else {
      setFormData(
        editingAd ? normalizeAdData(editingAd) : normalizeAdData(defaultAd)
      );
    }
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
      formData.ad_type === "banner" &&
      formData.custom_content.content_type === "url" &&
      !formData.custom_content.image_url
    ) {
      newErrors.image_url = "Image URL is required for banner ads";
    }
    if (
      formData.ad_type === "banner" &&
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
      newErrors.custom_content =
        "At least one of HTML, CSS, or JS is required for custom ads";
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

  const handleSaveAd = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

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
      status: formData.status,
      custom_file_id: formData.custom_file_id,
      custom_content: formData.custom_content,
    };

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
      editingAd
        ? onUpdateCustomAd(formDataToSend)
        : onAddCustomAd(formDataToSend);
    } else {
      editingAd ? onUpdateCustomAd(dataToSend) : onAddCustomAd(dataToSend);
    }

    setEditingAd(null);
    setFormData(normalizeAdData({}));
    setActiveTab("custom");
  };

  const handleOpenPreview = (ad) => {
    setPreviewAd(ad);
  };

  const handleClosePreview = () => {
    setPreviewAd(null);
  };

  const handleEditAd = (ad) => {
    setEditingAd(ad);
    setFormData(normalizeAdData(ad));
    setActiveTab("create");
  };

  const handleAddCustomAd = () => {
    setEditingAd(null);
    setFormData(normalizeAdData(defaultAd));
    setActiveTab("create");
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };


  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
    onSearchChange(query);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="min-h-screen bg-gray-50 px-0 py-0 space-y-6">

<div className="flex-1 flex flex-col">

   <TopNavbar
            userData={sampleUserData}
            onSearch={handleSearch}
            notificationCount={3}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />


<main className="w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Ad Management
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Configure and optimize your ad units to maximize revenue while
          maintaining user experience.
        </p>
     

      

      {!loading && (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-2 w-full">
            <TabsTrigger
              value="adsense"
              className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
            >
              AdSense
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
            >
              Custom Ads
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
            >
              Create Ad
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-sm sm:text-base py-2 text-gray-700 dark:text-gray-200 data-[state=active]:bg-white data-[state=active]:dark:bg-gray-700 data-[state=active]:shadow-sm rounded-md"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="adsense" className="mt-6 space-y-6">
            <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">AdSense Account</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Connect your Google AdSense account to start monetizing your
                  blog.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Publisher ID"
                  value={publisherId}
                  onChange={(e) =>
                    onSaveAdSenseSettings({
                      publisherId: e.target.value,
                      adClient,
                    })
                  }
                  placeholder="e.g., pub-1234567890123456"
                  className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
                <Input
                  label="Ad Client"
                  value={adClient}
                  onChange={(e) =>
                    onSaveAdSenseSettings({
                      publisherId,
                      adClient: e.target.value,
                    })
                  }
                  placeholder="e.g., ca-pub-1234567890123456"
                  className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                />
                <Button
                  onClick={() =>
                    onSaveAdSenseSettings({ publisherId, adClient })
                  }
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                >
                  Save AdSense Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Custom Advertisements</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage direct advertiser relationships and custom ad banners.
                </p>
              </CardHeader>
              <CardContent>
                {adUnits?.length === 0 ? (
                  <div className="text-center py-6 space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                      No custom ads configured
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Create custom ad units for direct advertisers or
                      promotional content.
                    </p>
                    <Button
                      onClick={handleAddCustomAd}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Ad
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {adUnits?.map((ad) => (
                      <div
                        key={ad.id}
                        className="border-b py-4 flex flex-col sm:flex-row sm:items-center justify-between dark:border-gray-700 gap-4"
                      >
                        <div>
                          <h4 className="text-base font-medium text-gray-800 dark:text-gray-100">
                            {ad.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Type: {ad.ad_type} | Placement: {ad.placement} |
                            Priority: {ad.priority}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant="outline"
                            onClick={() => handleEditAd(ad)}
                            className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => onDeleteAdUnit(ad.id)}
                            className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleOpenPreview(ad)}
                            className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={handleAddCustomAd}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Ad
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2 space-y-6">
                <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">
                      {editingAd ? "Edit Ad" : "Create New Ad"}
                    </CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Configure your custom ad unit with detailed settings and
                      preview it in real-time.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* General Settings */}
                    <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader
                        className="flex justify-between items-center cursor-pointer py-3"
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                              label="Ad Name"
                              value={formData.name}
                              onChange={(e) =>
                                handleChange("name", e.target.value)
                              }
                              error={errors.name}
                              name="name"
                              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            />
                            <Input
                              label="Ad Code"
                              value={formData.code}
                              onChange={(e) =>
                                handleChange("code", e.target.value)
                              }
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
                              onChange={(value) => {
                                handleChange("ad_type", value);
                                handleCustomContentChange(
                                  "content_type",
                                  contentTypeOptions[value]?.[0]?.value ||
                                    "url"
                                );
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
                              onChange={(value) =>
                                handleChange("placement", value)
                              }
                              name="placement"
                              className="dark:bg-gray-700 dark:text-gray-100"
                            />
                            <Input
                              label="Width (px)"
                              type="number"
                              value={formData.dimensions.width}
                              onChange={(e) =>
                                handleNestedChange(
                                  "dimensions",
                                  "width",
                                  Number(e.target.value)
                                )
                              }
                              error={errors.dimensions}
                              name="dimensions_width"
                              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            />
                            <Input
                              label="Height (px)"
                              type="number"
                              value={formData.dimensions.height}
                              onChange={(e) =>
                                handleNestedChange(
                                  "dimensions",
                                  "height",
                                  Number(e.target.value)
                                )
                              }
                              error={errors.dimensions}
                              name="dimensions_height"
                              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            />
                            <Input
                              label="Priority"
                              type="number"
                              value={formData.priority}
                              onChange={(e) =>
                                handleChange(
                                  "priority",
                                  Number(e.target.value)
                                )
                              }
                              name="priority"
                              className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={formData.is_active}
                                onChange={(e) =>
                                  handleChange("is_active", e.target.checked)
                                }
                                name="is_active"
                                className="dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label className="text-sm text-gray-700 dark:text-gray-300">
                                Active
                              </label>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>

                    {/* Content Settings */}
                    <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader
                        className="flex justify-between items-center cursor-pointer py-3"
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
                          {(formData.ad_type === "banner" ||
                            formData.ad_type === "video") && (
                            <Select
                              label="Content Type"
                              options={
                                contentTypeOptions[formData.ad_type] || []
                              }
                              value={formData.custom_content.content_type}
                              onChange={(value) => {
                                handleCustomContentChange(
                                  "content_type",
                                  value
                                );
                                handleCustomContentChange("image_url", "");
                                handleCustomContentChange("youtube_url", "");
                                handleChange("file", null);
                              }}
                              name="content_type"
                              className="dark:bg-gray-700 dark:text-gray-100"
                            />
                          )}
                          {formData.ad_type === "banner" &&
                            formData.custom_content.content_type ===
                              "url" && (
                              <Input
                                label="Image URL"
                                value={formData.custom_content.image_url}
                                onChange={(e) =>
                                  handleCustomContentChange(
                                    "image_url",
                                    e.target.value
                                  )
                                }
                                error={errors.image_url}
                                name="image_url"
                                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                              />
                            )}
                          {formData.ad_type === "banner" &&
                            formData.custom_content.content_type ===
                              "custom_image" && (
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
                          {formData.ad_type === "video" &&
                            formData.custom_content.content_type ===
                              "url" && (
                              <Input
                                label="YouTube URL"
                                value={formData.custom_content.youtube_url}
                                onChange={(e) =>
                                  handleCustomContentChange(
                                    "youtube_url",
                                    e.target.value
                                  )
                                }
                                error={errors.youtube_url}
                                name="youtube_url"
                                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                              />
                            )}
                          {formData.ad_type === "video" &&
                            formData.custom_content.content_type ===
                              "custom_video" && (
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
                              onChange={(e) =>
                                handleCustomContentChange(
                                  "text",
                                  e.target.value
                                )
                              }
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
                                onChange={(e) =>
                                  handleCustomContentChange(
                                    "html",
                                    e.target.value
                                  )
                                }
                                error={errors.custom_content}
                                name="html"
                                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
                              />
                              <Textarea
                                label="CSS"
                                value={formData.custom_content.css}
                                onChange={(e) =>
                                  handleCustomContentChange(
                                    "css",
                                    e.target.value
                                  )
                                }
                                name="css"
                                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
                              />
                              <Textarea
                                label="JS"
                                value={formData.custom_content.js}
                                onChange={(e) =>
                                  handleCustomContentChange(
                                    "js",
                                    e.target.value
                                  )
                                }
                                name="js"
                                className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 min-h-[100px]"
                              />
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>

                    {/* Targeting Settings */}
                    <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader
                        className="flex justify-between items-center cursor-pointer py-3"
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select
                              label="Page Match Type"
                              value={formData.target_pages.match_type}
                              options={matchTypeOptions}
                              onChange={(val) =>
                                handleNestedChange(
                                  "target_pages",
                                  "match_type",
                                  val
                                )
                              }
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
                              onChange={(val) =>
                                handleNestedChange(
                                  "target_audience",
                                  "device",
                                  val
                                )
                              }
                              name="device"
                              className="dark:bg-gray-700 dark:text-gray-100"
                            />
                            <Select
                              label="Age Range"
                              isMulti
                              value={formData.target_audience.age_range}
                              options={ageRangeOptions}
                              onChange={(val) =>
                                handleNestedChange(
                                  "target_audience",
                                  "age_range",
                                  val
                                )
                              }
                              name="age_range"
                              className="dark:bg-gray-700 dark:text-gray-100"
                            />
                            <Select
                              label="Interests"
                              isMulti
                              value={formData.target_audience.interests}
                              options={interestOptions}
                              onChange={(val) =>
                                handleNestedChange(
                                  "target_audience",
                                  "interests",
                                  val
                                )
                              }
                              name="interests"
                              className="dark:bg-gray-700 dark:text-gray-100"
                            />
                            <Select
                              label="Geo"
                              isMulti
                              value={formData.target_audience.geo}
                              options={geoOptions}
                              onChange={(val) =>
                                handleNestedChange(
                                  "target_audience",
                                  "geo",
                                  val
                                )
                              }
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
                        className="flex justify-between items-center cursor-pointer py-3"
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DateTimePicker
                              label="Start Time"
                              value={formData.schedule.start}
                              onChange={(val) =>
                                handleNestedChange("schedule", "start", val)
                              }
                              error={errors.schedule}
                              name="start"
                              className="dark:bg-gray-700 dark:text-gray-100"
                            />
                            <DateTimePicker
                              label="End Time"
                              value={formData.schedule.end}
                              onChange={(val) =>
                                handleNestedChange("schedule", "end", val)
                              }
                              error={errors.schedule}
                              name="end"
                              className="dark:bg-gray-700 dark:text-gray-100"
                            />
                            <Input
                              label="Timezone"
                              value={formData.schedule.timezone}
                              onChange={(e) =>
                                handleNestedChange(
                                  "schedule",
                                  "timezone",
                                  e.target.value
                                )
                              }
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
                        type="button"
                        onClick={handleSaveAd}
                        variant="outline"
                        className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                      >
                        {formData.id ? "Update Ad" : "Create Ad"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview Pane */}
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
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Ad Settings</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Configure global ad settings and preferences.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Select
                    label="Ad Density"
                    options={densityOptions}
                    value={adDensity}
                    onChange={(value) =>
                      onSaveAdSettings({
                        adDensity: value,
                        adFormat,
                        targetPages,
                      })
                    }
                    className="dark:bg-gray-700 dark:text-gray-100"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Controls how many ads are shown throughout your blog.
                  </p>
                </div>
                <Select
                  label="Preferred Ad Format"
                  options={formatOptions}
                  value={adFormat}
                  onChange={(value) =>
                    onSaveAdSettings({
                      adDensity,
                      adFormat: value,
                      targetPages,
                    })
                  }
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
                <Select
                  label="Pages to Show Ads"
                  options={pageOptions}
                  value={targetPages}
                  onChange={(value) =>
                    onSaveAdSettings({
                      adDensity,
                      adFormat,
                      targetPages: value,
                    })
                  }
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
                <Button
                  onClick={() =>
                    onSaveAdSettings({ adDensity, adFormat, targetPages })
                  }
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                >
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

</main>
</div>

      <Modal
        isOpen={!!previewAd}
        onClose={handleClosePreview}
        title="Ad Preview"
        className="dark:bg-gray-800 dark:text-gray-100 max-w-2xl"
      >
        <div className="space-y-4">
          <AdPreview ad={previewAd} />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-300">Ad Name:</p>
              <p className="text-gray-800 dark:text-gray-100">{previewAd?.name}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Type:</p>
              <p className="text-gray-800 dark:text-gray-100">{previewAd?.ad_type}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Placement:</p>
              <p className="text-gray-800 dark:text-gray-100">{previewAd?.placement}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Status:</p>
              <p className="text-gray-800 dark:text-gray-100">
                {previewAd?.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </Modal>

      
    </div>
  );
};

export default AdSenseManagerView;
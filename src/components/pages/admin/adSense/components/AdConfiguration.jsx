import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../common/card/Card";
import Input from "../../../../controls/input/inputView";
import Select from "../../../../controls/selection/selection";
import Button from "../../../../controls/button/buttonView";
import { adSenseConstants } from "../adSenseConstants";

const AdConfiguration = ({
  publisherId,
  adClient,
  adDensity,
  adFormat,
  targetPages,
  onSaveAdSettings,
}) => {
  const [localPublisherId, setLocalPublisherId] = useState(publisherId || "");
  const [localAdClient, setLocalAdClient] = useState(adClient || "");
  const [localAdDensity, setLocalAdDensity] = useState(adDensity || "balanced");
  const [localAdFormat, setLocalAdFormat] = useState(adFormat || "responsive");
  const [localTargetPages, setLocalTargetPages] = useState(targetPages || "all");
  const [configErrors, setConfigErrors] = useState({});

  useEffect(() => {
    setLocalPublisherId(publisherId || "");
    setLocalAdClient(adClient || "");
    setLocalAdDensity(adDensity || "balanced");
    setLocalAdFormat(adFormat || "responsive");
    setLocalTargetPages(targetPages || "all");
    setConfigErrors({});
  }, [publisherId, adClient, adDensity, adFormat, targetPages]);

  const validateConfiguration = () => {
    const newErrors = {};
    if (!localPublisherId) newErrors.publisherId = "Publisher ID is required";
    if (!localAdClient) newErrors.adClient = "Ad Client is required";
    if (!localAdDensity) newErrors.adDensity = "Ad density is required";
    if (!["low", "balanced", "high"].includes(localAdDensity)) {
      newErrors.adDensity = "Ad density must be low, balanced, or high";
    }
    if (!localAdFormat) newErrors.adFormat = "Ad format is required";
    if (!localTargetPages) newErrors.targetPages = "Target pages is required";
    setConfigErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveConfiguration = () => {
    if (!validateConfiguration()) return;
    onSaveAdSettings({
      publisher_id: localPublisherId,
      ad_client: localAdClient,
      ad_density: localAdDensity,
      ad_format: localAdFormat,
      target_pages: localTargetPages,
    });
  };

  return (
    <Card className="shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Ad Configuration</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Configure your AdSense account and global ad settings.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
            AdSense Account
          </h3>
          <Input
            label="Publisher ID"
            value={localPublisherId}
            onChange={(e) => setLocalPublisherId(e.target.value)}
            placeholder="e.g., pub-1234567890123456"
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            error={configErrors.publisherId}
          />
          <Input
            label="Ad Client"
            value={localAdClient}
            onChange={(e) => setLocalAdClient(e.target.value)}
            placeholder="e.g., ca-pub-1234567890123456"
            className="dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            error={configErrors.adClient}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
            Global Ad Settings
          </h3>
          <div className="space-y-2">
            <Select
              label="Ad Density"
              options={adSenseConstants.densityOptions}
              value={localAdDensity}
              onChange={(value) => setLocalAdDensity(value)}
              className="dark:bg-gray-700 dark:text-gray-100"
              error={configErrors.adDensity}
            />
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Controls how many ads are shown throughout your blog.
            </p>
          </div>
          <Select
            label="Preferred Ad Format"
            options={adSenseConstants.formatOptions}
            value={localAdFormat}
            onChange={(value) => setLocalAdFormat(value)}
            className="dark:bg-gray-700 dark:text-gray-100"
            error={configErrors.adFormat}
          />
          <Select
            label="Pages to Show Ads"
            options={adSenseConstants.pageOptions}
            value={localTargetPages}
            onChange={(value) => setLocalTargetPages(value)}
            className="dark:bg-gray-700 dark:text-gray-100"
            error={configErrors.targetPages}
          />
        </div>
        <Button
          onClick={handleSaveConfiguration}
          variant="outline"
          className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
        >
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdConfiguration;
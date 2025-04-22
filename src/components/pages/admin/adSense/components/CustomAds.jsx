import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../common/card/Card";
import Button from "../../../../controls/button/buttonView";
import { Plus, Trash2, Eye } from "lucide-react";

const CustomAds = ({ adUnits, onAddCustomAd, onEditAd, onDeleteAdUnit, onOpenPreview }) => {
  return (
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
              Create custom ad units for direct advertisers or promotional content.
            </p>
            <Button
              onClick={onAddCustomAd}
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
                    Type: {ad.ad_type} | Placement: {ad.placement} | Priority: {ad.priority}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => onEditAd(ad)}
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
                    onClick={() => onOpenPreview(ad)}
                    className="border-gray-300 dark:border-gray-600 dark:text-gray-100"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              onClick={onAddCustomAd}
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
  );
};

export default CustomAds;
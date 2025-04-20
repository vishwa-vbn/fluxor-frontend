import React, { useState, useMemo } from 'react';
import { Plus,Eye,Trash2} from 'lucide-react';
import AdBanner from '../../../common/adBanner/adBanner';
import AdForm from '../../../common/adForm/adForm';
import AdPreview from '../../../common/adPreview/adPreview';
import { Card, CardHeader, CardTitle, CardContent } from '../../../common/card/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../common/tabs/Tabs';
import Modal from '../../../common/modal/modal';
import Input from '../../../controls/input/inputView';
import Button from '../../../controls/button/buttonView';
import Select from '../../../controls/selection/selection';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [previewAd, setPreviewAd] = useState(null);

  const modalSize = editingAd ? 'lg' : 'medium';

  const defaultAd = useMemo(
    () => ({
      name: '',
      code: '',
      ad_type: 'banner',
      placement: 'header',
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

  const densityOptions = [
    { value: 'low', label: 'Low (User-friendly)' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'high', label: 'High (Revenue-focused)' },
  ];

  const formatOptions = [
    { value: 'responsive', label: 'Responsive' },
    { value: 'display', label: 'Display' },
    { value: 'text', label: 'Text' },
    { value: 'mixed', label: 'Mixed' },
  ];

  const pageOptions = [
    { value: 'all', label: 'All Pages' },
    { value: 'posts', label: 'Posts Only' },
    { value: 'homepage', label: 'Homepage Only' },
    { value: 'custom', label: 'Custom Selection' },
  ];

  const handleOpenModal = (ad = null) => {
    setEditingAd(ad);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingAd(null);
    setIsModalOpen(false);
  };

  const handleSaveAd = (ad) => {
    if (editingAd) {
      onUpdateCustomAd(ad);
    } else {
      onAddCustomAd(ad);
    }
    handleCloseModal();
  };

  const handleOpenPreview = (ad) => {
    setPreviewAd(ad);
  };

  const handleClosePreview = () => {
    setPreviewAd(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Ad Management
        </h1>
        <p className="text-gray-600 mt-2">
          Configure and optimize your ad units to maximize revenue while
          maintaining user experience.
        </p>
      </div>

      {loading && (
        <div className="text-center py-6">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}

      {!loading && (
        <Tabs defaultValue="adsense">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="adsense" className="flex-1">
              AdSense
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">
              Custom Ads
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="adsense" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AdSense Account</CardTitle>
                <p className="text-gray-600 text-sm">
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
                />
                <Button
                  onClick={() =>
                    onSaveAdSenseSettings({ publisherId, adClient })
                  }
                >
                  Save AdSense Settings
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ad Placements</CardTitle>
                  <p className="text-gray-600 text-sm">
                    Configure where ads will appear on your blog.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['header', 'sidebar', 'in_content', 'footer'].map(
                    (placement) => (
                      <div
                        key={placement}
                        className="flex items-center justify-between border-b pb-3 last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800">
                            {placement
                              .replace('_', ' ')
                              .replace(/\b\w/g, (c) => c.toUpperCase())}{' '}
                            Ad
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={placements.includes(placement)}
                            onChange={(e) =>
                              onUpdatePlacement(placement, e.target.checked)
                            }
                          />
                          <Button
                            variant="ghost"
                            size="mini"
                            onClick={() =>
                              handleOpenPreview(
                                adUnits.find((ad) => ad.placement === placement)
                              )
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ad Preview</CardTitle>
                  <p className="text-gray-600 text-sm">
                    Preview how your ads will look on your blog.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Array.isArray(adUnits) && adUnits.length > 0 ? (
                    adUnits.slice(0, 3).map((ad) => (
                      <div key={ad.id}>
                        <label className="block mb-2 text-sm text-gray-700">
                          {ad.name} ({ad.ad_type})
                        </label>
                        <AdBanner ad={ad} />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No ads to preview.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Advertisements</CardTitle>
                <p className="text-gray-600 text-sm">
                  Manage direct advertiser relationships and custom ad banners.
                </p>
              </CardHeader>
              <CardContent>
                {adUnits?.length === 0 ? (
                  <div className="text-center py-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      No custom ads configured
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Create custom ad units for direct advertisers or
                      promotional content.
                    </p>
                    <Button onClick={() => handleOpenModal()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Ad
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {adUnits?.map((ad) => (
                      <div
                        key={ad.id}
                        className="border-b pb-4 flex items-center justify-between"
                      >
                        <div>
                          <h4 className="text-gray-800">{ad.name}</h4>
                          <p className="text-gray-600 text-sm">
                            Type: {ad.ad_type} | Placement: {ad.placement} |{' '}
                            Priority: {ad.priority}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleOpenModal(ad)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => onDeleteAdUnit(ad.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleOpenPreview(ad)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button onClick={() => handleOpenModal()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Ad
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Ad Settings</CardTitle>
                <p className="text-gray-600 text-sm">
                  Configure global ad settings and preferences.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
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
                  />
                  <p className="text-xs text-gray-600">
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
                />
                <Button
                  onClick={() =>
                    onSaveAdSettings({ adDensity, adFormat, targetPages })
                  }
                >
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAd ? 'Edit Ad' : 'Add New Ad'}
        size={modalSize}
      >
        <AdForm
          ad={editingAd || defaultAd}
          onSave={handleSaveAd}
          onCancel={handleCloseModal}
        />
      </Modal>

      <Modal
        isOpen={!!previewAd}
        onClose={handleClosePreview}
        title="Ad Preview"
      >
        <AdPreview ad={previewAd} />
      </Modal>
    </div>
  );
};

export default AdSenseManagerView;
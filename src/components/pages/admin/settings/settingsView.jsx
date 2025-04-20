import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../common/tabs/Tabs';
import { Card, CardHeader, CardContent } from '../../../common/card/Card';
import Input from '../../../controls/input/inputView';
import Button from '../../../controls/button/buttonView';
import Switch from '../../../controls/switch/switch';
import TopNavbar from "../../../common/topNavbar/topNavbar";


const SettingsView = ({
  formData,
  isLoading,
  onInputChange,
  onSwitchChange,
  onSelectorChange,
  onSave,
  onReset,
  onClearCache,
  onExport,
  activeTab, // New prop to track active tab
  onTabChange, // New prop to handle tab changes
}) => {


  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
    onSearchChange({ target: { value: query } });
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

<main className="flex-1 w-full mx-auto px-6 py-3 space-y-8">


        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Manage your blog settings and preferences.</p>

      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Site Information</h2>
              <p className="text-gray-500">Basic information about your blog</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="site_name" className="text-gray-700 font-medium">
                    Site Name
                  </label>
                  <Input
                    id="site_name"
                    value={formData?.general?.site_name ?? ''}
                    onChange={(e) => onInputChange('general', 'site_name', e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="site_url" className="text-gray-700 font-medium">
                    Site URL
                  </label>
                  <Input
                    id="site_url"
                    value={formData?.general?.site_url ?? ''}
                    onChange={(e) => onInputChange('general', 'site_url', e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="site_description" className="text-gray-700 font-medium">
                  Site Description
                </label>
                <textarea
                  id="site_description"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                  value={formData?.general?.site_description ?? ''}
                  onChange={(e) => onInputChange('general', 'site_description', e.target.value)}
                  disabled={isLoading}
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenance_mode"
                  checked={formData?.general?.maintenance_mode ?? false}
                  onChange={(checked) => onSwitchChange('general', 'maintenance_mode', checked)}
                  disabled={isLoading}
                />
                <label htmlFor="maintenance_mode" className="text-gray-700 font-medium">
                  Enable Maintenance Mode
                </label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Content Settings</h2>
              <p className="text-gray-500">Configure how your content is displayed</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="posts_per_page" className="text-gray-700 font-medium">
                    Posts Per Page
                  </label>
                  <Input
                    id="posts_per_page"
                    type="number"
                    value={formData?.general?.posts_per_page ?? ''}
                    onChange={(e) => onInputChange('general', 'posts_per_page', parseInt(e.target.value))}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="excerpt_length" className="text-gray-700 font-medium">
                    Excerpt Length (words)
                  </label>
                  <Input
                    id="excerpt_length"
                    type="number"
                    value={formData?.general?.excerpt_length ?? ''}
                    onChange={(e) => onInputChange('general', 'excerpt_length', parseInt(e.target.value))}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="comments_enabled"
                  checked={formData?.general?.comments_enabled ?? false}
                  onChange={(checked) => onSwitchChange('general', 'comments_enabled', checked)}
                  disabled={isLoading}
                />
                <label htmlFor="comments_enabled" className="text-gray-700 font-medium">
                  Enable Comments
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="moderate_comments"
                  checked={formData?.general?.moderate_comments ?? false}
                  onChange={(checked) => onSwitchChange('general', 'moderate_comments', checked)}
                  disabled={isLoading}
                />
                <label htmlFor="moderate_comments" className="text-gray-700 font-medium">
                  Moderate Comments Before Publishing
                </label>
              </div>
            </CardContent>
          </Card>
          {/* Optional: Add tab-specific save button */}
          <div className="flex justify-end">
            <Button onClick={() => onSave('general')} disabled={isLoading}>
              Save General Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Theme Settings</h2>
              <p className="text-gray-500">Customize your blog's appearance</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="color_scheme" className="text-gray-700 font-medium">
                  Color Scheme
                </label>
                <select
                  id="color_scheme"
                  value={formData?.appearance?.color_scheme ?? 'light'}
                  onChange={(e) => onSelectorChange('appearance', 'color_scheme', e.target.value)}
                  disabled={isLoading}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="primary_color" className="text-gray-700 font-medium">
                  Primary Color
                </label>
                <select
                  id="primary_color"
                  value={formData?.appearance?.primary_color ?? 'blue'}
                  onChange={(e) => onSelectorChange('appearance', 'primary_color', e.target.value)}
                  disabled={isLoading}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="red">Red</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="font_family" className="text-gray-700 font-medium">
                  Font Family
                </label>
                <select
                  id="font_family"
                  value={formData?.appearance?.font_family ?? 'inter'}
                  onChange={(e) => onSelectorChange('appearance', 'font_family', e.target.value)}
                  disabled={isLoading}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                >
                  <option value="inter">Inter</option>
                  <option value="roboto">Roboto</option>
                  <option value="lato">Lato</option>
                  <option value="montserrat">Montserrat</option>
                  <option value="merriweather">Merriweather</option>
                </select>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Layout Settings</h2>
              <p className="text-gray-500">Configure your blog's layout structure</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="show_sidebar" className="text-gray-700 font-medium">
                    Show Sidebar
                  </label>
                  <p className="text-sm text-gray-500">Display the sidebar on blog pages</p>
                </div>
                <Switch
                  id="show_sidebar"
                  checked={formData?.appearance?.show_sidebar ?? false}
                  onChange={(checked) => onSwitchChange('appearance', 'show_sidebar', checked)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="show_related" className="text-gray-700 font-medium">
                    Show Related Posts
                  </label>
                  <p className="text-sm text-gray-500">Display related posts at the end of articles</p>
                </div>
                <Switch
                  id="show_related"
                  checked={formData?.appearance?.show_related ?? false}
                  onChange={(checked) => onSwitchChange('appearance', 'show_related', checked)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="show_author" className="text-gray-700 font-medium">
                    Show Author Info
                  </label>
                  <p className="text-sm text-gray-500">Display author information at the end of articles</p>
                </div>
                <Switch
                  id="show_author"
                  checked={formData?.appearance?.show_author ?? false}
                  onChange={(checked) => onSwitchChange('appearance', 'show_author', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
          {/* Optional: Add tab-specific save button */}
          <div className="flex justify-end">
            <Button onClick={() => onSave('appearance')} disabled={isLoading}>
              Save Appearance Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">SEO Settings</h2>
              <p className="text-gray-500">Optimize your blog for search engines</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="meta_title" className="text-gray-700 font-medium">
                  Default Meta Title
                </label>
                <Input
                  id="meta_title"
                  value={formData?.seo?.meta_title ?? ''}
                  onChange={(e) => onInputChange('seo', 'meta_title', e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">Recommended length: 50-60 characters</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="meta_description" className="text-gray-700 font-medium">
                  Default Meta Description
                </label>
                <textarea
                  id="meta_description"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                  value={formData?.seo?.meta_description ?? ''}
                  onChange={(e) => onInputChange('seo', 'meta_description', e.target.value)}
                  disabled={isLoading}
                  rows={4}
                />
                <p className="text-xs text-gray-500">Recommended length: 150-160 characters</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="canonical_url" className="text-gray-700 font-medium">
                  Canonical URL Format
                </label>
                <Input
                  id="canonical_url"
                  value={formData?.seo?.canonical_url ?? ''}
                  onChange={(e) => onInputChange('seo', 'canonical_url', e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="enable_robots" className="text-gray-700 font-medium">
                    Enable robots.txt
                  </label>
                  <p className="text-sm text-gray-500">Allow search engines to crawl your site</p>
                </div>
                <Switch
                  id="enable_robots"
                  checked={formData?.seo?.enable_robots ?? false}
                  onChange={(checked) => onSwitchChange('seo', 'enable_robots', checked)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="enable_sitemap" className="text-gray-700 font-medium">
                    Generate XML Sitemap
                  </label>
                  <p className="text-sm text-gray-500">Create a sitemap for search engines</p>
                </div>
                <Switch
                  id="enable_sitemap"
                  checked={formData?.seo?.enable_sitemap ?? false}
                  onChange={(checked) => onSwitchChange('seo', 'enable_sitemap', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Social Media Integration</h2>
              <p className="text-gray-500">Configure social sharing metadata</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="og_title" className="text-gray-700 font-medium">
                  Default Open Graph Title
                </label>
                <Input
                  id="og_title"
                  value={formData?.seo?.og_title ?? ''}
                  onChange={(e) => onInputChange('seo', 'og_title', e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="og_description" className="text-gray-700 font-medium">
                  Default Open Graph Description
                </label>
                <textarea
                  id="og_description"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                  value={formData?.seo?.og_description ?? ''}
                  onChange={(e) => onInputChange('seo', 'og_description', e.target.value)}
                  disabled={isLoading}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="og_image" className="text-gray-700 font-medium">
                  Default Open Graph Image URL
                </label>
                <Input
                  id="og_image"
                  value={formData?.seo?.og_image ?? ''}
                  onChange={(e) => onInputChange('seo', 'og_image', e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
          {/* Optional: Add tab-specific save button */}
          <div className="flex justify-end">
            <Button onClick={() => onSave('seo')} disabled={isLoading}>
              Save SEO Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Advanced Settings</h2>
              <p className="text-gray-500">Advanced configuration options</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="custom_css" className="text-gray-700 font-medium">
                  Custom CSS
                </label>
                <textarea
                  id="custom_css"
                  className="font-mono text-sm w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                  value={formData?.advanced?.custom_css ?? ''}
                  onChange={(e) => onInputChange('advanced', 'custom_css', e.target.value)}
                  rows={6}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="header_scripts" className="text-gray-700 font-medium">
                  Header Scripts
                </label>
                <textarea
                  id="header_scripts"
                  className="font-mono text-sm w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                  value={formData?.advanced?.header_scripts ?? ''}
                  onChange={(e) => onInputChange('advanced', 'header_scripts', e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">These scripts will be added to the &lt;head&gt; section of all pages.</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="footer_scripts" className="text-gray-700 font-medium">
                  Footer Scripts
                </label>
                <textarea
                  id="footer_scripts"
                  className="font-mono text-sm w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
                  value={formData?.advanced?.footer_scripts ?? ''}
                  onChange={(e) => onInputChange('advanced', 'footer_scripts', e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">These scripts will be added just before the closing &lt;/body&gt; tag.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label htmlFor="enable_cache" className="text-gray-700 font-medium">
                      Enable Page Caching
                    </label>
                    <p className="text-sm text-gray-500">Cache pages to improve loading times</p>
                  </div>
                  <Switch
                    id="enable_cache"
                    checked={formData?.advanced?.enable_cache ?? false}
                    onChange={(checked) => onSwitchChange('advanced', 'enable_cache', checked)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cache_duration" className="text-gray-700 font-medium">
                    Cache Duration (minutes)
                  </label>
                  <Input
                    id="cache_duration"
                    type="number"
                    value={formData?.advanced?.cache_duration ?? ''}
                    onChange={(e) => onInputChange('advanced', 'cache_duration', parseInt(e.target.value))}
                    min="1"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="debug_mode" className="text-gray-700 font-medium">
                    Debug Mode
                  </label>
                  <p className="text-sm text-gray-500">Enable detailed error messages and logging</p>
                </div>
                <Switch
                  id="debug_mode"
                  checked={formData?.advanced?.debug_mode ?? false}
                  onChange={(checked) => onSwitchChange('advanced', 'debug_mode', checked)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-500">
            <CardHeader>
              <h2 className="text-xl font-semibold text-red-500">Danger Zone</h2>
              <p className="text-gray-500">Actions here can permanently affect your blog</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Reset Settings</h4>
                  <p className="text-sm text-gray-500">Reset all settings to default values</p>
                </div>
                <Button variant="outline" onClick={onReset} disabled={isLoading}>
                  Reset
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Clear All Cache</h4>
                  <p className="text-sm text-gray-500">Remove all cached data and files</p>
                </div>
                <Button variant="outline" onClick={onClearCache} disabled={isLoading}>
                  Clear Cache
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-500">Export Data</h4>
                  <p className="text-sm text-gray-500">Export all blog data as JSON</p>
                </div>
                <Button variant="outline" onClick={onExport} disabled={isLoading}>
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Optional: Add tab-specific save button */}
          <div className="flex justify-end">
            <Button onClick={() => onSave('advanced')} disabled={isLoading}>
              Save Advanced Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>

     
    </main>
    </div>
    </div>

  );
};

export default SettingsView;
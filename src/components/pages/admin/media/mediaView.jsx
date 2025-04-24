import React, { useState, useMemo } from "react";
import { ArrowLeft, Folder, Upload, FolderPlus, Edit, Trash2 } from "lucide-react";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import { Card, CardContent } from "../../../common/card/Card";
import Input from "../../../controls/input/inputView";
import Button from "../../../controls/button/buttonView";
import Modal from "../../../common/modal/modal";

const MediaView = ({
  assets,
  folders,
  loading,
  currentPath,
  selectedFileId,
  onPathChange,
  onGoBack,
  onSelectFile,
  onOpenFolder,
  onUploadFile,
  onCreateFolder,
  onDeleteFile,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter assets based on search query
  const filteredAssets = useMemo(() => {
    if (!searchQuery) return assets;
    return assets.filter((asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [assets, searchQuery]);

  // Breadcrumbs rendering
  const renderBreadcrumbs = () => {
    const parts = currentPath.split("/").filter(Boolean);
    let path = "";
    return (
      <div className="flex items-center space-x-2 text-gray-500 text-sm">
        <span
          className="cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => onPathChange("/")}
        >
          Home
        </span>
        {parts.map((part, index) => {
          path += `/${part}`;
          return (
            <span key={index} className="flex items-center">
              <span className="mx-2">/</span>
              <span
                className="cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => onPathChange(path)}
              >
                {part}
              </span>
            </span>
          );
        })}
      </div>
    );
  };

  // Sample user data for TopNavbar
  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <TopNavbar
        userData={sampleUserData}
        onSearch={(query) => setSearchQuery(query)}
        notificationCount={3}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Media Manager</h1>
            {renderBreadcrumbs()}
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={onGoBack}
              disabled={currentPath === "/"}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload File
            </Button>
            <Button
              onClick={() => setShowCreateFolderModal(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <FolderPlus className="mr-2 h-4 w-4" /> Create Folder
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        ) : filteredAssets.length === 0 ? (
          <Card className="border-none">
            <CardContent className="p-8 text-center text-gray-500">
              No assets found.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAssets.map((asset) => (
              <Card
                key={asset.fileId || asset.folderId}
                className={`border-none hover:shadow-md transition-all duration-300 ${
                  selectedFileId === asset.fileId ? "ring-2 ring-blue-500" : ""
                }`}
                onDoubleClick={() =>
                  asset.type === "folder" && onOpenFolder(asset.folderPath)
                }
              >
                <CardContent className="p-6">
                  {asset.type === "folder" ? (
                    <div className="flex flex-col items-center">
                      <Folder size={64} className="text-yellow-500 mb-3" />
                      <p className="text-sm font-medium text-gray-700 truncate w-full text-center">
                        {asset.name}
                      </p>
                    </div>
                  ) : (
                    <div className="relative group">
                      <div className="aspect-w-16 aspect-h-9">
                        {asset.type === "video" ? (
                          <video
                            src={asset.url}
                            className="w-full h-48 object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-48 object-cover"
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100">
                        <Button
            variant="outline"

                          className="p-2 bg-white hover:bg-gray-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectFile(asset.fileId);
                          }}
                        >
                          <Edit className="h-5 w-5 text-blue-600" />
                        </Button>
                        <Button
            variant="outline"

                          className="p-2 bg-white hover:bg-gray-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFile(asset.fileId);
                          }}
                        >
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {asset.name}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        <Modal
          title="Upload File"
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSubmit={() => setShowUploadModal(false)}
        >
          <Input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => {
              onUploadFile(e.target.files[0]);
              setShowUploadModal(false);
            }}
            className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 flex justify-end space-x-3">
            <Button
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              Upload
            </Button>
          </div>
        </Modal>

        {/* Create Folder Modal */}
        <Modal
          title="Create Folder"
          isOpen={showCreateFolderModal}
          onClose={() => setShowCreateFolderModal(false)}
          onSubmit={() => setShowCreateFolderModal(false)}
        >
          <Input
            placeholder="Folder Name"
            onChange={(e) => onCreateFolder(e.target.value)}
            className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-4 flex justify-end space-x-3">
            <Button
            variant="outline"
              onClick={() => setShowCreateFolderModal(false)}
              className="text-black"
            >
              Cancel
            </Button>
            <Button
            variant="outline"

              onClick={() => setShowCreateFolderModal(false)}
              className="text-black"
            >
              Create
            </Button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default MediaView;
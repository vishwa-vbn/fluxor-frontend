import React, { useState, useMemo } from "react";
import { ArrowLeft, Folder, Upload, FolderPlus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "../../../common/card/Card";
import Input from "../../../controls/input/inputView";
import Button from "../../../controls/button/buttonView";
import Modal from "../../../common/modal/modal";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import SearchBar from "../../../controls/searchbar/searchbar";
import "./MediaView.css";

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
      <div className="breadcrumbs flex items-center space-x-1 text-gray-600">
        {parts.map((part, index) => {
          path += `/${part}`;
          return (
            <span key={index} className="flex items-center">
              {index > 0 && <span className="mx-1">/</span>}
              <Button
                variant="ghost"
                className="text-sm hover:text-blue-600"
                onClick={() => onPathChange(path)}
              >
                {part}
              </Button>
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
    <div className="min-h-screen bg-gray-50 px-0 py-0 space-y-6">
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={(query) => setSearchQuery(query)}
          notificationCount={3}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-3 space-y-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">Media Manager</h1>
              {renderBreadcrumbs()}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={onGoBack}
                disabled={currentPath === "/"}
                className="flex items-center text-black"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(true)}
                className="flex items-center text-black"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload File
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateFolderModal(true)}
                className="flex items-center text-black"
              >
                <FolderPlus className="mr-2 h-4 w-4" /> Create Folder
              </Button>
            </div>
          </div>

          <div className="flex justify-end mb-2">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search assets..."
              className="w-full max-w-sm"
            />
          </div>

          {loading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredAssets.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No assets found.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAssets.map((asset) => (
                <Card
                  key={asset.fileId || asset.folderId}
                  className={`relative group cursor-pointer transition-shadow hover:shadow-lg ${
                    selectedFileId === asset.fileId ? "border-2 border-blue-500" : ""
                  }`}
                  onDoubleClick={() =>
                    asset.type === "folder" && onOpenFolder(asset.folderPath)
                  }
                >
                  <CardContent className="p-4">
                    {asset.type === "folder" ? (
                      <div className="flex flex-col items-center">
                        <Folder size={64} className="text-yellow-500 mb-2" />
                        <p className="text-sm text-gray-700 truncate w-full text-center">
                          {asset.name}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="relative w-full h-32">
                          <img
                            src={asset.url}
                            alt={asset.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 bg-white bg-opacity-80 hover:bg-opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectFile(asset.fileId);
                              }}
                            >
                              <Edit className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="p-2 bg-white bg-opacity-80 hover:bg-opacity-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteFile(asset.fileId);
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 truncate w-full text-center mt-2">
                          {asset.name}
                        </p>
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
              onChange={(e) => onUploadFile(e.target.files[0])}
              className="w-full"
            />
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
              className="w-full"
            />
          </Modal>
        </main>
      </div>
    </div>
  );
};

export default MediaView;
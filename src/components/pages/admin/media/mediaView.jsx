// import React, { useEffect, useMemo, useState } from "react";
// import { Folder, Upload, FolderPlus, Trash2, Image as ImageIcon, Video, Play, Eye } from "lucide-react";
// import TopNavbar from "../../../common/topNavbar/topNavbar";
// import Button from "../../../controls/button/buttonView";
// import Modal from "../../../common/modal/modal"; // Adjust the import path to match your project structure

// const MediaView = ({
//   assets = [],
//   loading = false,
//   currentPath = "/",
//   onGoBack = () => {},
//   onOpenFolder = () => {},
//   onUploadFile = () => {},
//   onCreateFolder = () => {},
//   onDeleteFile = () => {},
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);

//   const filteredFolders = useMemo(() => {
//     return assets.filter((asset) => asset.type === "folder");
//   }, [assets]);

//   useEffect(() => {
//     console.log("assets", assets);
//   }, [assets]);

//   const mediaAssets = useMemo(() => {
//     return assets.filter((asset) => asset.type !== "folder");
//   }, [assets]);

//   const renderAssetIcon = (asset) => {
//     if (asset.type === "folder") return <Folder size={20} className="text-yellow-400" />;
//     if (asset.fileType === "non-image") return <Video size={20} className="text-blue-400" />;
//     return <ImageIcon size={20} className="text-blue-400" />;
//   };

//   const getVideoThumbnail = (asset) => {
//     return asset.thumbnail || "/video-placeholder.png";
//   };

//   // Open modal with selected asset for preview
//   const handlePreview = (asset) => {
//     setSelectedAsset(asset);
//     setIsModalOpen(true);
//   };

//   // Close modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedAsset(null);
//   };

//   // Render preview content for modal
//   const renderPreviewContent = () => {
//     if (!selectedAsset) return null;

//     return selectedAsset.fileType === "non-image" ? (
//       <video
//         src={selectedAsset.url}
//         controls
//         className="w-full h-auto max-h-[50vh] object-contain"
//         autoPlay
//       >
//         <source src={selectedAsset.url} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     ) : (
//       <img
//         src={selectedAsset.url}
//         alt={selectedAsset.name}
//         className="w-full h-auto max-h-[50vh] object-contain"
//       />
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <TopNavbar
//         userData={{ name: "John Doe", email: "john@example.com" }}
//         onSearch={() => {}}
//         notificationCount={3}
//         title="Media"
//       />
//       <main className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-semibold text-gray-800">Media</h1>
//           <div className="flex space-x-2">
//             <Button
//               onClick={() => {
//                 document.getElementById("file-upload").click();
//               }}
//               className="p-2 flex items-center space-x-1 text-gray-600 hover:bg-gray-200 rounded-md"
//             >
//               <Upload size={16} />
//               <span className="text-sm">Upload</span>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*,video/*"
//                 className="hidden"
//                 onChange={(e) => {
//                   if (e.target.files[0]) {
//                     onUploadFile(e.target.files[0]);
//                   }
//                 }}
//               />
//             </Button>
//             <Button
//               onClick={() => {
//                 const folderName = prompt("Enter folder name:");
//                 if (folderName) onCreateFolder(folderName);
//               }}
//               className="p-2 flex items-center space-x-1 text-gray-600 hover:bg-gray-200 rounded-md"
//             >
//               <FolderPlus size={16} />
//               <span className="text-sm">Folder</span>
//             </Button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center p-8">
//             <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
//           </div>
//         ) : assets.length === 0 ? (
//           <div className="text-center text-gray-500 p-8">No assets found</div>
//         ) : (
//           <div>
//             {filteredFolders.length > 0 && (
//               <div className="mb-6">
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                   {filteredFolders.map((folder) => (
//                     <div
//                       key={folder.folderId}
//                       className="p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
//                       onDoubleClick={() => onOpenFolder(folder.folderPath)}
//                     >
//                       <div className="flex items-center space-x-2">
//                         {renderAssetIcon(folder)}
//                         <span className="text-sm text-gray-700 truncate">{folder.name}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {mediaAssets.length > 0 && (
//               <div>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//                   {mediaAssets.map((asset) => (
//                     <div
//                       key={asset.fileId}
//                       className="relative rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer"
//                     >
//                       <div className="relative aspect-square">
//                         {asset.fileType === "non-image" && asset.url ? (
//                           <div className="relative w-full h-full">
//                             <img
//                               src={getVideoThumbnail(asset)}
//                               alt="Video thumbnail"
//                               className="w-full h-full object-cover"
//                               onError={(e) => {
//                                 e.target.src = "/video-placeholder.png";
//                               }}
//                             />
//                             <div className="absolute inset-0 flex items-center justify-center">
//                               <Play size={32} className="text-white opacity-75" />
//                             </div>
//                             <video
//                               src={asset.url}
//                               className="w-full h-full object-cover hidden"
//                               muted
//                               loop
//                               preload="metadata"
//                               onError={(e) => {
//                                 console.error("Video load error:", asset.url);
//                               }}
//                             >
//                               <source src={asset.url} type="video/mp4" />
//                               Your browser does not support the video tag.
//                             </video>
//                           </div>
//                         ) : (
//                           <img
//                             src={asset.url || "/image-placeholder.png"}
//                             alt={asset.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.src = "/image-placeholder.png";
//                             }}
//                           />
//                         )}
//                       </div>
//                       <div className="absolute top-2 right-2 flex space-x-1">
//                         <Button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handlePreview(asset);
//                           }}
//                           className="p-1 bg-white rounded-full text-blue-500 hover:bg-gray-100 shadow-sm"
//                         >
//                           <Eye size={12} />
//                         </Button>
//                         <Button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onDeleteFile(asset.fileId);
//                           }}
//                           className="p-1 bg-white rounded-full text-red-500 hover:bg-gray-100 shadow-sm"
//                         >
//                           <Trash2 size={12} />
//                         </Button>
//                       </div>
//                       <div className="p-2">
//                         <p className="text-xs text-gray-600 truncate">{asset.name}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         title="Asset Preview"
//         mode="view"
//         size="large"
//       >
//         {renderPreviewContent()}
//       </Modal>
//     </div>
//   );
// };

// export default MediaView;



import React, { useEffect, useMemo, useState } from "react";
import { Folder, Upload, FolderPlus, Trash2, Image as ImageIcon, Video, Play, Eye } from "lucide-react";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import Button from "../../../controls/button/buttonView";
import Modal from "../../../common/modal/modal";

const MediaView = ({
  assets = [],
  loading = false,
  currentPath = "/",
  onGoBack = () => {},
  onOpenFolder = () => {},
  onUploadFile = () => {},
  onCreateFolder = () => {},
  onDeleteFile = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const filteredFolders = useMemo(() => {
    return assets.filter((asset) => asset.type === "folder");
  }, [assets]);

  useEffect(() => {
    console.log("assets", assets);
  }, [assets]);

  const mediaAssets = useMemo(() => {
    return assets.filter((asset) => asset.type !== "folder");
  }, [assets]);

  const renderAssetIcon = (asset) => {
    if (asset.type === "folder") return <Folder size={20} className="text-yellow-400 dark:text-yellow-300" />;
    if (asset.fileType === "non-image") return <Video size={20} className="text-blue-400 dark:text-blue-300" />;
    return <ImageIcon size={20} className="text-blue-400 dark:text-blue-300" />;
  };

  const getVideoThumbnail = (asset) => {
    return asset.thumbnail || "/video-placeholder.png";
  };

  // Open modal with selected asset for preview
  const handlePreview = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
  };

  // Render preview content for modal
  const renderPreviewContent = () => {
    if (!selectedAsset) return null;

    return selectedAsset.fileType === "non-image" ? (
      <video
        src={selectedAsset.url}
        controls
        className="w-full h-auto max-h-[50vh] object-contain bg-gray-100 dark:bg-gray-800"
        autoPlay
      >
        <source src={selectedAsset.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <img
        src={selectedAsset.url}
        alt={selectedAsset.name}
        className="w-full h-auto max-h-[50vh] object-contain bg-gray-100 dark:bg-gray-800"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="flex-1 flex flex-col">

      <TopNavbar
        userData={{ name: "John Doe", email: "john@example.com" }}
        onSearch={() => {}}
        notificationCount={3}
        title="Media"
      />
              <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-3 space-y-8">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Media</h1>
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                document.getElementById("file-upload").click();
              }}
              className="p-2 flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <Upload size={16} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm">Upload</span>
              <input
                id="file-upload"
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    onUploadFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
            <Button
              onClick={() => {
                const folderName = prompt("Enter folder name:");
                if (folderName) onCreateFolder(folderName);
              }}
              className="p-2 flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              <FolderPlus size={16} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm">Folder</span>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 dark:border-blue-400 rounded-full"></div>
          </div>
        ) : assets.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 p-8">No assets found</div>
        ) : (
          <div>
            {filteredFolders.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredFolders.map((folder) => (
                    <div
                      key={folder.folderId}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onDoubleClick={() => onOpenFolder(folder.folderPath)}
                    >
                      <div className="flex items-center space-x-2">
                        {renderAssetIcon(folder)}
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{folder.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {mediaAssets.length > 0 && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mediaAssets.map((asset) => (
                    <div
                      key={asset.fileId}
                      className="relative  overflow-hidden bg-white dark:bg-gray-800  cursor-pointer"
                    >
                      <div className="relative aspect-square">
                        {asset.fileType === "non-image" && asset.url ? (
                          <div className="relative w-full h-full">
                            <img
                              src={getVideoThumbnail(asset)}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover "
                              onError={(e) => {
                                e.target.src = "/video-placeholder.png";
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play size={32} className="text-white dark:text-gray-100 opacity-75" />
                            </div>
                            <video
                              src={asset.url}
                              className="w-full h-full object-cover hidden"
                              muted
                              loop
                              preload="metadata"
                              onError={(e) => {
                                console.error("Video load error:", asset.url);
                              }}
                            >
                              <source src={asset.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : (
                          <img
                            src={asset.url || "/image-placeholder.png"}
                            alt={asset.name}
                            className="w-full h-full object-cover "
                            onError={(e) => {
                              e.target.src = "/image-placeholder.png";
                            }}
                          />
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePreview(asset);
                          }}
                          className="p-1 bg-white dark:bg-gray-800 rounded-full text-blue-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
                        >
                          <Eye size={12} />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFile(asset.fileId);
                          }}
                          className="p-1 bg-white dark:bg-gray-800 rounded-full text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                      <div className="p-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{asset.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Asset Preview"
        mode="view"
        size="large"
      >
        {renderPreviewContent()}
      </Modal>
      </div>
    </div>
  );
};

export default MediaView;
// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   listAssets,
//   getFileDetails,
//   deleteFile,
//   uploadFile,
//   createFolder,
// } from "../../../../store/media/mediaActions";
// import MediaView from "./mediaView";

// class MediaContainer extends Component {
//   state = {
//     currentPath: "/",
//     selectedFileId: null,
//     showUploadModal: false,
//     showCreateFolderModal: false,
//     folderName: "",
//   };

//   componentDidMount() {
//     this.fetchAssets();
//   }

//   fetchAssets = () => {
//     const { currentPath } = this.state;
//     this.props.listAssets({
//       path: currentPath,
//       skip: 0,
//       limit: 100,
//     });
//   };

//   handlePathChange = (newPath) => {
//     this.setState({ currentPath: newPath, selectedFileId: null }, this.fetchAssets);
//   };

//   handleGoBack = () => {
//     const { currentPath } = this.state;
//     if (currentPath === "/") return;
//     const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
//     this.handlePathChange(parentPath);
//   };

 

//   handleUploadFile = (file) => {
//     const { currentPath } = this.state;
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("folderPath", currentPath);
//     this.props.uploadFile(formData).then(this.fetchAssets);
//   };

//   handleCreateFolder = (folderName) => {
//     const { currentPath } = this.state;
//     this.props.createFolder({ name: folderName, path: currentPath }).then(this.fetchAssets);
//   };

//   handleDeleteFile = (fileId) => {
//     this.props.deleteFile(fileId).then(() => {
//       this.setState({ selectedFileId: null });
//       this.fetchAssets();
//     });
//   };

//   render() {
//     const { assets, loading } = this.props;
//     const { currentPath, selectedFileId, showUploadModal, showCreateFolderModal } = this.state;

//     return (
//       <MediaView
//         assets={assets}
//         loading={loading}
//         currentPath={currentPath}
//         selectedFileId={selectedFileId}
//         onPathChange={this.handlePathChange}
//         onGoBack={this.handleGoBack}
//         onSelectFile={this.handleSelectFile}
//         onOpenFolder={this.handlePathChange}
//         onUploadFile={this.handleUploadFile}
//         onCreateFolder={this.handleCreateFolder}
//         onDeleteFile={this.handleDeleteFile}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   assets: state.media.assets || [],
//   loading: state.media.loading,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     { listAssets, getFileDetails, deleteFile, uploadFile, createFolder },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(MediaContainer);


import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  listAssets as listImageKitAssets,
  getFileDetails as getImageKitFileDetails,
  deleteFile as deleteImageKitFile,
  uploadFile as uploadImageKitFile,
  createFolder as createImageKitFolder,
} from "../../../../store/media/mediaActions"; // ImageKit actions
import {
  listAssets as listCloudinaryAssets,
  getFileDetails as getCloudinaryFileDetails,
  deleteFile as deleteCloudinaryFile,
  uploadFile as uploadCloudinaryFile,
} from "../../../../store/file/fileActions"; // Cloudinary actions
import MediaView from "./mediaView";

class MediaContainer extends Component {
  state = {
    currentPath: "/",
    selectedFileId: null,
    activeTab: "imagekit", // Default to ImageKit tab
  };

  componentDidMount() {
    this.fetchAssets();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab || prevState.currentPath !== this.state.currentPath) {
      this.fetchAssets();
    }
  }

  fetchAssets = () => {
    const { currentPath, activeTab } = this.state;
    if (activeTab === "imagekit") {
      this.props.listImageKitAssets({
        path: currentPath,
        skip: 0,
        limit: 100,
      });
    } else {
      this.props.listCloudinaryAssets({
        path: currentPath,
        skip: 0,
        limit: 100,
      });
    }
  };

  handlePathChange = (newPath) => {
    this.setState({ currentPath: newPath, selectedFileId: null }, this.fetchAssets);
  };

  handleGoBack = () => {
    const { currentPath, activeTab } = this.state;
    if (currentPath === "/" || activeTab === "cloudinary") return; // No folder navigation for Cloudinary
    const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
    this.handlePathChange(parentPath);
  };

  handleUploadFile = (file) => {
    const { currentPath, activeTab } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderPath", currentPath);
    
    const uploadAction = activeTab === "imagekit" ? this.props.uploadImageKitFile : this.props.uploadCloudinaryFile;
    uploadAction(formData).then(this.fetchAssets);
  };

  handleCreateFolder = (folderName) => {
    const { currentPath } = this.state;
    this.props.createImageKitFolder({ name: folderName, path: currentPath }).then(this.fetchAssets);
  };

  handleDeleteFile = (fileId) => {
    const { activeTab } = this.state;
    const deleteAction = activeTab === "imagekit" ? this.props.deleteImageKitFile : this.props.deleteCloudinaryFile;
    deleteAction(fileId).then(() => {
      this.setState({ selectedFileId: null });
      this.fetchAssets();
    });
  };

  handleTabChange = (newTab) => {
    this.setState({ activeTab: newTab, currentPath: "/", selectedFileId: null });
  };

  // Normalize assets to a common format expected by MediaView
  normalizeAssets = (assets, isCloudinary) => {
    if (isCloudinary) {
      return assets.map((asset) => ({
        assetId: asset.assetId,
        name: asset.original_filename || asset.public_id,
        url: asset.secure_url,
        type: "file", // Cloudinary doesn't have folders in this context
        fileType: asset.resource_type === "video" ? "non-image" : "image",
        thumbnail: asset.resource_type === "video" ? asset.secure_url.replace(/\.mp4$/, ".jpg") : null,
      }));
    }
    return assets.map((asset) => ({
      fileId: asset.fileId,
      folderId: asset.folderId,
      name: asset.name,
      url: asset.url,
      type: asset.type,
      fileType: asset.fileType,
      folderPath: asset.folderPath,
      thumbnail: asset.thumbnail,
    }));
  };

  render() {
    const { imageKitAssets, cloudinaryAssets, imageKitLoading, cloudinaryLoading } = this.props;
    const { currentPath, activeTab } = this.state;

    const isCloudinary = activeTab === "cloudinary";
    const assets = isCloudinary ? this.normalizeAssets(cloudinaryAssets, true) : this.normalizeAssets(imageKitAssets, false);
    const loading = isCloudinary ? cloudinaryLoading : imageKitLoading;

    return (
      <MediaView
        assets={assets}
        loading={loading}
        currentPath={currentPath}
        onGoBack={this.handleGoBack}
        onOpenFolder={this.handlePathChange}
        onUploadFile={this.handleUploadFile}
        onCreateFolder={this.handleCreateFolder}
        onDeleteFile={this.handleDeleteFile}
        activeTab={activeTab}
        onTabChange={this.handleTabChange}
        isCloudinary={isCloudinary}
      />
    );
  }
}

const mapStateToProps = (state) => (
  console.log("state is",state),
  {
  imageKitAssets: state.media.assets || [],
  imageKitLoading: state.media.loading,
  cloudinaryAssets: state.file.assets || [],
  cloudinaryLoading: state.file.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      listImageKitAssets,
      getImageKitFileDetails,
      deleteImageKitFile,
      uploadImageKitFile,
      createImageKitFolder,
      listCloudinaryAssets,
      getCloudinaryFileDetails,
      deleteCloudinaryFile,
      uploadCloudinaryFile,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MediaContainer);
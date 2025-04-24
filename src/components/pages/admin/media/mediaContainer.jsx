import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  listAssets,
  getFileDetails,
  deleteFile,
  uploadFile,
  createFolder,
} from "../../../../store/media/mediaActions";
import MediaView from "./mediaView";

class MediaContainer extends Component {
  state = {
    currentPath: "/",
    selectedFileId: null,
    showUploadModal: false,
    showCreateFolderModal: false,
    folderName: "",
  };

  componentDidMount() {
    this.fetchAssets();
  }

  fetchAssets = () => {
    const { currentPath } = this.state;
    this.props.listAssets({
      path: currentPath,
      skip: 0,
      limit: 100,
    });
  };

  handlePathChange = (newPath) => {
    this.setState({ currentPath: newPath, selectedFileId: null }, this.fetchAssets);
  };

  handleGoBack = () => {
    const { currentPath } = this.state;
    if (currentPath === "/") return;
    const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
    this.handlePathChange(parentPath);
  };

 

  handleUploadFile = (file) => {
    const { currentPath } = this.state;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderPath", currentPath);
    this.props.uploadFile(formData).then(this.fetchAssets);
  };

  handleCreateFolder = (folderName) => {
    const { currentPath } = this.state;
    this.props.createFolder({ name: folderName, path: currentPath }).then(this.fetchAssets);
  };

  handleDeleteFile = (fileId) => {
    this.props.deleteFile(fileId).then(() => {
      this.setState({ selectedFileId: null });
      this.fetchAssets();
    });
  };

  render() {
    const { assets, loading } = this.props;
    const { currentPath, selectedFileId, showUploadModal, showCreateFolderModal } = this.state;

    return (
      <MediaView
        assets={assets}
        loading={loading}
        currentPath={currentPath}
        selectedFileId={selectedFileId}
        onPathChange={this.handlePathChange}
        onGoBack={this.handleGoBack}
        onSelectFile={this.handleSelectFile}
        onOpenFolder={this.handlePathChange}
        onUploadFile={this.handleUploadFile}
        onCreateFolder={this.handleCreateFolder}
        onDeleteFile={this.handleDeleteFile}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  assets: state.media.assets || [],
  loading: state.media.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { listAssets, getFileDetails, deleteFile, uploadFile, createFolder },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MediaContainer);
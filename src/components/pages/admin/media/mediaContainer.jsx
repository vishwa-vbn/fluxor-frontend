import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  listAssets,
  getFileDetails,
  updateFileDetails,
  deleteFile,
  copyAsset,
  moveAsset,
  renameFile,
  uploadFile,
} from "../../../../store/media/mediaActions";
import MediaView from "./mediaView";

class MediaContainer extends Component {
  state = {
    currentPath: "/", // Current folder path
    selectedFileId: null, // Selected file for details/edit
    filterType: "", // Filter by type (file)
    sort: "ASC_NAME", // Sort order
    updateForm: {
      tags: [],
      customCoordinates: "",
      isPublished: true,
      customMetadata: {},
    }, // Form for updating file details
    copyMoveForm: {
      sourcePath: "",
      destinationPath: "/",
      includeVersions: false,
    }, // Form for copy/move
    renameForm: {
      fileId: "",
      newFileName: "",
    }, // Form for renaming
    uploadForm: {
      file: null,
      fileName: "",
      folderPath: "/", // Default to current path
    }, // Form for uploading file
  };

  componentDidMount() {
    // Load initial assets
    this.fetchAssets();
  }

  fetchAssets = () => {
    const { currentPath, filterType, sort } = this.state;
    const path = currentPath === "/" ? "/" : currentPath.endsWith("/") ? currentPath : `${currentPath}/`;
    this.props.listAssets({
      path,
      type: filterType,
      sort,
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
    const parentPath = currentPath
      .split("/")
      .slice(0, -1)
      .join("/") || "/";
    this.handlePathChange(parentPath);
  };

  handleFilterChange = (filterType) => {
    this.setState({ filterType }, this.fetchAssets);
  };

  handleSortChange = (sort) => {
    this.setState({ sort }, this.fetchAssets);
  };

  handleSelectFile = (fileId) => {
    this.setState({ selectedFileId: fileId });
    if (fileId) {
      this.props.getFileDetails(fileId);
    }
  };

  handleUpdateFormChange = (field, value) => {
    this.setState((prevState) => ({
      updateForm: { ...prevState.updateForm, [field]: value },
    }));
  };

  handleUpdateFile = () => {
    const { selectedFileId, updateForm } = this.state;
    if (selectedFileId) {
      this.props.updateFileDetails(selectedFileId, updateForm).then(() => {
        this.fetchAssets();
      });
    }
  };

  handleDeleteFile = (fileId) => {
    this.props.deleteFile(fileId).then(() => {
      this.setState({ selectedFileId: null });
      this.fetchAssets();
    });
  };

  handleCopyMoveFormChange = (field, value) => {
    this.setState((prevState) => ({
      copyMoveForm: { ...prevState.copyMoveForm, [field]: value },
    }));
  };

  handleCopyAsset = () => {
    const { copyMoveForm } = this.state;
    this.props.copyAsset(copyMoveForm).then(() => {
      this.fetchAssets();
      this.setState({
        copyMoveForm: { sourcePath: "", destinationPath: "/", includeVersions: false },
      });
    });
  };

  handleMoveAsset = () => {
    const { copyMoveForm } = this.state;
    this.props.moveAsset({
      sourcePath: copyMoveForm.sourcePath,
      destinationPath: copyMoveForm.destinationPath,
    }).then(() => {
      this.fetchAssets();
      this.setState({
        copyMoveForm: { sourcePath: "", destinationPath: "/", includeVersions: false },
      });
    });
  };

  handleRenameFormChange = (field, value) => {
    this.setState((prevState) => ({
      renameForm: { ...prevState.renameForm, [field]: value },
    }));
  };

  handleRenameFile = () => {
    const { renameForm } = this.state;
    this.props.renameFile(renameForm).then(() => {
      this.fetchAssets();
      this.setState({ renameForm: { fileId: "", newFileName: "" } });
    });
  };

  handleUploadFormChange = (field, value) => {
    this.setState((prevState) => ({
      uploadForm: { ...prevState.uploadForm, [field]: value },
    }));
  };

  handleUploadFile = () => {
    const { uploadForm, currentPath } = this.state;
    const formData = new FormData();
    formData.append("file", uploadForm.file);
    formData.append("fileName", uploadForm.fileName);
    formData.append("folderPath", uploadForm.folderPath || currentPath);

    this.props.uploadFile(formData).then(() => {
      this.fetchAssets();
      this.setState({
        uploadForm: { file: null, fileName: "", folderPath: "/" },
      });
    });
  };

  render() {
    const { assets, file, loading, error } = this.props;
    const {
      currentPath,
      selectedFileId,
      filterType,
      sort,
      updateForm,
      copyMoveForm,
      renameForm,
      uploadForm,
    } = this.state;

    return (
      <MediaView
        assets={assets}
        file={file}
        loading={loading}
        error={error}
        currentPath={currentPath}
        selectedFileId={selectedFileId}
        filterType={filterType}
        sort={sort}
        updateForm={updateForm}
        copyMoveForm={copyMoveForm}
        renameForm={renameForm}
        uploadForm={uploadForm}
        onPathChange={this.handlePathChange}
        onGoBack={this.handleGoBack}
        onFilterChange={this.handleFilterChange}
        onSortChange={this.handleSortChange}
        onSelectFile={this.handleSelectFile}
        onUpdateFormChange={this.handleUpdateFormChange}
        onUpdateFile={this.handleUpdateFile}
        onDeleteFile={this.handleDeleteFile}
        onCopyMoveFormChange={this.handleCopyMoveFormChange}
        onCopyAsset={this.handleCopyAsset}
        onMoveAsset={this.handleMoveAsset}
        onRenameFormChange={this.handleRenameFormChange}
        onRenameFile={this.handleRenameFile}
        onUploadFormChange={this.handleUploadFormChange}
        onUploadFile={this.handleUploadFile}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  assets: state.media.assets || [],
  file: state.media.file,
  loading: state.media.loading,
  error: state.media.error,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      listAssets,
      getFileDetails,
      updateFileDetails,
      deleteFile,
      copyAsset,
      moveAsset,
      renameFile,
      uploadFile,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MediaContainer);
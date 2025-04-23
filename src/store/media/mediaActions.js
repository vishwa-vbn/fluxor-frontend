import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

// Action Types
export const MEDIA_LIST_PENDING = "MEDIA_LIST_PENDING";
export const MEDIA_LIST_SUCCESS = "MEDIA_LIST_SUCCESS";
export const MEDIA_LIST_ERROR = "MEDIA_LIST_ERROR";

export const MEDIA_FOLDERS_PENDING = "MEDIA_FOLDERS_PENDING";
export const MEDIA_FOLDERS_SUCCESS = "MEDIA_FOLDERS_SUCCESS";
export const MEDIA_FOLDERS_ERROR = "MEDIA_FOLDERS_ERROR";

export const MEDIA_FETCH_ONE_PENDING = "MEDIA_FETCH_ONE_PENDING";
export const MEDIA_FETCH_ONE_SUCCESS = "MEDIA_FETCH_ONE_SUCCESS";
export const MEDIA_FETCH_ONE_ERROR = "MEDIA_FETCH_ONE_ERROR";

export const MEDIA_UPDATE_PENDING = "MEDIA_UPDATE_PENDING";
export const MEDIA_UPDATE_SUCCESS = "MEDIA_UPDATE_SUCCESS";
export const MEDIA_UPDATE_ERROR = "MEDIA_UPDATE_ERROR";

export const MEDIA_DELETE_PENDING = "MEDIA_DELETE_PENDING";
export const MEDIA_DELETE_SUCCESS = "MEDIA_DELETE_SUCCESS";
export const MEDIA_DELETE_ERROR = "MEDIA_DELETE_ERROR";

export const MEDIA_CREATE_FOLDER_PENDING = "MEDIA_CREATE_FOLDER_PENDING";
export const MEDIA_CREATE_FOLDER_SUCCESS = "MEDIA_CREATE_FOLDER_SUCCESS";
export const MEDIA_CREATE_FOLDER_ERROR = "MEDIA_CREATE_FOLDER_ERROR";

export const MEDIA_DELETE_FOLDER_PENDING = "MEDIA_DELETE_FOLDER_PENDING";
export const MEDIA_DELETE_FOLDER_SUCCESS = "MEDIA_DELETE_FOLDER_SUCCESS";
export const MEDIA_DELETE_FOLDER_ERROR = "MEDIA_DELETE_FOLDER_ERROR";

export const MEDIA_COPY_PENDING = "MEDIA_COPY_PENDING";
export const MEDIA_COPY_SUCCESS = "MEDIA_COPY_SUCCESS";
export const MEDIA_COPY_ERROR = "MEDIA_COPY_ERROR";

export const MEDIA_MOVE_PENDING = "MEDIA_MOVE_PENDING";
export const MEDIA_MOVE_SUCCESS = "MEDIA_MOVE_SUCCESS";
export const MEDIA_MOVE_ERROR = "MEDIA_MOVE_ERROR";

export const MEDIA_RENAME_PENDING = "MEDIA_RENAME_PENDING";
export const MEDIA_RENAME_SUCCESS = "MEDIA_RENAME_SUCCESS";
export const MEDIA_RENAME_ERROR = "MEDIA_RENAME_ERROR";

export const MEDIA_UPLOAD_PENDING = "MEDIA_UPLOAD_PENDING";
export const MEDIA_UPLOAD_SUCCESS = "MEDIA_UPLOAD_SUCCESS";
export const MEDIA_UPLOAD_ERROR = "MEDIA_UPLOAD_ERROR";

// API Configuration
const API_URL = "https://fluxor-backend-production.up.railway.app/api/imagekit";

// LIST ASSETS
export const listAssets = (params = {}) => async (dispatch) => {
  dispatch({ type: MEDIA_LIST_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/assets`, {
      params: { ...params, path: params.path || "/" },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("listAssets response:", res.data);
    dispatch({ type: MEDIA_LIST_SUCCESS, payload: res.data.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Assets Retrieved",
        type: "success",
        msg: "Assets have been retrieved successfully.",
      })
    );
  } catch (err) {
    console.error("listAssets error:", err.response || err.message);
    dispatch({
      type: MEDIA_LIST_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// LIST FOLDERS
export const listFolders = () => async (dispatch) => {
  dispatch({ type: MEDIA_FOLDERS_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/folders/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("listFolders response:", res.data);
    dispatch({ type: MEDIA_FOLDERS_SUCCESS, payload: res.data.data || [] });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Folders Retrieved",
        type: "success",
        msg: "Folders have been retrieved successfully.",
      })
    );
  } catch (err) {
    console.error("listFolders error:", err.response || err.message);
    dispatch({
      type: MEDIA_FOLDERS_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Folders Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// GET FILE DETAILS
export const getFileDetails = (fileId) => async (dispatch) => {
  dispatch({ type: MEDIA_FETCH_ONE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: MEDIA_FETCH_ONE_SUCCESS, payload: res.data.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "File Details Retrieved",
        type: "success",
        msg: "File details have been retrieved successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_FETCH_ONE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// UPDATE FILE DETAILS
export const updateFileDetails = (fileId, data) => async (dispatch) => {
  dispatch({ type: MEDIA_UPDATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.patch(`${API_URL}/files/${fileId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: MEDIA_UPDATE_SUCCESS, payload: res.data.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "File Updated",
        type: "success",
        msg: "File details updated successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_UPDATE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Update Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// DELETE FILE
export const deleteFile = (fileId) => async (dispatch) => {
  dispatch({ type: MEDIA_DELETE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: MEDIA_DELETE_SUCCESS, payload: fileId });
    dispatch(
      showAlert({
        isOpen: true,
        title: "File Deleted",
        type: "success",
        msg: "File has been deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_DELETE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Deletion Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// CREATE FOLDER
export const createFolder = (data) => async (dispatch) => {
  dispatch({ type: MEDIA_CREATE_FOLDER_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.post(`${API_URL}/folders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: MEDIA_CREATE_FOLDER_SUCCESS });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Folder Created",
        type: "success",
        msg: "Folder has been created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_CREATE_FOLDER_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Creation Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// DELETE FOLDER
export const deleteFolder = (data) => async (dispatch) => {
  dispatch({ type: MEDIA_DELETE_FOLDER_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/folders`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    });

    dispatch({ type: MEDIA_DELETE_FOLDER_SUCCESS });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Folder Deleted",
        type: "success",
        msg: "Folder has been deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_DELETE_FOLDER_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Deletion Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// COPY FILE OR FOLDER
export const copyAsset = (data) => async (dispatch) => {
  dispatch({ type: MEDIA_COPY_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.post(`${API_URL}/copy`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: MEDIA_COPY_SUCCESS });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Asset Copied",
        type: "success",
        msg: "Asset has been copied successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_COPY_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Copy Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// MOVE FILE OR FOLDER
export const moveAsset = (data) => async (dispatch) => {
  dispatch({ type: MEDIA_MOVE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.post(`${API_URL}/move`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: MEDIA_MOVE_SUCCESS });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Asset Moved",
        type: "success",
        msg: "Asset has been moved successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_MOVE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Move Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// RENAME FILE
export const renameFile = (data) => async (dispatch) => {
  dispatch({ type: MEDIA_RENAME_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.put(`${API_URL}/rename`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: MEDIA_RENAME_SUCCESS });
    dispatch(
      showAlert({
        isOpen: true,
        title: "File Renamed",
        type: "success",
        msg: "File has been renamed successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_RENAME_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Rename Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// UPLOAD FILE
export const uploadFile = (formData) => async (dispatch) => {
  dispatch({ type: MEDIA_UPLOAD_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: MEDIA_UPLOAD_SUCCESS, payload: res.data.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "File Uploaded",
        type: "success",
        msg: "File has been uploaded successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: MEDIA_UPLOAD_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Upload Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};
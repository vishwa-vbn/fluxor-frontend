import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { DOMAIN } from "../../constants/env";

// Action Types
export const FILE_UPLOAD_PENDING = "FILE_UPLOAD_PENDING";
export const FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS";
export const FILE_UPLOAD_ERROR = "FILE_UPLOAD_ERROR";

export const FILE_LIST_PENDING = "FILE_LIST_PENDING";
export const FILE_LIST_SUCCESS = "FILE_LIST_SUCCESS";
export const FILE_LIST_ERROR = "FILE_LIST_ERROR";

export const FILE_FETCH_ONE_PENDING = "FILE_FETCH_ONE_PENDING";
export const FILE_FETCH_ONE_SUCCESS = "FILE_FETCH_ONE_SUCCESS";
export const FILE_FETCH_ONE_ERROR = "FILE_FETCH_ONE_ERROR";

export const FILE_DELETE_PENDING = "FILE_DELETE_PENDING";
export const FILE_DELETE_SUCCESS = "FILE_DELETE_SUCCESS";
export const FILE_DELETE_ERROR = "FILE_DELETE_ERROR";

// API Configuration
const API_URL = `${DOMAIN}/api/cloudinary`;
// const API_URL = `http://localhost:3000/api/cloudinary`;


// UPLOAD FILE
export const uploadFile = (formData) => async (dispatch) => {
  dispatch({ type: FILE_UPLOAD_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: FILE_UPLOAD_SUCCESS, payload: res.data.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "File Uploaded",
        type: "success",
        msg: "File has been uploaded successfully.",
      })
    );
  } catch (err) {
    console.error("uploadFile error:", err.response || err.message);
    dispatch({
      type: FILE_UPLOAD_ERROR,
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

// LIST ASSETS
export const listAssets = (params = {}) => async (dispatch) => {
  dispatch({ type: FILE_LIST_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/assets`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: FILE_LIST_SUCCESS, payload: res.data.data });
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
      type: FILE_LIST_ERROR,
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

// GET FILE DETAILS
export const getFileDetails = (assetId) => async (dispatch) => {
  dispatch({ type: FILE_FETCH_ONE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/files/${assetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: FILE_FETCH_ONE_SUCCESS, payload: res.data.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "File Details Retrieved",
        type: "success",
        msg: "File details have been retrieved successfully.",
      })
    );
  } catch (err) {
    console.error("getFileDetails error:", err.response || err.message);
    dispatch({
      type: FILE_FETCH_ONE_ERROR,
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

// DELETE FILE
export const deleteFile = (assetId) => async (dispatch) => {
  dispatch({ type: FILE_DELETE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/files/${assetId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: FILE_DELETE_SUCCESS, payload: assetId });
    dispatch(
      showAlert({
        isOpen: true,
        title: "File Deleted",
        type: "success",
        msg: "File has been deleted successfully.",
      })
    );
  } catch (err) {
    console.error("deleteFile error:", err.response || err.message);
    dispatch({
      type: FILE_DELETE_ERROR,
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
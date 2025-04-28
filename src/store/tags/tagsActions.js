// src/store/tags/tagsActions.js
import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import io from "socket.io-client";
import { DOMAIN } from "../../constants/env";


// Action Types
export const TAGS_CREATE_PENDING = "TAGS_CREATE_PENDING";
export const TAGS_CREATE_SUCCESS = "TAGS_CREATE_SUCCESS";
export const TAGS_CREATE_ERROR = "TAGS_CREATE_ERROR";

export const TAGS_FETCH_ALL_PENDING = "TAGS_FETCH_ALL_PENDING";
export const TAGS_FETCH_ALL_SUCCESS = "TAGS_FETCH_ALL_SUCCESS";
export const TAGS_FETCH_ALL_ERROR = "TAGS_FETCH_ALL_ERROR";

export const TAGS_FETCH_ONE_PENDING = "TAGS_FETCH_ONE_PENDING";
export const TAGS_FETCH_ONE_SUCCESS = "TAGS_FETCH_ONE_SUCCESS";
export const TAGS_FETCH_ONE_ERROR = "TAGS_FETCH_ONE_ERROR";

export const TAGS_UPDATE_PENDING = "TAGS_UPDATE_PENDING";
export const TAGS_UPDATE_SUCCESS = "TAGS_UPDATE_SUCCESS";
export const TAGS_UPDATE_ERROR = "TAGS_UPDATE_ERROR";

export const TAGS_DELETE_PENDING = "TAGS_DELETE_PENDING";
export const TAGS_DELETE_SUCCESS = "TAGS_DELETE_SUCCESS";
export const TAGS_DELETE_ERROR = "TAGS_DELETE_ERROR";

// API Configuration
const API_URL = `${DOMAIN}`;

// Initialize Socket.IO dynamically
let socket = null;

// Initialize Socket.IO listeners for real-time tag updates
export const initializeTagSocket = () => (dispatch) => {
  if (socket) {
    return;
  }

  const token = getState().auth?.loginUser?.token || "";
  socket = io(`${API_URL}/blog`, {
    reconnection: true,
    transports: ["polling", "websocket"],
    auth: { token },
  });

  socket.on("connect", () => {
  });

  socket.on("tag_change", (payload) => {
    switch (payload.operation) {
      case "INSERT":
        dispatch({
          type: TAGS_CREATE_SUCCESS,
          payload: payload.record,
        });
        break;
      case "UPDATE":
        dispatch({
          type: TAGS_UPDATE_SUCCESS,
          payload: payload.record,
        });
        break;
      case "DELETE":
        dispatch({
          type: TAGS_DELETE_SUCCESS,
          payload: payload.old_record.id,
        });
        break;
      default:
        console.warn("Unknown operation:", payload.operation);
    }
  });

  socket.on("connect_error", (error) => {
    console.error("Socket.IO connection error:", error.message);
    dispatch(
      showAlert({
        isOpen: true,
        title: "Real-Time Error",
        type: "error",
        msg: "Failed to connect to real-time updates. Please refresh.",
      })
    );
  });

  socket.on("disconnect", () => {
  });
};

// Cleanup Socket.IO listeners
export const cleanupTagSocket = () => () => {
  if (socket) {
    socket.off("tag_change");
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.disconnect();
    socket = null;
  }
};

// CREATE TAG
export const createTag = (data) => async (dispatch) => {
  dispatch({ type: TAGS_CREATE_PENDING });
  // dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(`${API_URL}/api/tags`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: TAGS_CREATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Tag Created",
        type: "success",
        msg: "New tag has been created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: TAGS_CREATE_ERROR,
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

// GET ALL TAGS
export const getAllTags = () => async (dispatch) => {
  dispatch({ type: TAGS_FETCH_ALL_PENDING });
  // dispatch(showLoader());
  try {
    const res = await axios.get(`${API_URL}/api/tags`);
    dispatch({ type: TAGS_FETCH_ALL_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: TAGS_FETCH_ALL_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Error",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// GET TAG BY ID
export const getTagById = (id) => async (dispatch) => {
  dispatch({ type: TAGS_FETCH_ONE_PENDING });
  // dispatch(showLoader());
  try {
    const res = await axios.get(`${API_URL}/api/tags/${id}`);
    dispatch({ type: TAGS_FETCH_ONE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: TAGS_FETCH_ONE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Error",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// UPDATE TAG
export const updateTag = (id, data) => async (dispatch) => {
  dispatch({ type: TAGS_UPDATE_PENDING });
  // dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.put(`${API_URL}/api/tags/${id}`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: TAGS_UPDATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Tag Updated",
        type: "success",
        msg: "Tag updated successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: TAGS_UPDATE_ERROR,
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

// DELETE TAG
export const deleteTag = (id) => async (dispatch) => {
  dispatch({ type: TAGS_DELETE_PENDING });
  // dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/api/tags/${id}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: TAGS_DELETE_SUCCESS, payload: id });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Tag Deleted",
        type: "success",
        msg: "Tag has been deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: TAGS_DELETE_ERROR,
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

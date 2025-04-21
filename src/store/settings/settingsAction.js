import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import io from "socket.io-client";

// Action Types
export const SETTINGS_CREATE_PENDING = "SETTINGS_CREATE_PENDING";
export const SETTINGS_CREATE_SUCCESS = "SETTINGS_CREATE_SUCCESS";
export const SETTINGS_CREATE_ERROR = "SETTINGS_CREATE_ERROR";

export const SETTINGS_FETCH_ALL_PENDING = "SETTINGS_FETCH_ALL_PENDING";
export const SETTINGS_FETCH_ALL_SUCCESS = "SETTINGS_FETCH_ALL_SUCCESS";
export const SETTINGS_FETCH_ALL_ERROR = "SETTINGS_FETCH_ALL_ERROR";

export const SETTINGS_FETCH_ONE_PENDING = "SETTINGS_FETCH_ONE_PENDING";
export const SETTINGS_FETCH_ONE_SUCCESS = "SETTINGS_FETCH_ONE_SUCCESS";
export const SETTINGS_FETCH_ONE_ERROR = "SETTINGS_FETCH_ONE_ERROR";

export const SETTINGS_UPDATE_PENDING = "SETTINGS_UPDATE_PENDING";
export const SETTINGS_UPDATE_SUCCESS = "SETTINGS_UPDATE_SUCCESS";
export const SETTINGS_UPDATE_ERROR = "SETTINGS_UPDATE_ERROR";

export const SETTINGS_DELETE_PENDING = "SETTINGS_DELETE_PENDING";
export const SETTINGS_DELETE_SUCCESS = "SETTINGS_DELETE_SUCCESS";
export const SETTINGS_DELETE_ERROR = "SETTINGS_DELETE_ERROR";

// API Configuration
// const API_URL = "https://fluxor-backend-production.up.railway.app";
const API_URL = "http://localhost:3000";


// Initialize Socket.IO dynamically
let socket = null;

// Initialize Socket.IO listeners for real-time setting updates
export const initializeSettingSocket = () => (dispatch) => {
  if (socket) {
    console.log("Socket.IO already initialized");
    return;
  }

  const token = getState().auth?.loginUser?.token || "";
  socket = io(`${API_URL}/settings`, {
    reconnection: true,
    transports: ["polling", "websocket"],
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server (settings namespace)");
  });

  socket.on("setting_change", (payload) => {
    console.log("Setting change received:", payload);
    switch (payload.operation) {
      case "INSERT":
        dispatch({
          type: SETTINGS_CREATE_SUCCESS,
          payload: payload.record,
        });
        break;
      case "UPDATE":
        dispatch({
          type: SETTINGS_UPDATE_SUCCESS,
          payload: payload.record,
        });
        break;
      case "DELETE":
        dispatch({
          type: SETTINGS_DELETE_SUCCESS,
          payload: payload.old_record.key,
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
    console.log("Disconnected from Socket.IO server");
  });
};

// Cleanup Socket.IO listeners
export const cleanupSettingSocket = () => () => {
  if (socket) {
    socket.off("setting_change");
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.disconnect();
    socket = null;
    console.log("Socket.IO cleaned up");
  }
};

// CREATE SETTING
export const createSetting = (data) => async (dispatch) => {
  dispatch({ type: SETTINGS_CREATE_PENDING });
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(`${API_URL}/api/settings`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: SETTINGS_CREATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Setting Created",
        type: "success",
        msg: "New setting has been created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: SETTINGS_CREATE_ERROR,
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

// GET ALL SETTINGS
export const getAllSettings = (group = null) => async (dispatch) => {
  dispatch({ type: SETTINGS_FETCH_ALL_PENDING });
  try {
    const url = group
      ? `${API_URL}/api/settings?group=${encodeURIComponent(group)}`
      : `${API_URL}/api/settings`;
    const res = await axios.get(url);
    dispatch({ type: SETTINGS_FETCH_ALL_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: SETTINGS_FETCH_ALL_ERROR,
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

// GET SETTING BY KEY
export const getSettingByKey = (key) => async (dispatch) => {
  dispatch({ type: SETTINGS_FETCH_ONE_PENDING });
  try {
    const res = await axios.get(`${API_URL}/api/settings/${key}`);
    dispatch({ type: SETTINGS_FETCH_ONE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: SETTINGS_FETCH_ONE_ERROR,
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

// UPDATE SETTING
export const updateSetting = (key, data) => async (dispatch) => {
  dispatch({ type: SETTINGS_UPDATE_PENDING });
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.put(`${API_URL}/api/settings/${key}`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: SETTINGS_UPDATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Setting Updated",
        type: "success",
        msg: "Setting updated successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: SETTINGS_UPDATE_ERROR,
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

// DELETE SETTING
export const deleteSetting = (key) => async (dispatch) => {
  dispatch({ type: SETTINGS_DELETE_PENDING });
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/api/settings/${key}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: SETTINGS_DELETE_SUCCESS, payload: key });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Setting Deleted",
        type: "success",
        msg: "Setting has been deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: SETTINGS_DELETE_ERROR,
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
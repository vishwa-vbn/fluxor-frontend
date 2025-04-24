import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import io from "socket.io-client";

// Action Types
// Ad Units
export const AD_UNITS_CREATE_PENDING = "AD_UNITS_CREATE_PENDING";
export const AD_UNITS_CREATE_SUCCESS = "AD_UNITS_CREATE_SUCCESS";
export const AD_UNITS_CREATE_ERROR = "AD_UNITS_CREATE_ERROR";

export const AD_UNITS_FETCH_ALL_PENDING = "AD_UNITS_FETCH_ALL_PENDING";
export const AD_UNITS_FETCH_ALL_SUCCESS = "AD_UNITS_FETCH_ALL_SUCCESS";
export const AD_UNITS_FETCH_ALL_ERROR = "AD_UNITS_FETCH_ALL_ERROR";

export const AD_UNITS_FETCH_ONE_PENDING = "AD_UNITS_FETCH_ONE_PENDING";
export const AD_UNITS_FETCH_ONE_SUCCESS = "AD_UNITS_FETCH_ONE_SUCCESS";
export const AD_UNITS_FETCH_ONE_ERROR = "AD_UNITS_FETCH_ONE_ERROR";

export const AD_UNITS_UPDATE_PENDING = "AD_UNITS_UPDATE_PENDING";
export const AD_UNITS_UPDATE_SUCCESS = "AD_UNITS_UPDATE_SUCCESS";
export const AD_UNITS_UPDATE_ERROR = "AD_UNITS_UPDATE_ERROR";

export const AD_UNITS_DELETE_PENDING = "AD_UNITS_DELETE_PENDING";
export const AD_UNITS_DELETE_SUCCESS = "AD_UNITS_DELETE_SUCCESS";
export const AD_UNITS_DELETE_ERROR = "AD_UNITS_DELETE_ERROR";

// Ad Settings
export const AD_SETTINGS_FETCH_PENDING = "AD_SETTINGS_FETCH_PENDING";
export const AD_SETTINGS_FETCH_SUCCESS = "AD_SETTINGS_FETCH_SUCCESS";
export const AD_SETTINGS_FETCH_ERROR = "AD_SETTINGS_FETCH_ERROR";

export const AD_SETTINGS_UPSERT_PENDING = "AD_SETTINGS_UPSERT_PENDING";
export const AD_SETTINGS_UPSERT_SUCCESS = "AD_SETTINGS_UPSERT_SUCCESS";
export const AD_SETTINGS_UPSERT_ERROR = "AD_SETTINGS_UPSERT_ERROR";

// API Configuration
// const API_URL = "http://localhost:3000/api/ad-units";
const API_URL = "https://fluxor-backend-production.up.railway.app/api/ad-units";


// Initialize Socket.IO dynamically
let socket = null;

// Initialize Socket.IO listeners for real-time ad unit updates
export const initializeAdUnitSocket = () => (dispatch) => {
  if (socket) {
    console.log("Socket.IO already initialized for ad units");
    return;
  }

  const token = getState().auth?.loginUser?.token || "";
  socket = io(`${API_URL.replace("/api/ad-units", "")}/blog`, {
    reconnection: true,
    transports: ["polling", "websocket"],
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server (blog namespace) for ad units");
  });

  socket.on("ad_unit_change", (payload) => {
    console.log("Ad unit change received:", payload);
    if (!payload || !payload.operation || !payload.record) {
      console.warn("Invalid socket payload:", payload);
      return;
    }

    switch (payload.operation) {
      case "INSERT":
        dispatch({
          type: AD_UNITS_CREATE_SUCCESS,
          payload: payload.record,
        });
        break;
      case "UPDATE":
        dispatch({
          type: AD_UNITS_UPDATE_SUCCESS,
          payload: payload.record,
        });
        break;
      case "DELETE":
        dispatch({
          type: AD_UNITS_DELETE_SUCCESS,
          payload: payload.record.id,
        });
        break;
      default:
        console.warn("Unknown socket operation:", payload.operation);
    }
  });

  socket.on("connect_error", (error) => {
    console.error("Socket.IO connection error:", error.message);
    dispatch(
      showAlert({
        isOpen: true,
        title: "Real-Time Error",
        type: "error",
        msg: "Failed to connect to real-time ad unit updates. Please refresh.",
      })
    );
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO server for ad units");
  });
};

// Cleanup Socket.IO listeners
export const cleanupAdUnitSocket = () => () => {
  if (socket) {
    socket.off("ad_unit_change");
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.disconnect();
    socket = null;
    console.log("Socket.IO cleaned up for ad units");
  }
};

// CREATE AD UNIT
export const createAdUnit = (data) => async (dispatch) => {
  console.log("Creating ad unit with data:", data);
  dispatch({ type: AD_UNITS_CREATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const headers = {
      Authorization: `${token}`,
    };

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const res = await axios.post(`${API_URL}/ad-unit`, data, { headers });
    const adUnit = res.data?.data || res.data; // Normalize response

    dispatch({ type: AD_UNITS_CREATE_SUCCESS, payload: adUnit });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Ad Unit Created",
        type: "success",
        msg: "New ad unit has been created successfully.",
      })
    );

    // Refresh ad units list
    await dispatch(getAllAdUnits());
  } catch (err) {
    console.error("Error creating ad unit:", err);
    const errorMsg = err.response?.data?.message || err.message;
    dispatch({
      type: AD_UNITS_CREATE_ERROR,
      payload: errorMsg,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Creation Failed",
        type: "error",
        msg: errorMsg,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// GET ALL AD UNITS
export const getAllAdUnits = () => async (dispatch) => {
  dispatch({ type: AD_UNITS_FETCH_ALL_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const adUnits = res.data?.data || res.data; // Normalize response
    dispatch({ type: AD_UNITS_FETCH_ALL_SUCCESS, payload: adUnits });
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    dispatch({
      type: AD_UNITS_FETCH_ALL_ERROR,
      payload: errorMsg,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Error",
        type: "error",
        msg: errorMsg,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// GET AD UNIT BY ID
export const getAdUnitById = (id) => async (dispatch) => {
  dispatch({ type: AD_UNITS_FETCH_ONE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/ad-unit/${id}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const adUnit = res.data?.data || res.data; // Normalize response
    dispatch({ type: AD_UNITS_FETCH_ONE_SUCCESS, payload: adUnit });
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    dispatch({
      type: AD_UNITS_FETCH_ONE_ERROR,
      payload: errorMsg,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Error",
        type: "error",
        msg: errorMsg,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// UPDATE AD UNIT
export const updateAdUnit = (id, data) => async (dispatch) => {
  console.log("Updating ad unit with ID:", id, "and data:", data);
  dispatch({ type: AD_UNITS_UPDATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const headers = {
      Authorization: `${token}`,
    };

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const res = await axios.put(`${API_URL}/ad-unit/${id}`, data, { headers });
    const adUnit = res.data?.data || res.data; // Normalize response

    dispatch({ type: AD_UNITS_UPDATE_SUCCESS, payload: adUnit });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Ad Unit Updated",
        type: "success",
        msg: "Ad unit updated successfully.",
      })
    );

    // Refresh ad units list
    await dispatch(getAllAdUnits());
  } catch (err) {
    console.error("Error updating ad unit:", err);
    const errorMsg = err.response?.data?.message || err.message;
    dispatch({
      type: AD_UNITS_UPDATE_ERROR,
      payload: errorMsg,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Update Failed",
        type: "error",
        msg: errorMsg,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// DELETE AD UNIT
export const deleteAdUnit = (id) => async (dispatch) => {
  console.log("Deleting ad unit with ID:", id);
  dispatch({ type: AD_UNITS_DELETE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/ad-unit/${id}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: AD_UNITS_DELETE_SUCCESS, payload: id });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Ad Unit Deleted",
        type: "success",
        msg: "Ad unit has been deleted successfully.",
      })
    );

    // Refresh ad units list
    await dispatch(getAllAdUnits());
  } catch (err) {
    console.error("Error deleting ad unit:", err);
    const errorMsg = err.response?.data?.message || err.message;
    dispatch({
      type: AD_UNITS_DELETE_ERROR,
      payload: errorMsg,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Deletion Failed",
        type: "error",
        msg: errorMsg,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// GET AD SETTINGS
export const getAdSettings = () => async (dispatch) => {
  dispatch({ type: AD_SETTINGS_FETCH_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/ad-settings`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const settings = res.data?.data || res.data; // Normalize response
    dispatch({ type: AD_SETTINGS_FETCH_SUCCESS, payload: settings });
  } catch (err) {
    const errorMsg = err.response?.data?.message || err.message;
    dispatch({
      type: AD_SETTINGS_FETCH_ERROR,
      payload: errorMsg,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Fetch Error",
        type: "error",
        msg: errorMsg,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// UPSERT AD SETTINGS
export const upsertAdSettings = (data) => async (dispatch) => {
  console.log("Upserting ad settings with data:", data);
  dispatch({ type: AD_SETTINGS_UPSERT_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(`${API_URL}/ad-settings`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    const settings = res.data?.data || res.data; // Normalize response
    dispatch({ type: AD_SETTINGS_UPSERT_SUCCESS, payload: settings });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Ad Settings Updated",
        type: "success",
        msg: "Ad settings have been updated successfully.",
      })
    );
  } catch (err) {
    console.error("Error upserting ad settings:", err);
    const errorMsg = err.response?.data?.message || err.message;
    dispatch({
      type: AD_SETTINGS_UPSERT_ERROR,
      payload: errorMsg,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Update Failed",
        type: "error",
        msg: errorMsg,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};
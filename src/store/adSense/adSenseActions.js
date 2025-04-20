import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

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
const API_URL = "https://fluxor-backend-production.up.railway.app/api/ad-units";
// const API_URL = "http://localhost:3000/api/ad-units";


// CREATE AD UNIT
export const createAdUnit = (data) => async (dispatch) => {
  dispatch({ type: AD_UNITS_CREATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(`${API_URL}`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: AD_UNITS_CREATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Ad Unit Created",
        type: "success",
        msg: "New ad unit has been created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: AD_UNITS_CREATE_ERROR,
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
      dispatch({ type: AD_UNITS_FETCH_ALL_SUCCESS, payload: res.data }); // res.data is { status, message, data }
    } catch (err) {
      dispatch({
        type: AD_UNITS_FETCH_ALL_ERROR,
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

// GET AD UNIT BY ID
export const getAdUnitById = (id) => async (dispatch) => {
  dispatch({ type: AD_UNITS_FETCH_ONE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/ad-unit/${id}`,
        {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },

        }
    );
    dispatch({ type: AD_UNITS_FETCH_ONE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: AD_UNITS_FETCH_ONE_ERROR,
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

// UPDATE AD UNIT
export const updateAdUnit = (id, data) => async (dispatch) => {
  dispatch({ type: AD_UNITS_UPDATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.put(`${API_URL}/ad-unit/${id}`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: AD_UNITS_UPDATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Ad Unit Updated",
        type: "success",
        msg: "Ad unit updated successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: AD_UNITS_UPDATE_ERROR,
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

// DELETE AD UNIT
export const deleteAdUnit = (id) => async (dispatch) => {
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
  } catch (err) {
    dispatch({
      type: AD_UNITS_DELETE_ERROR,
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

// GET AD SETTINGS
export const getAdSettings = () => async (dispatch) => {
  dispatch({ type: AD_SETTINGS_FETCH_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/ad-settings`,
        {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },
        }
    );
    dispatch({ type: AD_SETTINGS_FETCH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: AD_SETTINGS_FETCH_ERROR,
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

// UPSERT AD SETTINGS
export const upsertAdSettings = (data) => async (dispatch) => {
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

    dispatch({ type: AD_SETTINGS_UPSERT_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Ad Settings Updated",
        type: "success",
        msg: "Ad settings have been updated successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: AD_SETTINGS_UPSERT_ERROR,
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
import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

// Action Types
export const CATEGORY_CREATE_PENDING = "CATEGORY_CREATE_PENDING";
export const CATEGORY_CREATE_SUCCESS = "CATEGORY_CREATE_SUCCESS";
export const CATEGORY_CREATE_ERROR = "CATEGORY_CREATE_ERROR";

export const CATEGORY_FETCH_ALL_PENDING = "CATEGORY_FETCH_ALL_PENDING";
export const CATEGORY_FETCH_ALL_SUCCESS = "CATEGORY_FETCH_ALL_SUCCESS";
export const CATEGORY_FETCH_ALL_ERROR = "CATEGORY_FETCH_ALL_ERROR";

export const CATEGORY_FETCH_ONE_PENDING = "CATEGORY_FETCH_ONE_PENDING";
export const CATEGORY_FETCH_ONE_SUCCESS = "CATEGORY_FETCH_ONE_SUCCESS";
export const CATEGORY_FETCH_ONE_ERROR = "CATEGORY_FETCH_ONE_ERROR";

export const CATEGORY_UPDATE_PENDING = "CATEGORY_UPDATE_PENDING";
export const CATEGORY_UPDATE_SUCCESS = "CATEGORY_UPDATE_SUCCESS";
export const CATEGORY_UPDATE_ERROR = "CATEGORY_UPDATE_ERROR";

export const CATEGORY_DELETE_PENDING = "CATEGORY_DELETE_PENDING";
export const CATEGORY_DELETE_SUCCESS = "CATEGORY_DELETE_SUCCESS";
export const CATEGORY_DELETE_ERROR = "CATEGORY_DELETE_ERROR";

// API Base
const API_URL = "https://fluxor-backend-production.up.railway.app/api/categories";

// CREATE
export const createCategory = (data) => async (dispatch) => {
  dispatch({ type: CATEGORY_CREATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(API_URL, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Category Created",
        type: "success",
        msg: "New category has been created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: CATEGORY_CREATE_ERROR,
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

// FETCH ALL
export const getAllCategories = () => async (dispatch) => {
  console.log("fetch categories called");

  dispatch({ type: CATEGORY_FETCH_ALL_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("fetch categories", res);

    dispatch({ type: CATEGORY_FETCH_ALL_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CATEGORY_FETCH_ALL_ERROR,
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

// FETCH ONE
export const getCategoryById = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY_FETCH_ONE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: CATEGORY_FETCH_ONE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CATEGORY_FETCH_ONE_ERROR,
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

// UPDATE
export const updateCategory = (id, data) => async (dispatch) => {
  dispatch({ type: CATEGORY_UPDATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Category Updated",
        type: "success",
        msg: "Category updated successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: CATEGORY_UPDATE_ERROR,
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

// DELETE
export const deleteCategory = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY_DELETE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: id });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Category Deleted",
        type: "success",
        msg: "Category has been deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: CATEGORY_DELETE_ERROR,
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

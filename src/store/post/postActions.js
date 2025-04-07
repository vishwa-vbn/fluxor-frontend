// postActions.js
import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

// Action Types
export const POST_CREATE_PENDING = "POST_CREATE_PENDING";
export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
export const POST_CREATE_ERROR = "POST_CREATE_ERROR";

export const POST_FETCH_ALL_PENDING = "POST_FETCH_ALL_PENDING";
export const POST_FETCH_ALL_SUCCESS = "POST_FETCH_ALL_SUCCESS";
export const POST_FETCH_ALL_ERROR = "POST_FETCH_ALL_ERROR";

export const POST_FETCH_ONE_PENDING = "POST_FETCH_ONE_PENDING";
export const POST_FETCH_ONE_SUCCESS = "POST_FETCH_ONE_SUCCESS";
export const POST_FETCH_ONE_ERROR = "POST_FETCH_ONE_ERROR";

export const POST_UPDATE_PENDING = "POST_UPDATE_PENDING";
export const POST_UPDATE_SUCCESS = "POST_UPDATE_SUCCESS";
export const POST_UPDATE_ERROR = "POST_UPDATE_ERROR";

export const POST_DELETE_PENDING = "POST_DELETE_PENDING";
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
export const POST_DELETE_ERROR = "POST_DELETE_ERROR";

const API_URL = "http://localhost:3000/api/posts";

// CREATE
export const createPost = (data) => async (dispatch) => {
  dispatch({ type: POST_CREATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: POST_CREATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Post Created",
        type: "success",
        msg: "New post has been created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_CREATE_ERROR,
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
export const getAllPosts = (page = 1, limit = 10, status = null) => async (dispatch) => {
  dispatch({ type: POST_FETCH_ALL_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;
  const url = status
    ? `${API_URL}/status/${status}?page=${page}&limit=${limit}`
    : `${API_URL}?page=${page}&limit=${limit}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: POST_FETCH_ALL_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_FETCH_ALL_ERROR,
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
export const getPostBySlug = (slug) => async (dispatch) => {
  dispatch({ type: POST_FETCH_ONE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: POST_FETCH_ONE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_FETCH_ONE_ERROR,
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
export const updatePost = (id, data) => async (dispatch) => {
  dispatch({ type: POST_UPDATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: POST_UPDATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Post Updated",
        type: "success",
        msg: "Post updated successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_UPDATE_ERROR,
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
export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: POST_DELETE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: POST_DELETE_SUCCESS, payload: id });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Post Deleted",
        type: "success",
        msg: "Post has been deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_DELETE_ERROR,
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

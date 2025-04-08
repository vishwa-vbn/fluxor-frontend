import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

export const POST_CATEGORIES_CREATE_PENDING = "POST_CATEGORIES_CREATE_PENDING";
export const POST_CATEGORIES_CREATE_SUCCESS = "POST_CATEGORIES_CREATE_SUCCESS";
export const POST_CATEGORIES_CREATE_ERROR = "POST_CATEGORIES_CREATE_ERROR";

export const POST_CATEGORIES_FETCH_BY_POST_PENDING =
  "POST_CATEGORIES_FETCH_BY_POST_PENDING";
export const POST_CATEGORIES_FETCH_BY_POST_SUCCESS =
  "POST_CATEGORIES_FETCH_BY_POST_SUCCESS";
export const POST_CATEGORIES_FETCH_BY_POST_ERROR =
  "POST_CATEGORIES_FETCH_BY_POST_ERROR";

export const POST_CATEGORIES_FETCH_BY_CATEGORY_PENDING =
  "POST_CATEGORIES_FETCH_BY_CATEGORY_PENDING";
export const POST_CATEGORIES_FETCH_BY_CATEGORY_SUCCESS =
  "POST_CATEGORIES_FETCH_BY_CATEGORY_SUCCESS";
export const POST_CATEGORIES_FETCH_BY_CATEGORY_ERROR =
  "POST_CATEGORIES_FETCH_BY_CATEGORY_ERROR";

export const POST_CATEGORIES_DELETE_PENDING = "POST_CATEGORIES_DELETE_PENDING";
export const POST_CATEGORIES_DELETE_SUCCESS = "POST_CATEGORIES_DELETE_SUCCESS";
export const POST_CATEGORIES_DELETE_ERROR = "POST_CATEGORIES_DELETE_ERROR";

const API_URL = "https://fluxor-backend.vercel.app/api/post-categories";

// CREATE POST-CATEGORY MAPPING
export const createPostCategory = (data) => async (dispatch) => {
  dispatch({ type: POST_CATEGORIES_CREATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(API_URL, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: POST_CATEGORIES_CREATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Mapping Created",
        type: "success",
        msg: "Post-Category mapping created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_CATEGORIES_CREATE_ERROR,
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

// GET CATEGORIES BY POST ID
export const getCategoriesByPostId = (postId) => async (dispatch) => {
  dispatch({ type: POST_CATEGORIES_FETCH_BY_POST_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    dispatch({
      type: POST_CATEGORIES_FETCH_BY_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_CATEGORIES_FETCH_BY_POST_ERROR,
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

// GET POSTS BY CATEGORY ID
export const getPostsByCategoryId = (categoryId) => async (dispatch) => {
  dispatch({ type: POST_CATEGORIES_FETCH_BY_CATEGORY_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/category/${categoryId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    dispatch({
      type: POST_CATEGORIES_FETCH_BY_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_CATEGORIES_FETCH_BY_CATEGORY_ERROR,
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

// DELETE POST-CATEGORY MAPPING
export const deletePostCategory = (data) => async (dispatch) => {
  dispatch({ type: POST_CATEGORIES_DELETE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(API_URL, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    });

    dispatch({ type: POST_CATEGORIES_DELETE_SUCCESS, payload: data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Mapping Deleted",
        type: "success",
        msg: "Post-Category mapping deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_CATEGORIES_DELETE_ERROR,
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

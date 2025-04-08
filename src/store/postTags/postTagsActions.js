import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

export const POST_TAGS_CREATE_PENDING = "POST_TAGS_CREATE_PENDING";
export const POST_TAGS_CREATE_SUCCESS = "POST_TAGS_CREATE_SUCCESS";
export const POST_TAGS_CREATE_ERROR = "POST_TAGS_CREATE_ERROR";

export const POST_TAGS_FETCH_BY_POST_PENDING = "POST_TAGS_FETCH_BY_POST_PENDING";
export const POST_TAGS_FETCH_BY_POST_SUCCESS = "POST_TAGS_FETCH_BY_POST_SUCCESS";
export const POST_TAGS_FETCH_BY_POST_ERROR = "POST_TAGS_FETCH_BY_POST_ERROR";

export const POST_TAGS_FETCH_BY_TAG_PENDING = "POST_TAGS_FETCH_BY_TAG_PENDING";
export const POST_TAGS_FETCH_BY_TAG_SUCCESS = "POST_TAGS_FETCH_BY_TAG_SUCCESS";
export const POST_TAGS_FETCH_BY_TAG_ERROR = "POST_TAGS_FETCH_BY_TAG_ERROR";

export const POST_TAGS_DELETE_PENDING = "POST_TAGS_DELETE_PENDING";
export const POST_TAGS_DELETE_SUCCESS = "POST_TAGS_DELETE_SUCCESS";
export const POST_TAGS_DELETE_ERROR = "POST_TAGS_DELETE_ERROR";

const API_URL = "https://fluxor-backend.vercel.app/api/post-tags";

// CREATE POST-TAG MAPPING
export const createPostTag = (data) => async (dispatch) => {
  dispatch({ type: POST_TAGS_CREATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(API_URL, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: POST_TAGS_CREATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Mapping Created",
        type: "success",
        msg: "Post-Tag mapping created successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_TAGS_CREATE_ERROR,
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

// GET TAGS BY POST ID
export const getTagsByPostId = (postId) => async (dispatch) => {
  dispatch({ type: POST_TAGS_FETCH_BY_POST_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    dispatch({ type: POST_TAGS_FETCH_BY_POST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_TAGS_FETCH_BY_POST_ERROR,
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

// GET POSTS BY TAG ID
export const getPostsByTagId = (tagId) => async (dispatch) => {
  dispatch({ type: POST_TAGS_FETCH_BY_TAG_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/tag/${tagId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    dispatch({ type: POST_TAGS_FETCH_BY_TAG_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_TAGS_FETCH_BY_TAG_ERROR,
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

// DELETE POST-TAG MAPPING
export const deletePostTag = (data) => async (dispatch) => {
  dispatch({ type: POST_TAGS_DELETE_PENDING });
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

    dispatch({ type: POST_TAGS_DELETE_SUCCESS, payload: data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Mapping Deleted",
        type: "success",
        msg: "Post-Tag mapping deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: POST_TAGS_DELETE_ERROR,
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
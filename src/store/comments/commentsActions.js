// src/redux/actions/commentsActions.js
import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";

export const COMMENTS_CREATE_PENDING = "COMMENTS_CREATE_PENDING";
export const COMMENTS_CREATE_SUCCESS = "COMMENTS_CREATE_SUCCESS";
export const COMMENTS_CREATE_ERROR = "COMMENTS_CREATE_ERROR";

export const COMMENTS_FETCH_BY_POST_PENDING = "COMMENTS_FETCH_BY_POST_PENDING";
export const COMMENTS_FETCH_BY_POST_SUCCESS = "COMMENTS_FETCH_BY_POST_SUCCESS";
export const COMMENTS_FETCH_BY_POST_ERROR = "COMMENTS_FETCH_BY_POST_ERROR";

export const COMMENTS_FETCH_APPROVED_PENDING = "COMMENTS_FETCH_APPROVED_PENDING";
export const COMMENTS_FETCH_APPROVED_SUCCESS = "COMMENTS_FETCH_APPROVED_SUCCESS";
export const COMMENTS_FETCH_APPROVED_ERROR = "COMMENTS_FETCH_APPROVED_ERROR";

export const COMMENTS_APPROVE_PENDING = "COMMENTS_APPROVE_PENDING";
export const COMMENTS_APPROVE_SUCCESS = "COMMENTS_APPROVE_SUCCESS";
export const COMMENTS_APPROVE_ERROR = "COMMENTS_APPROVE_ERROR";

export const COMMENTS_REJECT_PENDING = "COMMENTS_REJECT_PENDING";
export const COMMENTS_REJECT_SUCCESS = "COMMENTS_REJECT_SUCCESS";
export const COMMENTS_REJECT_ERROR = "COMMENTS_REJECT_ERROR";

export const COMMENTS_DELETE_PENDING = "COMMENTS_DELETE_PENDING";
export const COMMENTS_DELETE_SUCCESS = "COMMENTS_DELETE_SUCCESS";
export const COMMENTS_DELETE_ERROR = "COMMENTS_DELETE_ERROR";

const API_URL = "https://fluxor-backend.vercel.app/api/comments";

// CREATE COMMENT
export const createComment = (data) => async (dispatch) => {
  dispatch({ type: COMMENTS_CREATE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(API_URL, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: COMMENTS_CREATE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Comment Created",
        type: "success",
        msg: "Your comment has been submitted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: COMMENTS_CREATE_ERROR,
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

// FETCH COMMENTS BY POST
export const getCommentsByPost = (postId) => async (dispatch) => {
  dispatch({ type: COMMENTS_FETCH_BY_POST_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/post/${postId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    dispatch({ type: COMMENTS_FETCH_BY_POST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COMMENTS_FETCH_BY_POST_ERROR,
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

// FETCH APPROVED COMMENTS BY POST
export const getApprovedComments = (postId) => async (dispatch) => {
  dispatch({ type: COMMENTS_FETCH_APPROVED_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/post/${postId}?status=approved`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    dispatch({ type: COMMENTS_FETCH_APPROVED_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COMMENTS_FETCH_APPROVED_ERROR,
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

// APPROVE COMMENT
export const approveComment = (commentId) => async (dispatch) => {
  dispatch({ type: COMMENTS_APPROVE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.put(`${API_URL}/${commentId}/approve`, null, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({ type: COMMENTS_APPROVE_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Comment Approved",
        type: "success",
        msg: "Comment has been approved successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: COMMENTS_APPROVE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Approval Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// REJECT COMMENT
export const rejectComment = (commentId) => async (dispatch) => {
  dispatch({ type: COMMENTS_REJECT_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.put(`${API_URL}/${commentId}/reject`, null, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({ type: COMMENTS_REJECT_SUCCESS, payload: res.data });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Comment Rejected",
        type: "success",
        msg: "Comment has been rejected successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: COMMENTS_REJECT_ERROR,
      payload: err.response?.data?.message || err.message,
    });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Rejection Failed",
        type: "error",
        msg: err.response?.data?.message || err.message,
      })
    );
  } finally {
    dispatch(hideLoader());
  }
};

// DELETE COMMENT
export const deleteComment = (commentId) => async (dispatch) => {
  dispatch({ type: COMMENTS_DELETE_PENDING });
  dispatch(showLoader());
  const token = getState().auth?.loginUser?.token;

  try {
    await axios.delete(`${API_URL}/${commentId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch({ type: COMMENTS_DELETE_SUCCESS, payload: commentId });
    dispatch(
      showAlert({
        isOpen: true,
        title: "Comment Deleted",
        type: "success",
        msg: "Comment has been deleted successfully.",
      })
    );
  } catch (err) {
    dispatch({
      type: COMMENTS_DELETE_ERROR,
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
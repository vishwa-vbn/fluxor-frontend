import axios from "axios";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { actionTypes } from "./postReducer";

export function createPost(postData) {
  return (dispatch) => {
    // Basic validation
    if (!postData.title || !postData.content) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Post Creation Error",
          type: "error",
          msg: "Title and content are required.",
        })
      );
      dispatch({
        type: actionTypes.CREATE_POST_ERROR,
        payload: {
          postPending: false,
          postSuccess: false,
          postError: "Title and content are required.",
          createdPost: null,
        },
      });
      return;
    }

    // Show loader
    dispatch(showLoader());

    // Set pending state
    dispatch({
      type: actionTypes.CREATE_POST_PENDING,
      payload: {
        postPending: true,
        postSuccess: false,
        postError: null,
        createdPost: null,
      },
    });

    // API call to create post
    axios
      .post("https://fluxor-backend.vercel.app/api/posts/create", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming token is stored in localStorage
        },
      })
      .then((response) => {
        dispatch(
          showAlert({
            isOpen: true,
            title: "Post Created",
            type: "success",
            msg: `Post ${postData.status === "draft" ? "saved as draft" : "published"} successfully!`,
          })
        );

        dispatch({
          type: actionTypes.CREATE_POST_SUCCESS,
          payload: {
            postPending: false,
            postSuccess: true,
            postError: null,
            createdPost: response.data.post, // Assuming API returns the created post
          },
        });

        dispatch(hideLoader());

        // Return post data for component-level handling (e.g., redirection)
        return response.data.post;
      })
      .catch((err) => {
        dispatch(hideLoader());

        dispatch(
          showAlert({
            isOpen: true,
            title: "Post Creation Failed",
            type: "error",
            msg: err.response?.data?.message || "Failed to create post.",
          })
        );

        dispatch({
          type: actionTypes.CREATE_POST_ERROR,
          payload: {
            postPending: false,
            postSuccess: false,
            postError: err.response?.data?.message || "Failed to create post.",
            createdPost: null,
          },
        });

        throw err; // Re-throw for component-level error handling
      });
  };
}
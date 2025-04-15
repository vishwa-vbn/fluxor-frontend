// import axios from "axios";
// import { getState } from "../configure/configureStore";
// import { showAlert } from "../alert/alertActions";
// import { showLoader, hideLoader } from "../loader/loaderActions";

// export const POST_CATEGORIES_CREATE_PENDING = "POST_CATEGORIES_CREATE_PENDING";
// export const POST_CATEGORIES_CREATE_SUCCESS = "POST_CATEGORIES_CREATE_SUCCESS";
// export const POST_CATEGORIES_CREATE_ERROR = "POST_CATEGORIES_CREATE_ERROR";

// export const POST_CATEGORIES_FETCH_BY_POST_PENDING =
//   "POST_CATEGORIES_FETCH_BY_POST_PENDING";
// export const POST_CATEGORIES_FETCH_BY_POST_SUCCESS =
//   "POST_CATEGORIES_FETCH_BY_POST_SUCCESS";
// export const POST_CATEGORIES_FETCH_BY_POST_ERROR =
//   "POST_CATEGORIES_FETCH_BY_POST_ERROR";

// export const POST_CATEGORIES_FETCH_BY_CATEGORY_PENDING =
//   "POST_CATEGORIES_FETCH_BY_CATEGORY_PENDING";
// export const POST_CATEGORIES_FETCH_BY_CATEGORY_SUCCESS =
//   "POST_CATEGORIES_FETCH_BY_CATEGORY_SUCCESS";
// export const POST_CATEGORIES_FETCH_BY_CATEGORY_ERROR =
//   "POST_CATEGORIES_FETCH_BY_CATEGORY_ERROR";

// export const POST_CATEGORIES_DELETE_PENDING = "POST_CATEGORIES_DELETE_PENDING";
// export const POST_CATEGORIES_DELETE_SUCCESS = "POST_CATEGORIES_DELETE_SUCCESS";
// export const POST_CATEGORIES_DELETE_ERROR = "POST_CATEGORIES_DELETE_ERROR";

// // const API_URL = "https://fluxor-backend.vercel.app/api/post-categories";
// const API_URL = "http://localhost:3000/api/post-categories";


// // CREATE POST-CATEGORY MAPPING
// export const createPostCategory = (data) => async (dispatch) => {
//   dispatch({ type: POST_CATEGORIES_CREATE_PENDING });
//   dispatch(showLoader());
//   const token = getState().auth?.loginUser?.token;

//   try {
//     const res = await axios.post(API_URL, data, {
//       headers: {
//         Authorization: `${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     dispatch({ type: POST_CATEGORIES_CREATE_SUCCESS, payload: res.data });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Mapping Created",
//         type: "success",
//         msg: "Post-Category mapping created successfully.",
//       })
//     );
//   } catch (err) {
//     dispatch({
//       type: POST_CATEGORIES_CREATE_ERROR,
//       payload: err.response?.data?.message || err.message,
//     });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Creation Failed",
//         type: "error",
//         msg: err.response?.data?.message || err.message,
//       })
//     );
//   } finally {
//     dispatch(hideLoader());
//   }
// };

// // GET CATEGORIES BY POST ID
// export const getCategoriesByPostId = (postId) => async (dispatch) => {
//   dispatch({ type: POST_CATEGORIES_FETCH_BY_POST_PENDING });
//   dispatch(showLoader());
//   const token = getState().auth?.loginUser?.token;

//   try {
//     const res = await axios.get(`${API_URL}/post/${postId}`, {
//       headers: {
//         Authorization: `${token}`,
//       },
//     });
//     dispatch({
//       type: POST_CATEGORIES_FETCH_BY_POST_SUCCESS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_CATEGORIES_FETCH_BY_POST_ERROR,
//       payload: err.response?.data?.message || err.message,
//     });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Fetch Error",
//         type: "error",
//         msg: err.response?.data?.message || err.message,
//       })
//     );
//   } finally {
//     dispatch(hideLoader());
//   }
// };

// // GET POSTS BY CATEGORY ID
// export const getPostsByCategoryId = (categoryId) => async (dispatch) => {
//   dispatch({ type: POST_CATEGORIES_FETCH_BY_CATEGORY_PENDING });
//   dispatch(showLoader());
//   const token = getState().auth?.loginUser?.token;

//   try {
//     const res = await axios.get(`${API_URL}/category/${categoryId}`, {
//       headers: {
//         Authorization: `${token}`,
//       },
//     });
//     dispatch({
//       type: POST_CATEGORIES_FETCH_BY_CATEGORY_SUCCESS,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_CATEGORIES_FETCH_BY_CATEGORY_ERROR,
//       payload: err.response?.data?.message || err.message,
//     });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Fetch Error",
//         type: "error",
//         msg: err.response?.data?.message || err.message,
//       })
//     );
//   } finally {
//     dispatch(hideLoader());
//   }
// };

// // DELETE POST-CATEGORY MAPPING
// export const deletePostCategory = (data) => async (dispatch) => {
//   dispatch({ type: POST_CATEGORIES_DELETE_PENDING });
//   dispatch(showLoader());
//   const token = getState().auth?.loginUser?.token;

//   try {
//     await axios.delete(API_URL, {
//       headers: {
//         Authorization: `${token}`,
//         "Content-Type": "application/json",
//       },
//       data: data,
//     });

//     dispatch({ type: POST_CATEGORIES_DELETE_SUCCESS, payload: data });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Mapping Deleted",
//         type: "success",
//         msg: "Post-Category mapping deleted successfully.",
//       })
//     );
//   } catch (err) {
//     dispatch({
//       type: POST_CATEGORIES_DELETE_ERROR,
//       payload: err.response?.data?.message || err.message,
//     });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Deletion Failed",
//         type: "error",
//         msg: err.response?.data?.message || err.message,
//       })
//     );
//   } finally {
//     dispatch(hideLoader());
//   }
// };



// src/store/postCategories/postCategoriesActions.js
import axios from "axios";
import { getState } from "../configure/configureStore";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import io from "socket.io-client";

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

// const API_URL = "https://fluxor-backend.vercel.app/api/post-categories";
const API_URL = "https://fluxor-backend-production.up.railway.app/api/post-categories";

const SOCKRT_API_URL = "https://fluxor-backend-production.up.railway.app";

// Initialize Socket.IO dynamically
let socket = null;

// Initialize Socket.IO listeners for real-time post category updates
export const initializePostCategorySocket = () => (dispatch) => {
  if (socket) {
    console.log("Socket.IO already initialized");
    return;
  }

  const token = getState().auth?.loginUser?.token || "";
  socket = io(`${SOCKRT_API_URL}/blog`, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ["websocket"],
    auth: { token },
  });


  socket.on("connect", () => {
    console.log("Connected to Socket.IO server (blog namespace)");
  });

  socket.on("post_category_change", (payload) => {
    console.log("Post category change received:", payload);
    switch (payload.operation) {
      case "INSERT":
        dispatch({
          type: POST_CATEGORIES_CREATE_SUCCESS,
          payload: payload.record,
        });
        break;
      case "UPDATE":
        dispatch({
          type: POST_CATEGORIES_CREATE_SUCCESS, // Reuse CREATE_SUCCESS as UPDATE is rare for junction table
          payload: payload.record,
        });
        break;
      case "DELETE":
        dispatch({
          type: POST_CATEGORIES_DELETE_SUCCESS,
          payload: payload.record,
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
export const cleanupPostCategorySocket = () => () => {
  if (socket) {
    socket.off("post_category_change");
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.disconnect();
    socket = null;
    console.log("Socket.IO cleaned up");
  }
};

// CREATE POST-CATEGORY MAPPING
export const createPostCategory = (data) => async (dispatch) => {
  dispatch({ type: POST_CATEGORIES_CREATE_PENDING });
  // dispatch(showLoader());
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
  // dispatch(showLoader());
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
  // dispatch(showLoader());
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
  // dispatch(showLoader());
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
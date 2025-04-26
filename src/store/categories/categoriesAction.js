// import axios from "axios";
// import { getState } from "../configure/configureStore";
// import { showAlert } from "../alert/alertActions";
// import { showLoader, hideLoader } from "../loader/loaderActions";

// // Action Types
// export const CATEGORY_CREATE_PENDING = "CATEGORY_CREATE_PENDING";
// export const CATEGORY_CREATE_SUCCESS = "CATEGORY_CREATE_SUCCESS";
// export const CATEGORY_CREATE_ERROR = "CATEGORY_CREATE_ERROR";

// export const CATEGORY_FETCH_ALL_PENDING = "CATEGORY_FETCH_ALL_PENDING";
// export const CATEGORY_FETCH_ALL_SUCCESS = "CATEGORY_FETCH_ALL_SUCCESS";
// export const CATEGORY_FETCH_ALL_ERROR = "CATEGORY_FETCH_ALL_ERROR";

// export const CATEGORY_FETCH_ONE_PENDING = "CATEGORY_FETCH_ONE_PENDING";
// export const CATEGORY_FETCH_ONE_SUCCESS = "CATEGORY_FETCH_ONE_SUCCESS";
// export const CATEGORY_FETCH_ONE_ERROR = "CATEGORY_FETCH_ONE_ERROR";

// export const CATEGORY_UPDATE_PENDING = "CATEGORY_UPDATE_PENDING";
// export const CATEGORY_UPDATE_SUCCESS = "CATEGORY_UPDATE_SUCCESS";
// export const CATEGORY_UPDATE_ERROR = "CATEGORY_UPDATE_ERROR";

// export const CATEGORY_DELETE_PENDING = "CATEGORY_DELETE_PENDING";
// export const CATEGORY_DELETE_SUCCESS = "CATEGORY_DELETE_SUCCESS";
// export const CATEGORY_DELETE_ERROR = "CATEGORY_DELETE_ERROR";

// // Base API URL
// const API_URL = "{DOMAIN_URL}/api/categories";

// // CREATE CATEGORY
// export const createCategory = (data) => async (dispatch) => {
//   dispatch({ type: CATEGORY_CREATE_PENDING });
//   dispatch(showLoader());

//   const token = getState().auth?.loginUser?.token;

//   try {
//     const res = await axios.post(API_URL, data, {
//       headers: {
//         Authorization: `${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: res.data });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Category Created",
//         type: "success",
//         msg: "New category has been created successfully.",
//       })
//     );
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_CREATE_ERROR,
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

// // GET ALL CATEGORIES
// export const getAllCategories = () => async (dispatch) => {
//   dispatch({ type: CATEGORY_FETCH_ALL_PENDING });
//   dispatch(showLoader());

//   const token = getState().auth?.loginUser?.token;

//   try {
//     const res = await axios.get(API_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     dispatch({ type: CATEGORY_FETCH_ALL_SUCCESS, payload: res.data });
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_FETCH_ALL_ERROR,
//       payload: err.response?.data?.message || err.message,
//     });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Fetch Failed",
//         type: "error",
//         msg: err.response?.data?.message || err.message,
//       })
//     );
//   } finally {
//     dispatch(hideLoader());
//   }
// };

// // GET CATEGORY BY ID
// export const getCategoryById = (id) => async (dispatch) => {
//   dispatch({ type: CATEGORY_FETCH_ONE_PENDING });
//   dispatch(showLoader());

//   const token = getState().auth?.loginUser?.token;

//   try {
//     const res = await axios.get(`${API_URL}/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     dispatch({ type: CATEGORY_FETCH_ONE_SUCCESS, payload: res.data });
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_FETCH_ONE_ERROR,
//       payload: err.response?.data?.message || err.message,
//     });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Fetch Failed",
//         type: "error",
//         msg: err.response?.data?.message || err.message,
//       })
//     );
//   } finally {
//     dispatch(hideLoader());
//   }
// };

// // UPDATE CATEGORY
// export const updateCategory = (id, data) => async (dispatch) => {
//   dispatch({ type: CATEGORY_UPDATE_PENDING });
//   dispatch(showLoader());

//   const token = getState().auth?.loginUser?.token;

//   try {
//     const res = await axios.put(`${API_URL}/${id}`, data, {
//       headers: {
//         Authorization: `${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: res.data });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Category Updated",
//         type: "success",
//         msg: "Category updated successfully.",
//       })
//     );
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_UPDATE_ERROR,
//       payload: err.response?.data?.message || err.message,
//     });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Update Failed",
//         type: "error",
//         msg: err.response?.data?.message || err.message,
//       })
//     );
//   } finally {
//     dispatch(hideLoader());
//   }
// };

// // DELETE CATEGORY
// export const deleteCategory = (id) => async (dispatch) => {
//   dispatch({ type: CATEGORY_DELETE_PENDING });
//   dispatch(showLoader());

//   const token = getState().auth?.loginUser?.token;

//   try {
//     const res = await axios.delete(`${API_URL}/${id}`, {
//       headers: {
//         Authorization: `${token}`,
//       },
//     });

//     dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: res.data });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Category Deleted",
//         type: "success",
//         msg: "Category has been deleted successfully.",
//       })
//     );
//   } catch (err) {
//     dispatch({
//       type: CATEGORY_DELETE_ERROR,
//       payload: err.response?.data?.message || err.message,
//     });
//     dispatch(
//       showAlert({
//         isOpen: true,
//         title: "Delete Failed",
//         type: "error",
//         msg: err.response?.data?.message || err.message,
//       })
//     );
//   } finally {
//     dispatch(hideLoader());
//   }
// };
import axios from "axios";
import { getState } from "../configure/configureStore";
import io from "socket.io-client";
import { DOMAIN } from "../../constants/env";

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

// API Configuration
const API_URL = `${DOMAIN}`;

// Initialize Socket.IO dynamically
let socket = null;

// Initialize Socket.IO listeners for real-time category updates
export const initializeCategorySocket = () => (dispatch) => {
  if (socket) {
    return;
  }

  const token = getState().auth?.loginUser?.token || "";
  socket = io(`${API_URL}/blog`, {
    reconnection: true,
    transports: ["polling", "websocket"],
    auth: { token },
    perMessageDeflate: {
      threshold: 1024, // Compress messages larger than 1KB
    },
  });

  socket.on("connect", () => {
   
  });

  socket.on("category_change", (payload) => {
    switch (payload.operation) {
      case "create":
        dispatch({
          type: CATEGORY_CREATE_SUCCESS,
          payload: payload.category,
        });
        break;
      case "update":
        dispatch({
          type: CATEGORY_UPDATE_SUCCESS,
          payload: payload.category,
        });
        break;
      case "delete":
        dispatch({
          type: CATEGORY_DELETE_SUCCESS,
          payload: payload.category.id,
        });
        break;
      default:
        console.warn("Unknown operation:", payload.operation);
    }
  });

  socket.on("connect_error", (error) => {
    console.error("Socket.IO connection error:", error.message);
  });

  socket.on("disconnect", () => {
  });
};

// Cleanup Socket.IO listeners
export const cleanupCategorySocket = () => () => {
  if (socket) {
    socket.off("category_change");
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.disconnect();
    socket = null;
  }
};

// CREATE CATEGORY
export const createCategory = (data) => async (dispatch) => {
  dispatch({ type: CATEGORY_CREATE_PENDING });

  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.post(`${API_URL}/api/categories`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch(getAllCategories())

    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: res.data });

  } catch (err) {
    dispatch({
      type: CATEGORY_CREATE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// GET ALL CATEGORIES
export const getAllCategories = () => async (dispatch) => {
  dispatch({ type: CATEGORY_FETCH_ALL_PENDING });

  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/api/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: CATEGORY_FETCH_ALL_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CATEGORY_FETCH_ALL_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// GET CATEGORY BY ID
export const getCategoryById = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY_FETCH_ONE_PENDING });

  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.get(`${API_URL}/api/categories/${id}`, {
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
  }
};

// UPDATE CATEGORY
export const updateCategory = (id, data) => async (dispatch) => {
  dispatch({ type: CATEGORY_UPDATE_PENDING });

  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.put(`${API_URL}/api/categories/${id}`, data, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(getAllCategories())

    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: res.data });

  } catch (err) {
    dispatch({
      type: CATEGORY_UPDATE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = (id) => async (dispatch) => {
  dispatch({ type: CATEGORY_DELETE_PENDING });

  const token = getState().auth?.loginUser?.token;

  try {
    const res = await axios.delete(`${API_URL}/api/categories/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    dispatch(getAllCategories())
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: CATEGORY_DELETE_ERROR,
      payload: err.response?.data?.message || err.message,
    });
  }
};
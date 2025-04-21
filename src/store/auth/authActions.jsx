
// src/store/auth/authActions.js
import axios from "axios";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import { getState } from "../configure/configureStore";
import io from "socket.io-client";
import { actionTypes } from "./authReducer";

// API Configuration
const API_URL = "https://fluxor-backend-production.up.railway.app"; // Use Vite env
// const API_URL = "http://localhost:3000"; // Use Vite env


// Initialize Socket.IO dynamically
let socket = null;

// Initialize Socket.IO listeners for real-time user updates
export const initializeUserSocket = () => (dispatch, getState) => {
  if (socket) {
    console.log("Socket.IO already initialized for users");
    return;
  }

  const token = getState().auth?.loginUser?.token || "";
  socket = io(`${API_URL}/blog`, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ["websocket"],
    auth: { token },
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.IO server (blog namespace - users)");
  });

  socket.on("user_change", (payload) => {
    console.log("User change received:", payload);
    switch (payload.operation) {
      case "INSERT":
        dispatch({
          type: actionTypes.FETCH_USERS_SUCCESS,
          payload: {
            fetchUsersPending: false,
            fetchUsersSuccess: true,
            fetchUsersError: null,
            users: [...getState().auth.users, payload.record], // Append new user
          },
        });
       
        break;
      case "UPDATE":
        dispatch({
          type: actionTypes.UPDATE_USER_SUCCESS,
          payload: {
            updatedUser: payload.record,
          },
        });
       
        break;
      case "DELETE":
        dispatch({
          type: actionTypes.DELETE_USER_SUCCESS,
          payload: {
            deletedUserId: payload.old_record.id,
          },
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
    console.log("Disconnected from Socket.IO server (users)");
  });
};

// Cleanup Socket.IO listeners
export const cleanupUserSocket = () => () => {
  if (socket) {
    socket.off("user_change");
    socket.off("connect");
    socket.off("connect_error");
    socket.off("disconnect");
    socket.disconnect();
    socket = null;
    console.log("Socket.IO cleaned up for users");
  }
};

// Update Socket.IO token after login
export const updateSocketToken = (token) => () => {
  if (socket) {
    socket.auth.token = token;
    socket.connect();
    console.log("Socket.IO token updated for users");
  }
};

// Fetch All Users
export function fetchAllUsers() {
  return (dispatch) => {
    const token = getState().auth?.loginUser?.token;

    if (!token) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Authentication Error",
          type: "error",
          msg: "You need to be logged in to fetch users.",
        })
      );
      dispatch({
        type: actionTypes.FETCH_USERS_ERROR,
        payload: {
          fetchUsersPending: false,
          fetchUsersSuccess: false,
          fetchUsersError: "No access token available.",
          users: [],
        },
      });
      return;
    }

    // dispatch(showLoader());
    dispatch({
      type: actionTypes.FETCH_USERS_PENDING,
      payload: {
        fetchUsersPending: true,
        fetchUsersSuccess: false,
        fetchUsersError: null,
        users: [],
      },
    });

    axios
      .get(`${API_URL}/api/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.FETCH_USERS_SUCCESS,
          payload: {
            fetchUsersPending: false,
            fetchUsersSuccess: true,
            fetchUsersError: null,
            users: response.data,
          },
        });
       
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.FETCH_USERS_ERROR,
          payload: {
            fetchUsersPending: false,
            fetchUsersSuccess: false,
            fetchUsersError:
              err.response?.data?.error || "Failed to fetch users.",
            users: [],
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Fetch Failed",
            type: "error",
            msg: err.response?.data?.error || "Failed to fetch users.",
          })
        );
      });
  };
}

// Update User
export function updateUser(userId, userData) {
  return (dispatch) => {
    const token = getState().auth?.loginUser?.token;

    if (!token) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Authentication Error",
          type: "error",
          msg: "You need to be logged in to update users.",
        })
      );
      return;
    }

    // dispatch(showLoader());

    axios
      .put(`${API_URL}/api/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.UPDATE_USER_SUCCESS,
          payload: {
            updatedUser: response.data,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "User Updated",
            type: "success",
            msg: "User has been successfully updated.",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.UPDATE_USER_ERROR,
          payload: {
            updateUserError:
              err.response?.data?.error || "Failed to update user.",
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Update Failed",
            type: "error",
            msg: err.response?.data?.error || "Failed to update user.",
          })
        );
      });
  };
}

// Fetch Targeted User
export function fetchTargetedUser(userId) {
  return (dispatch) => {
    const token = getState().auth?.loginUser?.token;

    if (!token) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Authentication Error",
          type: "error",
          msg: "You need to be logged in to fetch user data.",
        })
      );
      return;
    }

    // dispatch(showLoader());
    dispatch({
      type: actionTypes.FETCH_TARGETED_USER_PENDING,
      payload: {
        fetchTargetedUserPending: true,
        fetchTargetedUserSuccess: false,
        fetchTargetedUserError: null,
      },
    });

    axios
      .get(`${API_URL}/api/users/data/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.FETCH_TARGETED_USER_SUCCESS,
          payload: {
            fetchTargetedUserPending: false,
            fetchTargetedUserSuccess: true,
            fetchTargetedUserError: null,
            targetedUser: {
              user: response.data.user,
              permissions: response.data.permissions,
            },
          },
        });
       
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.FETCH_TARGETED_USER_ERROR,
          payload: {
            fetchTargetedUserPending: false,
            fetchTargetedUserSuccess: false,
            fetchTargetedUserError:
              err.response?.data?.error || "Failed to fetch user data.",
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Fetch Failed",
            type: "error",
            msg: err.response?.data?.error || "Failed to fetch user data.",
          })
        );
      });
  };
}

// Delete User
export function deleteUser(userId) {
  return (dispatch) => {
    const token = getState().auth?.loginUser?.token;

    if (!token) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Authentication Error",
          type: "error",
          msg: "You need to be logged in to delete users.",
        })
      );
      return;
    }

    // dispatch(showLoader());

    axios
      .delete(`${API_URL}/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.DELETE_USER_SUCCESS,
          payload: {
            deletedUserId: userId,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "User Deleted",
            type: "success",
            msg: "User has been successfully deleted.",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.DELETE_USER_ERROR,
          payload: {
            deleteUserError:
              err.response?.data?.error || "Failed to delete user.",
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Delete Failed",
            type: "error",
            msg: err.response?.data?.error || "Failed to delete user.",
          })
        );
      });
  };
}

// Bulk Delete Users
export function bulkDeleteUsers(userIds) {
  return (dispatch) => {
    const token = getState().auth?.loginUser?.token;

    if (!token) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Authentication Error",
          type: "error",
          msg: "You need to be logged in to bulk delete users.",
        })
      );
      return;
    }

    // dispatch(showLoader());

    axios
      .post(
        `${API_URL}/api/users/bulk-delete`,
        { userIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.BULK_DELETE_USERS_SUCCESS,
          payload: {
            deletedUserIds: userIds,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Users Deleted",
            type: "success",
            msg: "Selected users have been successfully deleted.",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.BULK_DELETE_USERS_ERROR,
          payload: {
            bulkDeleteError:
              err.response?.data?.error || "Failed to bulk delete users.",
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Bulk Delete Failed",
            type: "error",
            msg: err.response?.data?.error || "Failed to bulk delete users.",
          })
        );
      });
  };
}

// Login
export function login(email, password) {
  return (dispatch) => {
    if (!email || !password) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Login Error",
          type: "error",
          msg: "Fill all the fields.",
        })
      );
      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: {
          authPending: false,
          authSuccess: false,
          authError: "Fill all the fields.",
          accessToken: null,
          refreshToken: null,
          profileurl: null,
          loginUser: null,
        },
      });
      return;
    }

    // dispatch(showLoader());
    dispatch({
      type: actionTypes.AUTH_PENDING,
      payload: {
        authPending: true,
        authSuccess: false,
        authError: null,
        accessToken: null,
        refreshToken: null,
        profileurl: null,
        loginUser: null,
      },
    });

    axios
      .post(`${API_URL}/api/users/login`, { email, password })
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            authPending: false,
            authSuccess: true,
            authError: null,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            profileurl: null,
            loginUser: response.data,
          },
        });
        dispatch(updateSocketToken(response.data.accessToken)); // Update Socket.IO token
        dispatch(
          showAlert({
            isOpen: true,
            title: "Login Successful",
            type: "success",
            msg: "Welcome back!",
          })
        );
        dispatch(handleRedirect(response.data.user.roleid, response.data.user.role));
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: err.response?.data?.error || "Enter valid credentials",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Login Failed",
            type: "error",
            msg: err.response?.data?.error || "Enter valid credentials",
          })
        );
      });
  };
}

// Handle Redirect
export function handleRedirect(roleid, rolename) {
  return (dispatch) => {
    setTimeout(() => {
      if (rolename === "admin" || roleid === 1) {
        window.location.href = "/dashboard";
      } else if (rolename === "user" || roleid === 4) {
        window.location.href = "/home";
      } else {
        window.location.href = "/default";
      }
    }, 3000);
  };
}

// Register
export function register(name, email, password) {
  return (dispatch) => {
    if (!email || !password || !name) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Registration Error",
          type: "error",
          msg: "Fill all the fields.",
        })
      );
      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: {
          authPending: false,
          authSuccess: false,
          authError: "Fill all the fields.",
          accessToken: null,
          refreshToken: null,
          profileurl: null,
          loginUser: null,
        },
      });
      return;
    }

    // dispatch(showLoader());
    dispatch({
      type: actionTypes.AUTH_PENDING,
      payload: {
        authPending: true,
        authSuccess: false,
        authError: null,
        accessToken: null,
        refreshToken: null,
        profileurl: null,
        loginUser: null,
      },
    });

    axios
      .post(`${API_URL}/api/users/register`, {
        username: name,
        email,
        password,
      })
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            authPending: false,
            authSuccess: true,
            authError: null,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            profileurl: null,
            loginUser: response.data,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Successful",
            type: "success",
            msg: "Welcome to the platform!",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: err.response?.data?.error || "Enter valid credentials",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Failed",
            type: "error",
            msg: err.response?.data?.error || "Enter valid credentials",
          })
        );
      });
  };
}

// Register Admin
export function registerAdmin(name, email, password) {
  return (dispatch) => {
    if (!email || !password || !name) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Registration Error",
          type: "error",
          msg: "Fill all the fields.",
        })
      );
      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: {
          authPending: false,
          authSuccess: false,
          authError: "Fill all the fields.",
          accessToken: null,
          refreshToken: null,
          profileurl: null,
          loginUser: null,
        },
      });
      return;
    }

    // dispatch(showLoader());
    dispatch({
      type: actionTypes.AUTH_PENDING,
      payload: {
        authPending: true,
        authSuccess: false,
        authError: null,
        accessToken: null,
        refreshToken: null,
        profileurl: null,
        loginUser: null,
      },
    });

    axios
      .post(`${API_URL}/api/users/register/admin`, {
        username: name,
        email,
        password,
      })
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            authPending: false,
            authSuccess: true,
            authError: null,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            profileurl: null,
            loginUser: response.data,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Successful",
            type: "success",
            msg: "Admin account created!",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: err.response?.data?.error || "Enter valid credentials",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Failed",
            type: "error",
            msg: err.response?.data?.error || "Enter valid credentials",
          })
        );
      });
  };
}

// Forgot Password
export function forgotPassword(email) {
  return (dispatch) => {
    if (!email) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Missing Email",
          type: "error",
          msg: "Please enter your email.",
        })
      );
      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: {
          authPending: false,
          authSuccess: false,
          authError: "Please enter your email.",
          accessToken: null,
          refreshToken: null,
          profileurl: null,
          loginUser: null,
        },
      });
      return;
    }

    // dispatch(showLoader());
    dispatch({
      type: actionTypes.AUTH_PENDING,
      payload: {
        authPending: true,
        authSuccess: false,
        authError: null,
        accessToken: null,
        refreshToken: null,
        profileurl: null,
        loginUser: null,
      },
    });

    axios
      .post(`${API_URL}/api/users/forgot-password`, { email })
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            authPending: false,
            authSuccess: true,
            authError: null,
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Email Sent",
            type: "success",
            msg: "Password reset link sent to your email!",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: err.response?.data?.error || "Email not found or server error.",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Failed",
            type: "error",
            msg: err.response?.data?.error || "Email not found or server error.",
          })
        );
      });
  };
}

// Reset Password
export function resetPassword(newPassword, token) {
  return (dispatch) => {
    if (!token || !newPassword) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Missing Fields",
          type: "error",
          msg: "Token and new password are required.",
        })
      );
//       dispatch({
//         type: actionTypes.AUTH_ERROR,
//         payload: {
//  Ascendantly: {
//           authPending: false,
//           authSuccess: false,
//           authError: "Token and new password are required.",
//           accessToken: null,
//           refreshToken: null,
//           profileurl: null,
//           loginUser: null,
//         },
//       });
      return;
    }

    // dispatch(showLoader());
    dispatch({
      type: actionTypes.AUTH_PENDING,
      payload: {
        authPending: true,
        authSuccess: false,
        authError: null,
        accessToken: null,
        refreshToken: null,
        profileurl: null,
        loginUser: null,
      },
    });

    axios
      .post(`${API_URL}/api/users/reset-password?token=${token}`, { newPassword })
      .then((response) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            authPending: false,
            authSuccess: true,
            authError: null,
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: response.data,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Password Reset",
            type: "success",
            msg: "Your password has been reset successfully!",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: err.response?.data?.error || "Reset password failed. Try again.",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
        dispatch(
          showAlert({
            isOpen: true,
            title: "Reset Failed",
            type: "error",
            msg: err.response?.data?.error || "Reset password failed. Try again.",
          })
        );
      });
  };
}

// Register Normal User
export function registerNormalUser(username, email, password, name, bio, avatar, role) {
  return (dispatch) => {
    if (!email || !password || !name || !username || !bio || !avatar || !role) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Registration Error",
          type: "error",
          msg: "Fill all the fields.",
        })
      );
      return;
    }

    // dispatch(showLoader());

    axios
      .post(`${API_URL}/api/users/register`, {
        username,
        email,
        password,
        name,
        bio,
        avatar,
        role,
      })
      .then((response) => {
        dispatch(hideLoader());
        dispatch(
          showAlert({
            isOpen: true,
            title: "User Added Successful",
            type: "success",
            msg: "Welcome to the platform!",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Failed",
            type: "error",
            msg: err.response?.data?.error || "Enter valid credentials",
          })
        );
      });
  };
}

// Register Normal Admin User
export function registerNormalAdminUser(username, email, password, name, bio, avatar, role) {
  return (dispatch) => {
    if (!email || !password || !name || !username || !bio || !avatar || !role) {
      dispatch(
        showAlert({
          isOpen: true,
          title: "Registration Error",
          type: "error",
          msg: "Fill all the fields.",
        })
      );
      return;
    }

    // dispatch(showLoader());

    axios
      .post(`${API_URL}/api/users/register/admin`, {
        username,
        email,
        password,
        name,
        bio,
        avatar,
        role,
      })
      .then((response) => {
        dispatch(hideLoader());
        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Successful",
            type: "success",
            msg: "Admin account created!",
          })
        );
      })
      .catch((err) => {
        dispatch(hideLoader());
        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Failed",
            type: "error",
            msg: err.response?.data?.error || "Enter valid credentials",
          })
        );
      });
  };
}

// Update Token
export function updateToken(token, refreshToken) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_TOKEN_SUCCESS,
      payload: {
        accessToken: token,
        refreshToken: refreshToken,
      },
    });
    dispatch(updateSocketToken(token)); // Update Socket.IO token
  };
}
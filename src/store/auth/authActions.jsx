// import Api from "../../service/api";
import { showAlert } from "../alert/alertActions";
import { showLoader, hideLoader } from "../loader/loaderActions";
import Api from "../../service/api";

import { actionTypes } from "./authReducer";
import axios from "axios";

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

    dispatch(showLoader());


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
      .post("https://fluxor-backend.vercel.app/api/users/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("response is", response);



        dispatch(
          handleRedirect(response.data.user.roleid, response.data.user.role)
        );

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
            title: "Login Successful",
            type: "success",
            msg: "Welcome back!",
          })
        );

      dispatch(hideLoader());

      })
      .catch((err) => {

      dispatch(hideLoader());

        dispatch(
          showAlert({
            isOpen: true,
            title: "Login Failed",
            type: "error",
            msg: "Enter valid credentials",
          })
        );

        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: "Enter valid credentials",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
      });
  };
}

export function handleRedirect(roleid, rolename) {
  console.log("role id", roleid, rolename);
  return (dispatch) => {
    setTimeout(() => {
      if (rolename === "admin" || roleid === 1) {
        window.location.href = "/dashboard";
      } else if (rolename === "user" || roleid === 4) {
        window.location.href = "/home";
      } else {
        window.location.href = "/default";
      }
    }, 3000); // 3000 milliseconds = 3 seconds
  };
}

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
      .post("https://fluxor-backend.vercel.app/api/users/register", {
        username: name,
        email,
        password,
      })
      .then((response) => {
        console.log("Registration response:", response);

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
        console.error("Registration error:", err);

        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Failed",
            type: "error",
            msg: "Enter valid credentials",
          })
        );

        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: "Enter valid credentials",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
      });
  };
}

export function registerAdmin(name, email, password) {
  console.log("register admin called", name, email, password);
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
      .post("https://fluxor-backend.vercel.app/api/users/register/admin", {
        username: name,
        email,
        password,
      })
      .then((response) => {
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
        dispatch(
          showAlert({
            isOpen: true,
            title: "Registration Failed",
            type: "error",
            msg: "Enter valid credentials",
          })
        );

        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: "Enter valid credentials",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
      });
  };
}

export function forgotPassword(email) {
  console.log("Forgot Password Email:", email);

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
      .post("https://fluxor-backend.vercel.app/api/users/forgot-password", {
        email,
      })
      .then((response) => {
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

        console.log("Forgot password email sent:", response.data);
      })
      .catch((err) => {
        dispatch(
          showAlert({
            isOpen: true,
            title: "Failed",
            type: "error",
            msg: "Email not found or server error.",
          })
        );

        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: "Email not found or server error.",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });

        console.error("Forgot password error:", err);
      });
  };
}

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

      dispatch({
        type: actionTypes.AUTH_ERROR,
        payload: {
          authPending: false,
          authSuccess: false,
          authError: "Token and new password are required.",
          accessToken: null,
          refreshToken: null,
          profileurl: null,
          loginUser: null,
        },
      });
      return;
    }

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
      .post(
        `https://fluxor-backend.vercel.app/api/users/reset-password?token=${token}`,
        { newPassword }
      )
      .then((response) => {
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
        console.error("Reset password error:", err);

        dispatch(
          showAlert({
            isOpen: true,
            title: "Reset Failed",
            type: "error",
            msg: "Reset password failed. Try again.",
          })
        );

        dispatch({
          type: actionTypes.AUTH_ERROR,
          payload: {
            authPending: false,
            authSuccess: false,
            authError: "Reset password failed. Try again.",
            accessToken: null,
            refreshToken: null,
            profileurl: null,
            loginUser: null,
          },
        });
      });
  };
}

// export function logout() {
//   return (dispatch) => {
//     let headers = {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + getState().auth.accessToken,
//     };

//     dispatch({
//       type: actionTypes.LOGOUT_PENDING,
//       payload: {
//         logoutPending: true,
//         logoutSuccess: false,
//         logoutError: null,
//       },
//     });
//     dispatch(showLoader());
//     Api.post(`auth/logout`, {}, headers)
//       .then((response) => {
//         // console.log("logout response", response);
//         if (response.message) {
//           dispatch(hideLoader());
//           dispatch({
//             type: actionTypes.LOGOUT_SUCCESS,
//             payload: {
//               logoutPending: false,
//               logoutSuccess: true,
//               logoutError: null,
//               accessToken: null,
//               refreshToken: null,
//               profileurl: null,
//               loginUser: null,
//             },
//           });
//           setTimeout(() => {
//             console.log("history push", history);
//             history.push("/login");
//           }, 500);

//           dispatch(
//             showAlert({
//               isOpen: true,
//               title: "Success",
//               type: "success",
//               msg: response.message,
//             })
//           );
//         } else {
//           dispatch(hideLoader());
//           dispatch({
//             type: actionTypes.LOGOUT_SUCCESS,
//             payload: {
//               logoutPending: false,
//               logoutSuccess: true,
//               logoutError: null,
//               accessToken: null,
//               refreshToken: null,
//               profileurl: null,
//               loginUser: null,
//             },
//           });
//           setTimeout(() => {
//             history.push("/login");
//           }, 500);
//         }
//       })
//       .catch((err) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: actionTypes.LOGOUT_SUCCESS,
//           payload: {
//             logoutPending: false,
//             logoutSuccess: true,
//             logoutError: null,
//             accessToken: null,
//             refreshToken: null,
//             profileurl: null,
//             loginUser: null,
//           },
//         });
//         setTimeout(() => {
//           history.push("/login");
//         }, 1000);
//       });
//   };
// }


export function updateToken(token, refreshToken) {
  // console.log("test", token, refreshToken);
  return (dispatch) => {
    // console.log(" Update token,refresh ::", token, refreshToken);
    dispatch({
      type: actionTypes.UPDATE_TOKEN_SUCCESS,
      payload: {
        accessToken: token,
        refreshToken: refreshToken,
      },
    });
  };
}

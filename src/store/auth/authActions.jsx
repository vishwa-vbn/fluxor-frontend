// import Api from "../../service/api";
// import { showAlert } from "../alert/alertActions";
// import { showLoader, hideLoader } from "../loader/loaderActions";
import Api from "../../service/api";
// import { history, getState } from "../configure/configureStore";
import { actionTypes } from "./authReducer";
import axios from "axios";

export function login(email, password) {

    console.log("email",email, password)
    return (dispatch) => {
      if (email === "" || password === "") {
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
        .post("https://fluxor-backend.vercel.app/api/users/login", {
          email: email,
          password: password,
        },
        {
            headers: {
              'Content-Type': 'application/json',
            },
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
        })
        .catch((err) => {
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

// export function resetPassword(pwd, cnf_pwd, email, token) {
//   return (dispatch) => {
//     let data = {
//       userName: email,
//       newPassword: pwd,
//       otp: token,
//     };
//     if (pwd !== cnf_pwd) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "error",
//           type: "danger",
//           msg: "Passwords don't match",
//         })
//       );
//     } else {
//       dispatch(showLoader());
//       Api.post("auth/password/reset", data)

//         .then((response) => {
//           // console.log("Reset Response:", response);
//           dispatch(hideLoader());
//           dispatch({
//             type: actionTypes.RESET_PASSWORD,
//             payload: {
//               resetPassword: true,
//             },
//           });

//           history.push("/login");

//           showAlert({
//             isOpen: true,
//             title: "Success",
//             type: "success",
//             msg: "Password Reset Successfully",
//           });
//         })
//         .catch((err) => {
//           dispatch(hideLoader());
//           dispatch({
//             type: actionTypes.RESET_PASSWORD,
//             payload: {
//               resetPassword: false,
//             },
//           });
//         });
//     }
//   };
// }

// export function forgotPassword(email) {
//   return (dispatch) => {
//     let data = {
//       userName: email,
//     };
//     Api.post("auth/password/forgot", data)

//       .then((response) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: actionTypes.FORGOT_PASSWORD,
//           payload: {
//             forgotPassword: true,
//           },
//         });

//         history.push(
//           "/reset_password?email=" + email + "&token=" + response.data.otp
//         );
//       })
//       .catch((err) => {
//         dispatch(hideLoader());
//         dispatch({
//           type: actionTypes.FORGOT_PASSWORD,
//           payload: {
//             authPending: false,
//             authSuccess: false,
//             authError: null,
//             accessToken: null,
//             refreshToken: null,
//             profileurl: null,
//             loginUser: null,

//             forgotPassword: false,
//           },
//         });
//         dispatch(
//           showAlert({
//             isOpen: true,
//             title: "error",
//             type: "danger",
//             msg: "Error In Processing Request,",
//           })
//         );
//       });
//   };
// }

// export function changePassword(old_pwd, pwd, cnf_pwd, token, refToken) {
//   // export function changePassword(pwd, cnf_pwd, email) {

//   return (dispatch) => {
//     let data = {
//       oldPassword: old_pwd,
//       // userName: email,
//       newPassword: pwd,
//     };
//     let headers = {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     };
//     if (pwd !== cnf_pwd) {
//       dispatch(
//         showAlert({
//           isOpen: true,
//           title: "error",
//           type: "danger",
//           msg: "Passwords don't match",
//         })
//       );
//     } else {
//       dispatch(showLoader());
//       dispatch({
//         type: actionTypes.CHANGE_PASSWORD_PENDING,
//         payload: {
//           changePasswordPending: true,
//           changePasswordSuccess: false,
//           changePasswordError: null,
//         },
//       });
//       console.log("Data headers:", data, headers);

//       Api.post("auth/password/change", data, headers)

//         .then((response) => {
//           // console.log(response);
//           if (response.data) {
//             dispatch(hideLoader());
//             dispatch({
//               type: actionTypes.CHANGE_PASSWORD_SUCCESS,
//               payload: {
//                 changePasswordPending: false,
//                 changePasswordSuccess: true,
//                 changePasswordError: null,
//               },
//             });
//             dispatch(
//               showAlert({
//                 isOpen: true,
//                 title: "Success",
//                 type: "success",
//                 msg: response.message,
//               })
//             );
//           } else {
//             dispatch(hideLoader());
//             dispatch(
//               showAlert({
//                 isOpen: true,
//                 title: "error",
//                 type: "danger",
//                 msg: response.message,
//               })
//             );
//           }
//         })
//         .catch((err) => {
//           dispatch(hideLoader());
//           dispatch({
//             type: actionTypes.CHANGE_PASSWORD_ERROR,
//             payload: {
//               changePasswordPending: false,
//               changePasswordSuccess: true,
//               changePasswordError: null,
//             },
//           });
//           dispatch(
//             showAlert({
//               isOpen: true,
//               title: "error",
//               type: "danger",
//               msg: "Incorrect Old Password",
//             })
//           );
//         });
//     }
//   };
// }

// export function updateToken(token, refreshToken) {
//   // console.log("test", token, refreshToken);
//   return (dispatch) => {
//     // console.log(" Update token,refresh ::", token, refreshToken);
//     dispatch({
//       type: actionTypes.UPDATE_TOKEN_SUCCESS,
//       payload: {
//         accessToken: token,
//         refreshToken: refreshToken,
//       },
//     });
//   };
// }

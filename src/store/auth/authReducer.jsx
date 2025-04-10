export const actionTypes = {
    AUTH_PENDING: "AUTH_PENDING",
    AUTH_SUCCESS: "AUTH_SUCCESS",
    AUTH_ERROR: "AUTH_ERROR",
  
    CHANGE_PASSWORD_PENDING: "CHANGE_PASSWORD_PENDING",
    CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
    CHANGE_PASSWORD_ERROR: "CHANGE_PASSWORD_ERROR",
  
    RESET_PASSWORD: "RESET_PASSWORD",
  
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
  
    UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS",
  
    LOGOUT_PENDING: "LOGOUT_PENDING",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_ERROR: "LOGOUT_ERROR",


    FETCH_USERS_PENDING: "FETCH_USERS_PENDING",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR: "FETCH_USERS_ERROR",


  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR: "UPDATE_USER_ERROR",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  
  DELETE_USER_ERROR: "DELETE_USER_ERROR",
  BULK_DELETE_USERS_SUCCESS: "BULK_DELETE_USERS_SUCCESS",
  BULK_DELETE_USERS_ERROR: "BULK_DELETE_USERS_ERROR",
  };
  
  const initialState = {
    authPending: false,
    authSuccess: false,
    authError: null,
  
    accessToken: null,
    refreshToken: null,
    profileurl: null,
    loginUser: null,
  
    resetPassword: false,
    forgotPassword: false,
  
    changePasswordPending: false,
    changePasswordSuccess: false,
    changePasswordError: null,
  
    logoutPending: false,
    logoutSuccess: false,
    logoutError: null,

    fetchUsersPending: false,
  fetchUsersSuccess: false,
  fetchUsersError: null,
    users: [],
  };
  
  export default function auth(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.AUTH_PENDING:
      case actionTypes.AUTH_ERROR:
      case actionTypes.AUTH_SUCCESS:
        return Object.assign({}, state, payload);
  
      case actionTypes.CHANGE_PASSWORD_PENDING:
      case actionTypes.CHANGE_PASSWORD_SUCCESS:
      case actionTypes.CHANGE_PASSWORD_ERROR:
        return Object.assign({}, state, payload);
  
      case actionTypes.UPDATE_TOKEN_SUCCESS:
        return Object.assign({}, state, payload);
      case actionTypes.RESET_PASSWORD:
        return Object.assign({}, state, {
          resetPassword: payload.resetPassword,
        });
      case actionTypes.FORGOT_PASSWORD:
        return Object.assign({}, state, {
          forgotPassword: payload.forgotPassword,
        });
  
      case actionTypes.LOGOUT_PENDING:
      case actionTypes.LOGOUT_ERROR:
      case actionTypes.LOGOUT_SUCCESS:
        console.log("Logout Payload:", payload);
        return Object.assign({}, state, payload);

      case actionTypes.FETCH_USERS_PENDING:
      case actionTypes.FETCH_USERS_SUCCESS:
      case actionTypes.FETCH_USERS_ERROR:
          return Object.assign({}, state, payload);
  
      default:
        return state;
    }
  }
  
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

  FETCH_TARGETED_USER_PENDING: "FETCH_TARGETED_USER_PENDING",
  FETCH_TARGETED_USER_SUCCESS: "FETCH_TARGETED_USER_SUCCESS",
  FETCH_TARGETED_USER_ERROR: "FETCH_TARGETED_USER_ERROR",

  AUTH_LOGOUT:"AUTH_LOGOUT",
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


    fetchTargetedUserPending: false,
  fetchTargetedUserSuccess: false,
  fetchTargetedUserError: null,
  targetedUser: null,
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
        return Object.assign({}, state, payload);
  
      case actionTypes.FETCH_USERS_PENDING:
      case actionTypes.FETCH_USERS_SUCCESS:
      case actionTypes.FETCH_USERS_ERROR:
        return Object.assign({}, state, payload);
  
      case actionTypes.UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === payload.updatedUser.id ? payload.updatedUser : user
          ),
        };
  
      case actionTypes.DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users?.filter((user) => user.id !== payload.deletedUserId),
        };
  
      case actionTypes.BULK_DELETE_USERS_SUCCESS:
        return {
          ...state,
          users: state.users?.filter(
            (user) => !payload.deletedUserIds.includes(user.id)
          ),
        };
  
      case actionTypes.FETCH_TARGETED_USER_PENDING:
      case actionTypes.FETCH_TARGETED_USER_SUCCESS:
      case actionTypes.FETCH_TARGETED_USER_ERROR:
        return Object.assign({}, state, payload);

      case actionTypes.AUTH_LOGOUT:
        return Object.assign({},state,payload);
  
      default:
        return state;
    }
  }
  
export const actionTypes = {
    CREATE_POST_PENDING: "CREATE_POST_PENDING",
    CREATE_POST_SUCCESS: "CREATE_POST_SUCCESS",
    CREATE_POST_ERROR: "CREATE_POST_ERROR",
  };
  
  const initialState = {
    postPending: false,
    postSuccess: false,
    postError: null,
    createdPost: null,
  };
  
  export default function postReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case actionTypes.CREATE_POST_PENDING:
      case actionTypes.CREATE_POST_SUCCESS:
      case actionTypes.CREATE_POST_ERROR:
        return Object.assign({}, state, payload);
  
      default:
        return state;
    }
  }
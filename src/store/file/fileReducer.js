import {
    FILE_UPLOAD_PENDING,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_ERROR,
    FILE_LIST_PENDING,
    FILE_LIST_SUCCESS,
    FILE_LIST_ERROR,
    FILE_FETCH_ONE_PENDING,
    FILE_FETCH_ONE_SUCCESS,
    FILE_FETCH_ONE_ERROR,
    FILE_DELETE_PENDING,
    FILE_DELETE_SUCCESS,
    FILE_DELETE_ERROR,
  } from "./fileActions";
  
  const initialState = {
    assets: [],
    file: null,
    loading: false,
    error: null,
  };
  
  const fileReducer = (state = initialState, action) => {
    switch (action.type) {
      // PENDING
      case FILE_UPLOAD_PENDING:
      case FILE_LIST_PENDING:
      case FILE_FETCH_ONE_PENDING:
      case FILE_DELETE_PENDING:
        return { ...state, loading: true, error: null };
  
      // SUCCESS
      case FILE_UPLOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          assets: [...state.assets, action.payload],
        };
  
      case FILE_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          assets: action.payload || [],
        };
  
      case FILE_FETCH_ONE_SUCCESS:
        return {
          ...state,
          loading: false,
          file: action.payload,
        };
  
      case FILE_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          assets: state.assets.filter((asset) => asset.assetId !== action.payload),
          file:
            state.file && state.file.assetId === action.payload
              ? null
              : state.file,
        };
  
      // ERRORS
      case FILE_UPLOAD_ERROR:
      case FILE_LIST_ERROR:
      case FILE_FETCH_ONE_ERROR:
      case FILE_DELETE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default fileReducer;
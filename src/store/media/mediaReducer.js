import {
    MEDIA_LIST_PENDING,
    MEDIA_LIST_SUCCESS,
    MEDIA_LIST_ERROR,
    MEDIA_FOLDERS_PENDING,
    MEDIA_FOLDERS_SUCCESS,
    MEDIA_FOLDERS_ERROR,
    MEDIA_FETCH_ONE_PENDING,
    MEDIA_FETCH_ONE_SUCCESS,
    MEDIA_FETCH_ONE_ERROR,
    MEDIA_UPDATE_PENDING,
    MEDIA_UPDATE_SUCCESS,
    MEDIA_UPDATE_ERROR,
    MEDIA_DELETE_PENDING,
    MEDIA_DELETE_SUCCESS,
    MEDIA_DELETE_ERROR,
    MEDIA_CREATE_FOLDER_PENDING,
    MEDIA_CREATE_FOLDER_SUCCESS,
    MEDIA_CREATE_FOLDER_ERROR,
    MEDIA_DELETE_FOLDER_PENDING,
    MEDIA_DELETE_FOLDER_SUCCESS,
    MEDIA_DELETE_FOLDER_ERROR,
    MEDIA_COPY_PENDING,
    MEDIA_COPY_SUCCESS,
    MEDIA_COPY_ERROR,
    MEDIA_MOVE_PENDING,
    MEDIA_MOVE_SUCCESS,
    MEDIA_MOVE_ERROR,
    MEDIA_RENAME_PENDING,
    MEDIA_RENAME_SUCCESS,
    MEDIA_RENAME_ERROR,
    MEDIA_UPLOAD_PENDING,
    MEDIA_UPLOAD_SUCCESS,
    MEDIA_UPLOAD_ERROR,
  } from "./mediaActions";
  
  const initialState = {
    assets: [],
    folders: [],
    file: null,
    loading: false,
    error: null,
  };
  
  const mediaReducer = (state = initialState, action) => {
    switch (action.type) {
      // PENDING
      case MEDIA_LIST_PENDING:
      case MEDIA_FOLDERS_PENDING:
      case MEDIA_FETCH_ONE_PENDING:
      case MEDIA_UPDATE_PENDING:
      case MEDIA_DELETE_PENDING:
      case MEDIA_CREATE_FOLDER_PENDING:
      case MEDIA_DELETE_FOLDER_PENDING:
      case MEDIA_COPY_PENDING:
      case MEDIA_MOVE_PENDING:
      case MEDIA_RENAME_PENDING:
      case MEDIA_UPLOAD_PENDING:
        return { ...state, loading: true, error: null };
  
      // SUCCESS
      case MEDIA_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          assets: action.payload || [],
        };
  
      case MEDIA_FOLDERS_SUCCESS:
        return {
          ...state,
          loading: false,
          folders: action.payload || [],
        };
  
      case MEDIA_FETCH_ONE_SUCCESS:
        return {
          ...state,
          loading: false,
          file: action.payload,
        };
  
      case MEDIA_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          assets: state.assets.map((asset) =>
            asset.fileId === action.payload.fileId ? action.payload : asset
          ),
          file:
            state.file && state.file.fileId === action.payload.fileId
              ? action.payload
              : state.file,
        };
  
      case MEDIA_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          assets: state.assets.filter((asset) => asset.fileId !== action.payload),
          file:
            state.file && state.file.fileId === action.payload ? null : state.file,
        };
  
      case MEDIA_CREATE_FOLDER_SUCCESS:
      case MEDIA_DELETE_FOLDER_SUCCESS:
      case MEDIA_COPY_SUCCESS:
      case MEDIA_MOVE_SUCCESS:
      case MEDIA_RENAME_SUCCESS:
        return {
          ...state,
          loading: false,
        };
  
      case MEDIA_UPLOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          assets: [...state.assets, action.payload],
        };
  
      // ERRORS
      case MEDIA_LIST_ERROR:
      case MEDIA_FOLDERS_ERROR:
      case MEDIA_FETCH_ONE_ERROR:
      case MEDIA_UPDATE_ERROR:
      case MEDIA_DELETE_ERROR:
      case MEDIA_CREATE_FOLDER_ERROR:
      case MEDIA_DELETE_FOLDER_ERROR:
      case MEDIA_COPY_ERROR:
      case MEDIA_MOVE_ERROR:
      case MEDIA_RENAME_ERROR:
      case MEDIA_UPLOAD_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default mediaReducer;
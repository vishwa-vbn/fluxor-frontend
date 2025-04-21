import {
    SETTINGS_CREATE_PENDING,
    SETTINGS_CREATE_SUCCESS,
    SETTINGS_CREATE_ERROR,
    SETTINGS_FETCH_ALL_PENDING,
    SETTINGS_FETCH_ALL_SUCCESS,
    SETTINGS_FETCH_ALL_ERROR,
    SETTINGS_FETCH_ONE_PENDING,
    SETTINGS_FETCH_ONE_SUCCESS,
    SETTINGS_FETCH_ONE_ERROR,
    SETTINGS_UPDATE_PENDING,
    SETTINGS_UPDATE_SUCCESS,
    SETTINGS_UPDATE_ERROR,
    SETTINGS_DELETE_PENDING,
    SETTINGS_DELETE_SUCCESS,
    SETTINGS_DELETE_ERROR,
  } from './settingsAction';
  
  const initialState = {
    settings: [],
    setting: null,
    loading: false,
    error: null,
  };
  
  const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
      // PENDING
      case SETTINGS_CREATE_PENDING:
      case SETTINGS_FETCH_ALL_PENDING:
      case SETTINGS_FETCH_ONE_PENDING:
      case SETTINGS_UPDATE_PENDING:
      case SETTINGS_DELETE_PENDING:
        return { ...state, loading: true, error: null };
  
      // CREATE
      case SETTINGS_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          settings: [...state.settings, action.payload],
        };
  
      // FETCH ALL
      case SETTINGS_FETCH_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          settings: action.payload,
        };
  
      // FETCH ONE
      case SETTINGS_FETCH_ONE_SUCCESS:
        return {
          ...state,
          loading: false,
          setting: action.payload,
        };
  
      // UPDATE
      case SETTINGS_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          settings: state.settings.map((setting) =>
            setting.key === action.payload.key ? action.payload : setting
          ),
        };
  
      // DELETE
      case SETTINGS_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          settings: state.settings.filter((setting) => setting.key !== action.payload),
        };
  
      // ERRORS
      case SETTINGS_CREATE_ERROR:
      case SETTINGS_FETCH_ALL_ERROR:
      case SETTINGS_FETCH_ONE_ERROR:
      case SETTINGS_UPDATE_ERROR:
      case SETTINGS_DELETE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default settingsReducer;
import {
    CATEGORY_CREATE_PENDING,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_CREATE_ERROR,
    CATEGORY_FETCH_ALL_PENDING,
    CATEGORY_FETCH_ALL_SUCCESS,
    CATEGORY_FETCH_ALL_ERROR,
    CATEGORY_FETCH_ONE_PENDING,
    CATEGORY_FETCH_ONE_SUCCESS,
    CATEGORY_FETCH_ONE_ERROR,
    CATEGORY_UPDATE_PENDING,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_ERROR,
    CATEGORY_DELETE_PENDING,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_ERROR,
  } from "./categoryActions";
  
  const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case CATEGORY_CREATE_PENDING:
      case CATEGORY_FETCH_ALL_PENDING:
      case CATEGORY_FETCH_ONE_PENDING:
      case CATEGORY_UPDATE_PENDING:
      case CATEGORY_DELETE_PENDING:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case CATEGORY_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: [...state.categories, action.payload],
        };
  
      case CATEGORY_FETCH_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: action.payload,
        };
  
      case CATEGORY_FETCH_ONE_SUCCESS:
        return {
          ...state,
          loading: false,
          category: action.payload,
        };
  
      case CATEGORY_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: state.categories.map((cat) =>
            cat.id === action.payload.id ? action.payload : cat
          ),
        };
  
      case CATEGORY_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: state.categories.filter((cat) => cat.id !== action.payload),
        };
  
      case CATEGORY_CREATE_ERROR:
      case CATEGORY_FETCH_ALL_ERROR:
      case CATEGORY_FETCH_ONE_ERROR:
      case CATEGORY_UPDATE_ERROR:
      case CATEGORY_DELETE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  
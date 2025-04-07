// src/redux/reducers/tagReducer.js
import {
    TAGS_CREATE_PENDING,
    TAGS_CREATE_SUCCESS,
    TAGS_CREATE_ERROR,
    TAGS_FETCH_ALL_PENDING,
    TAGS_FETCH_ALL_SUCCESS,
    TAGS_FETCH_ALL_ERROR,
    TAGS_FETCH_ONE_PENDING,
    TAGS_FETCH_ONE_SUCCESS,
    TAGS_FETCH_ONE_ERROR,
    TAGS_UPDATE_PENDING,
    TAGS_UPDATE_SUCCESS,
    TAGS_UPDATE_ERROR,
    TAGS_DELETE_PENDING,
    TAGS_DELETE_SUCCESS,
    TAGS_DELETE_ERROR,
  } from './tagsActions';
  
  const initialState = {
    tags: [],
    tag: null,
    loading: false,
    error: null,
  };
  
  const tagReducer = (state = initialState, action) => {
    switch (action.type) {
      // CREATE
      case TAGS_CREATE_PENDING:
      case TAGS_FETCH_ALL_PENDING:
      case TAGS_FETCH_ONE_PENDING:
      case TAGS_UPDATE_PENDING:
      case TAGS_DELETE_PENDING:
        return { ...state, loading: true, error: null };
  
      case TAGS_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          tags: [...state.tags, action.payload],
        };
  
      case TAGS_FETCH_ALL_SUCCESS:
        return {
          ...state,
          loading: false,
          tags: action.payload,
        };
  
      case TAGS_FETCH_ONE_SUCCESS:
        return {
          ...state,
          loading: false,
          tag: action.payload,
        };
  
      case TAGS_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          tags: state.tags.map((tag) =>
            tag.id === action.payload.id ? action.payload : tag
          ),
        };
  
      case TAGS_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          tags: state.tags.filter((tag) => tag.id !== action.payload),
        };
  
      // ERRORS
      case TAGS_CREATE_ERROR:
      case TAGS_FETCH_ALL_ERROR:
      case TAGS_FETCH_ONE_ERROR:
      case TAGS_UPDATE_ERROR:
      case TAGS_DELETE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default tagReducer;
  
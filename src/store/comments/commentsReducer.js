// src/redux/reducers/commentsReducer.js
import {
    COMMENTS_CREATE_PENDING,
    COMMENTS_CREATE_SUCCESS,
    COMMENTS_CREATE_ERROR,
    COMMENTS_FETCH_BY_POST_PENDING,
    COMMENTS_FETCH_BY_POST_SUCCESS,
    COMMENTS_FETCH_BY_POST_ERROR,
    COMMENTS_FETCH_APPROVED_PENDING,
    COMMENTS_FETCH_APPROVED_SUCCESS,
    COMMENTS_FETCH_APPROVED_ERROR,
    COMMENTS_APPROVE_PENDING,
    COMMENTS_APPROVE_SUCCESS,
    COMMENTS_APPROVE_ERROR,
    COMMENTS_REJECT_PENDING,
    COMMENTS_REJECT_SUCCESS,
    COMMENTS_REJECT_ERROR,
    COMMENTS_DELETE_PENDING,
    COMMENTS_DELETE_SUCCESS,
    COMMENTS_DELETE_ERROR,
  } from "./commentsActions";
  
  const initialState = {
    comments: [],
    approvedComments: [],
    loading: false,
    error: null,
  };
  
  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      // PENDING
      case COMMENTS_CREATE_PENDING:
      case COMMENTS_FETCH_BY_POST_PENDING:
      case COMMENTS_FETCH_APPROVED_PENDING:
      case COMMENTS_APPROVE_PENDING:
      case COMMENTS_REJECT_PENDING:
      case COMMENTS_DELETE_PENDING:
        return { ...state, loading: true, error: null };
  
      // CREATE
      case COMMENTS_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: [...state.comments, action.payload],
        };
  
      // FETCH BY POST
      case COMMENTS_FETCH_BY_POST_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: action.payload,
        };
  
      // FETCH APPROVED
      case COMMENTS_FETCH_APPROVED_SUCCESS:
        return {
          ...state,
          loading: false,
          approvedComments: action.payload,
        };
  
      // APPROVE
      case COMMENTS_APPROVE_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.map((comment) =>
            comment.id === action.payload.id ? action.payload : comment
          ),
          approvedComments: state.approvedComments.map((comment) =>
            comment.id === action.payload.id ? action.payload : comment
          ),
        };
  
      // REJECT
      case COMMENTS_REJECT_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.map((comment) =>
            comment.id === action.payload.id ? action.payload : comment
          ),
          approvedComments: state.approvedComments.filter(
            (comment) => comment.id !== action.payload.id
          ),
        };
  
      // DELETE
      case COMMENTS_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          comments: state.comments.filter(
            (comment) => comment.id !== action.payload
          ),
          approvedComments: state.approvedComments.filter(
            (comment) => comment.id !== action.payload
          ),
        };
  
      // ERRORS
      case COMMENTS_CREATE_ERROR:
      case COMMENTS_FETCH_BY_POST_ERROR:
      case COMMENTS_FETCH_APPROVED_ERROR:
      case COMMENTS_APPROVE_ERROR:
      case COMMENTS_REJECT_ERROR:
      case COMMENTS_DELETE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default commentsReducer;
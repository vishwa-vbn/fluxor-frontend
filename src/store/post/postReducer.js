// postReducer.js
import {
  POST_CREATE_PENDING,
  POST_CREATE_SUCCESS,
  POST_CREATE_ERROR,
  POST_FETCH_ALL_PENDING,
  POST_FETCH_ALL_SUCCESS,
  POST_FETCH_ALL_ERROR,
  POST_FETCH_ONE_PENDING,
  POST_FETCH_ONE_SUCCESS,
  POST_FETCH_ONE_ERROR,
  POST_UPDATE_PENDING,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_ERROR,
  POST_DELETE_PENDING,
  POST_DELETE_SUCCESS,
  POST_DELETE_ERROR,
} from "./postActions";

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CREATE_PENDING:
    case POST_FETCH_ALL_PENDING:
    case POST_FETCH_ONE_PENDING:
    case POST_UPDATE_PENDING:
    case POST_DELETE_PENDING:
      return { ...state, loading: true, error: null };

    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.payload],
      };

    case POST_FETCH_ALL_SUCCESS:
      return { ...state, loading: false, posts: action.payload };

    case POST_FETCH_ONE_SUCCESS:
      return { ...state, loading: false, post: action.payload };

    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };

    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };

    case POST_CREATE_ERROR:
    case POST_FETCH_ALL_ERROR:
    case POST_FETCH_ONE_ERROR:
    case POST_UPDATE_ERROR:
    case POST_DELETE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default postReducer;
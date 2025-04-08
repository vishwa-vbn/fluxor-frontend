import {
  POST_CREATE_PENDING,
  POST_CREATE_SUCCESS,
  POST_CREATE_ERROR,
  POST_FETCH_ALL_PENDING,
  POST_FETCH_ALL_SUCCESS,
  POST_FETCH_ALL_ERROR,
  POST_FETCH_PUBLISHED_PENDING,
  POST_FETCH_PUBLISHED_SUCCESS,
  POST_FETCH_PUBLISHED_ERROR,
  POST_FETCH_BY_SLUG_PENDING,
  POST_FETCH_BY_SLUG_SUCCESS,
  POST_FETCH_BY_SLUG_ERROR,
  POST_UPDATE_PENDING,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_ERROR,
  POST_DELETE_PENDING,
  POST_DELETE_SUCCESS,
  POST_DELETE_ERROR,
} from "./postActions";

const initialState = {
  posts: [],
  publishedPosts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CREATE_PENDING:
    case POST_FETCH_ALL_PENDING:
    case POST_FETCH_PUBLISHED_PENDING:
    case POST_FETCH_BY_SLUG_PENDING:
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

    case POST_FETCH_PUBLISHED_SUCCESS:
      return { ...state, loading: false, publishedPosts: action.payload };

    case POST_FETCH_BY_SLUG_SUCCESS:
      return { ...state, loading: false, currentPost: action.payload };

    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        publishedPosts: state.publishedPosts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };

    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.payload.id),
        publishedPosts: state.publishedPosts.filter((post) => post.id !== action.payload.id),
      };

    case POST_CREATE_ERROR:
    case POST_FETCH_ALL_ERROR:
    case POST_FETCH_PUBLISHED_ERROR:
    case POST_FETCH_BY_SLUG_ERROR:
    case POST_UPDATE_ERROR:
    case POST_DELETE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
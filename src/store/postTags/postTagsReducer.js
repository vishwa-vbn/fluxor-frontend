import {
    POST_TAGS_CREATE_PENDING,
    POST_TAGS_CREATE_SUCCESS,
    POST_TAGS_CREATE_ERROR,
    POST_TAGS_FETCH_BY_POST_PENDING,
    POST_TAGS_FETCH_BY_POST_SUCCESS,
    POST_TAGS_FETCH_BY_POST_ERROR,
    POST_TAGS_FETCH_BY_TAG_PENDING,
    POST_TAGS_FETCH_BY_TAG_SUCCESS,
    POST_TAGS_FETCH_BY_TAG_ERROR,
    POST_TAGS_DELETE_PENDING,
    POST_TAGS_DELETE_SUCCESS,
    POST_TAGS_DELETE_ERROR,
  } from './postTagsActions';
  
  const initialState = {
    postTags: [],
    tagsByPost: [],
    postsByTag: [],
    loading: false,
    error: null,
  };
  
  const postTagsReducer = (state = initialState, action) => {
    switch (action.type) {
      // PENDING
      case POST_TAGS_CREATE_PENDING:
      case POST_TAGS_FETCH_BY_POST_PENDING:
      case POST_TAGS_FETCH_BY_TAG_PENDING:
      case POST_TAGS_DELETE_PENDING:
        return { ...state, loading: true, error: null };
  
      // SUCCESS
      case POST_TAGS_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          postTags: [...state.postTags, action.payload],
        };
  
      case POST_TAGS_FETCH_BY_POST_SUCCESS:
        return {
          ...state,
          loading: false,
          tagsByPost: action.payload,
        };
  
      case POST_TAGS_FETCH_BY_TAG_SUCCESS:
        return {
          ...state,
          loading: false,
          postsByTag: action.payload,
        };
  
      case POST_TAGS_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          postTags: state.postTags.filter(
            (mapping) => 
              !(mapping.postId === action.payload.postId && 
                mapping.tagId === action.payload.tagId)
          ),
        };
  
      // ERRORS
      case POST_TAGS_CREATE_ERROR:
      case POST_TAGS_FETCH_BY_POST_ERROR:
      case POST_TAGS_FETCH_BY_TAG_ERROR:
      case POST_TAGS_DELETE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default postTagsReducer;
import {
    POST_CATEGORIES_CREATE_PENDING,
    POST_CATEGORIES_CREATE_SUCCESS,
    POST_CATEGORIES_CREATE_ERROR,
    POST_CATEGORIES_FETCH_BY_POST_PENDING,
    POST_CATEGORIES_FETCH_BY_POST_SUCCESS,
    POST_CATEGORIES_FETCH_BY_POST_ERROR,
    POST_CATEGORIES_FETCH_BY_CATEGORY_PENDING,
    POST_CATEGORIES_FETCH_BY_CATEGORY_SUCCESS,
    POST_CATEGORIES_FETCH_BY_CATEGORY_ERROR,
    POST_CATEGORIES_DELETE_PENDING,
    POST_CATEGORIES_DELETE_SUCCESS,
    POST_CATEGORIES_DELETE_ERROR,
  } from './postCategoriesActions';
  
  const initialState = {
    postCategories: [],
    categoriesByPost: [],
    postsByCategory: [],
    loading: false,
    error: null,
  };
  
  const postCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      // PENDING
      case POST_CATEGORIES_CREATE_PENDING:
      case POST_CATEGORIES_FETCH_BY_POST_PENDING:
      case POST_CATEGORIES_FETCH_BY_CATEGORY_PENDING:
      case POST_CATEGORIES_DELETE_PENDING:
        return { ...state, loading: true, error: null };
  
      // SUCCESS
      case POST_CATEGORIES_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          postCategories: [...state.postCategories, action.payload],
        };
  
      case POST_CATEGORIES_FETCH_BY_POST_SUCCESS:
        return {
          ...state,
          loading: false,
          categoriesByPost: action.payload,
        };
  
      case POST_CATEGORIES_FETCH_BY_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          postsByCategory: action.payload,
        };
  
      case POST_CATEGORIES_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          postCategories: state.postCategories.filter(
            (mapping) => 
              !(mapping.postId === action.payload.postId && 
                mapping.categoryId === action.payload.categoryId)
          ),
        };
  
      // ERRORS
      case POST_CATEGORIES_CREATE_ERROR:
      case POST_CATEGORIES_FETCH_BY_POST_ERROR:
      case POST_CATEGORIES_FETCH_BY_CATEGORY_ERROR:
      case POST_CATEGORIES_DELETE_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default postCategoriesReducer;
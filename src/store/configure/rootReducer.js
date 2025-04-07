import { combineReducers } from "redux";

import { routerReducer } from "react-router-redux";
import auth from "../auth/authReducer";
import alert from '../alert/alertReducer';
import loader from '../loader/loaderReducer';
import post from '../post/postReducer';
import tags from '../tags/tagsReducer';
import categories from '../category/categoryReducer'

export const rootReducer = combineReducers({
  router: routerReducer,
  auth,
  loader,
  alert,
  post,
  tags,
  categories
 
});

import { combineReducers } from "redux";

import { routerReducer } from "react-router-redux";
import auth from "../auth/authReducer";
import alert from '../alert/alertReducer';
import loader from '../loader/loaderReducer';
import {postReducer}  from '../post/postReducer';
import tags from '../tags/tagsReducer';
import {categoryReducer} from '../categories/categoriesReducer'

export const rootReducer = combineReducers({
  router: routerReducer,
  auth,
  loader,
  alert,
  post:postReducer,
  tags,
  category:categoryReducer,
 
});

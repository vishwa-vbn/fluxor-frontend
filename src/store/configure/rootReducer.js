import { combineReducers } from "redux";

import { routerReducer } from "react-router-redux";
import auth from "../auth/authReducer";
import alert from '../alert/alertReducer';
import loader from '../loader/loaderReducer';
import {postReducer} from '../post/postReducer';
import tags from '../tags/tagsReducer';
import {categoryReducer} from '../categories/categoriesReducer';
import postCategoriesReducer from '../postCategories/postCategoriesReducer';
import postTagsReducer from '../postTags/postTagsReducer';
import commentsReducer from "../comments/commentsReducer";
import adsenseReducer from "../adSense/adSenseReducer";
import settingsReducer from "../settings/settingsReducer";
import mediaReducer from "../media/mediaReducer";
import fileReducer from "../file/fileReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  auth,
  loader,
  alert,
  post: postReducer,
  tags,
  category: categoryReducer,
  postCategories: postCategoriesReducer,
  postTags: postTagsReducer,
  comments:commentsReducer,
  adSense:adsenseReducer,
  settings:settingsReducer,
  media:mediaReducer,
  file:fileReducer,
});
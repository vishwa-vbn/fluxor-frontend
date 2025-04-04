import { combineReducers } from "redux";

import { routerReducer } from "react-router-redux";
import auth from "../auth/authReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  auth:auth,
 
});

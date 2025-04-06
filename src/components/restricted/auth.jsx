import { getState } from "../../store/configure/configureStore";
import { globals } from "../../store/globals";


class Auth {
  constructor() {
    this.authenticated = true;
  }

  isAuthenticated() {
    // if (!localStorage.getItem("temp_token") ) {
    if (!getState().auth?.loginUser?.token) {
      console.log("inside auth check",getState().auth.accessToken)
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }

    return this.authenticated;
  }
}

export default new Auth();

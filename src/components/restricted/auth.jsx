import { getState } from "../../store/configure/configureStore";
import { isTokenExpired } from "../../utils/authUtils"; // Adjust path to your utils.js

class Auth {
  constructor() {
    this.authenticated = true;
  }

  isAuthenticated() {
    const token = getState().auth?.loginUser?.token;
    if (!token || isTokenExpired(token)) {
      this.authenticated = false;
      window.location.href = "/admin/login"; // Redirect to login
    } else {
      this.authenticated = true;
    }

    return this.authenticated;
  }
}

export default new Auth();
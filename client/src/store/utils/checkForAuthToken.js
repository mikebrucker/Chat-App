import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import store from "../store";
import { setCurrentUser, logoutUser } from "../actions/authActions";

const checkForAuthToken = () => {
  // Check for token
  if (localStorage.jwtToken) {
    // Set Auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and is Authenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/login";
    }
  }
};

export default checkForAuthToken;

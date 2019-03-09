import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import chatroomReducer from "./chatroomReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  chatroom: chatroomReducer
});

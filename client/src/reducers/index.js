import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import film from "./film";

export default combineReducers({
  alert,
  auth,
  film,
});

import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import allNotebooksReducer from "./allNotebooksReducer";
import notebookOrderReducer from "./notebookOrderReducer";
import onenoteReducer from "./onenoteReducer";
import selectedNavReducer from "./selectedNavReducer";
import totalNotebookLengthReducer from "./totalNotebookLengthReducer";
import userReducer from "./userReducer";

export default combineReducers({
  allNotebooks: allNotebooksReducer, // used for opening notebooks
  notebookOrder: notebookOrderReducer,
  onenote: onenoteReducer,
  router: routerReducer,
  selectedNav: selectedNavReducer,
  totalNotebookLength: totalNotebookLengthReducer,
  users: userReducer
});

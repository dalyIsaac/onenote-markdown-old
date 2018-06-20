import { combineReducers } from "redux";
import userReducer from "./userReducer";
import allNotebooksReducer from "./allNotebooksReducer";
import notebookOrderReducer from "./notebookOrderReducer";
import selectedNavReducer from "./selectedNavReducer";
import totalNotebookLength from "./totalNotebookLengthReducer";
import onenoteReducer from "./onenoteReducer";

export default combineReducers({
  onenote: onenoteReducer,
  users: userReducer,
  allNotebooks: allNotebooksReducer, // used for opening notebooks
  notebookOrder: notebookOrderReducer,
  selectedNav: selectedNavReducer,
  totalNotebookLength: totalNotebookLength
});

import { routerReducer, RouterState } from "react-router-redux";
import { combineReducers } from "redux";
import { Notebook } from "src/types/Notebook";
import { Page } from "src/types/Page";
import { Section } from "src/types/Section";
import { SectionGroup } from "src/types/SectionGroup";
import { UserData } from "src/types/UserData";
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

export interface IState {
  allNotebooks: IStateUserNotebooks[];
  notebookOrder: string[];
  onenote: IStateOneNote;
  router: RouterState;
  selectedNav: string[];
  totalNotebookLength: number;
  users: IStateUsers;
}

export interface IStateUserNotebooks {
  userId: string;
  displayableId: string;
  notebooks: Notebook;
}

export interface IStateOneNote {
  [key: string]: Notebook | SectionGroup | Section | Page;
}

export interface IStateUsers {
  [key: string]: UserData;
}

import { Notebook as Graph_Notebook } from "@microsoft/microsoft-graph-types";
import { RouterState } from "connected-react-router";
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
  selectedNav: selectedNavReducer,
  totalNotebookLength: totalNotebookLengthReducer,
  users: userReducer
});

export interface IState {
  allNotebooks: IStateUserNotebooks[];
  notebookOrder: string[];
  onenote: IStateOneNote[];
  router: RouterState;
  selectedNav: string[];
  totalNotebookLength: number;
  users: IStateUsers;
}

export interface IStateUserNotebooks {
  userId: string;
  displayableId: string;
  /**
   * This is not `Notebook` as defined in this project, but `Graph_Notebook` as an alias for `Notebook` from `@microsoft/microsoft-graph-types`.
   * This is because the `allNotebooks` slice of the state only stores the raw notebooks from Microsoft Graph.
   */
  notebooks: Graph_Notebook[];
}

export interface IStateOneNote {
  [key: string]: Notebook | SectionGroup | Section | Page;
}

export interface IStateUsers {
  [key: string]: UserData;
}

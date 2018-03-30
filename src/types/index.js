// import { Notebook } from '@microsoft/microsoft-graph-types/microsoft-graph'; // eslint-disable-line

// ActionTypes
// Users
export const AUTHENTICATE = "AUTHENTICATE";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const NEW_USER_LIST = "NEW_USER_LIST";
export const UPDATE_USER = "UPDATE_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_PHOTO = "GET_PHOTO";
export const REAUTHORIZE_USER = "REAUTHORIZE_USER";

// Notebooks
export const GET_ALL_NOTEBOOKS = "GET_ALL_NOTEBOOKS";
export const PUT_ALL_NOTEBOOKS = "PUT_ALL_NOTEBOOKS";
export const CLEAR_ALL_NOTEBOOKS = "CLEAR_ALL_NOTEBOOKS";

export class UserData {
  constructor(msal, photo = "", acquireTokenError = null) {
    this.msal = msal;
    this.photo = photo;
    this.acquireTokenError = acquireTokenError;
  }
}

export class NotebookRow {
  /**
   * Creates an instance of NotebookRow.
   * @param {Notebook} notebook 
   * @param {UserData} user 
   * @memberof NotebookRow
   */
  constructor(notebook, user) {
    this.fileName = notebook.displayName;
    this.lastModifiedDateTime = notebook.lastModifiedDateTime
    .replace("T", " ")
    .replace("Z", "")
    .split(".")[0];
    this.userDisplayableId = user.msal.displayableId;
    this.user = this.user
  }
}
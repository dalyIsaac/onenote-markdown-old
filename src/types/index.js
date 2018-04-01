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
export const OPEN_NOTEBOOKS = "OPEN_NOTEBOOKS";
export const LOAD_NOTEBOOK_INTO_REDUX = "LOAD_NOTEBOOK_INTO_REDUX";
export const LOAD_SAVED_NOTEBOOKS = "LOAD_SAVED_NOTEBOOKS";

// Notebook order
export const UPDATE_NOTEBOOK_ORDER = "UPDATE_NOTEBOOK_ORDER";

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
   * @param {Object} notebook 
   * @param {UserData} user 
   * @memberof NotebookRow
   */
  constructor(notebook, user) {
    this.fileName = notebook.displayName;
    this.lastModifiedDateTime = new Date(notebook.lastModifiedDateTime);
    this.userDisplayableId = user.msal.displayableId;
    this.user = user;
    this.notebook = notebook;
  }
}

/**
 * @class Notebook
 */
export class Notebook {
  /**
   * @param {Object} notebook JSON response from the Microsoft Graph for a notebook
   */
  constructor(notebook, user=undefined) {
    this.id = undefined;
    this.user = user;
    Object.assign(this, notebook);
    this.data = {};
  }
}

// ActionTypes
// Users
export const AUTHENTICATE = "AUTHENTICATE";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const NEW_USER_LIST = "NEW_USER_LIST";
export const UPDATE_USER = "UPDATE_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_PHOTO = "GET_PHOTO";

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

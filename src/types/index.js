// import { Notebook } from '@microsoft/microsoft-graph-types/microsoft-graph'; // eslint-disable-line

// ActionTypes
// Users
export const AUTHENTICATE = "AUTHENTICATE";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const NEW_USER_OBJECT = "NEW_USER_OBJECT";
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

// Selected Nav
export const UPDATE_SELECTED_NOTEBOOK = "UPDATE_SELECTED_NOTEBOOK";
export const CLOSE_NOTEBOOK = "CLOSE_NOTEBOOK"; // in general

// Loading notebooks
export const TOTAL_NOTEBOOK_LENGTH = "TOTAL_NOTEBOOK_LENGTH";
export const REMOVE_ONE_NOTEBOOK_LENGTH = "REMOVE_ONE_NOTEBOOK_LENGTH"

export class UserData {
  constructor(msal, photo = "", acquireTokenError = null) {
    this.displayableId = undefined;
    Object.assign(this, msal);
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
    this.userDisplayableId = user.displayableId;
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
  constructor(notebook, user = undefined) {
    this.id = undefined;
    if (user !== undefined) {
      this.userId = user.userIdentifier;
    }
    deflateObject(this, notebook);
  }
}

/**
 * Deflates an object.  
 * For example: `{ "hello": { "world": "earth" } }` goes to `{ "hello.world": "earth" }`  
 * Note: a key which begins with `@` will not be deflated.
 * @param {Object} target 
 * @param {Object} source 
 * @param {string} [parentName='']
 */
function deflateObject(target, source, parentName = '') {
  for (const key in source) {
    const prop = source[key];
    if (typeof prop === 'object') {
      if (parentName !== '') {
        deflateObject(target, prop, `${parentName}.${key}`);
      } else {
        deflateObject(target, prop, `${key}`);
      }
    } else {
      if (parentName !== '') {
        target[`${parentName}.${key}`] = prop;
      } else {
        target[key] = prop;
      }
    }
  }
}

/**
 * Inflates an object.
 * For example: `{ "hello.world": "earth" }` goes to `{ "hello": { "world": "earth" } }` 
 * @param {any} target 
 * @param {any} source 
 * @param {any} key 
 */
function inflateObject(target, source, key) {
  if (typeof source === 'object') {
    for (const key in source) {
      _inflateObjectHelper(target, source[key], key);
    }
  } else {
    _inflateObjectHelper(target, source, key);
  }
}

function _inflateObjectHelper(target, source, key) {
  const dotIndex = key[0] === '@' ? -1 : key.indexOf('.');

  if (dotIndex === -1) {
    target[key] = source;
  } else {
    const parentKey = key.slice(0, dotIndex);
    const childKey = key.slice(dotIndex + 1);
    if (target[parentKey] === undefined) {
      target[parentKey] = {};
    }
    inflateObject(target[parentKey], source, childKey);
  }
}
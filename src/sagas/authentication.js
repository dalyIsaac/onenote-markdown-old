import { call, put } from "redux-saga/effects";

import { UserData } from "./../types";
import { authentication, notebooks } from "../actions";
import { graphScopes } from "../constants";
import { blobUrl, getToken } from "./index";
import { betaUrl } from "../constants";

import axios from "axios";
import localforage from 'localforage';

/**
 * Adds the users who are currently signed into the store
 * @export
 * @param {any} action
 */
export function* authenticate(action) {
  const userList = yield call([action.app, action.app.getAllUsers]);
  if (userList.length > 0) {
    let userDataObject = {};
    userList.forEach(user => {
      userDataObject[user.userIdentifier] = new UserData(user);
    });
    yield put(authentication.newUserObject(userDataObject));
    for (const userId in userDataObject) {
      const user = userDataObject[userId];
      yield put(authentication.getPhoto(user));
    }
  }
  yield put(notebooks.loadSavedNotebooks());
}

/**
 * Acquires a token by redirecting a user who is logged in, but the token has expired
 * @export
 * @param {any} action
 */
export function* reauthorizeUser(action) {
  yield call(
    [action.app, action.app.acquireTokenRedirect],
    graphScopes,
    "https://login.microsoftonline.com/common",
    action.user
  );
}

export function* signIn(action) {
  yield call([action.app, action.app.loginRedirect], graphScopes);
  // no need for a put because the app redirects
}

export function* signOut(action) {
  yield call([localforage, localforage.clear]);
  yield call([action.app, action.app.logout]);
  // no need for a put because the app redirects
}

/**
 * Gets the profile photos of users
 * @export
 * @param {any} action
 */
export function* getPhoto(action) {
  const currentToken = yield call(getToken, action.app, action.user);
  if (currentToken !== "") {
    try {
      const result = yield call(axios, {
        method: "get",
        responseType: "blob",
        url: betaUrl + "me/photo/$value",
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      const photo = result.data && blobUrl(result.data);
      const newUser = new UserData(action.user, photo);
      yield put(authentication.updateUser(newUser));
    } catch (error) {
      console.error(
        `Getting photo failed for ${action.user.displayableId}: ${error}`
      );
    }
  } else {
    console.error("No token");
  }
}

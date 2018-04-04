import { call, put } from "redux-saga/effects";
import { push } from "react-router-redux";

import { UserData } from "./../types";
import { authentication, notebooks } from "../actions";
import { graphScopes } from "../constants";
import { blobUrl } from "./index";
import { betaUrl } from "../constants";

import axios from "axios";
import localforage from 'localforage';
import * as Msal from "msal";
import { appId, cacheLocation } from "../constants";

let app = null;

/**
 * Adds the users who are currently signed into the store
 * @export
 * @param {any} action
 */
export function* authenticate(action) {
  const redirectUri = window.location.href.includes("localhost:3000")
    ? "http://localhost:3000"
    : "";
  app = new Msal.UserAgentApplication(
    appId,
    "",
    () => {
      // callback
      action.dispatch(push("/"));
    },
    {
      cacheLocation,
      redirectUri,
      postLogoutRedirectUri: redirectUri
    }
  )
  const userList = yield call([app, app.getAllUsers]);
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
    [app, app.acquireTokenRedirect],
    graphScopes,
    "https://login.microsoftonline.com/common",
    action.user
  );
}

export function* signIn(action) {
  yield call([app, app.loginRedirect], graphScopes);
  // no need for a put because the app redirects
}

export function* signOut(action) {
  yield call([localforage, localforage.clear]);
  yield call([app, app.logout]);
  // no need for a put because the app redirects
}

/**
 * Gets the profile photos of users
 * @export
 * @param {any} action
 */
export function* getPhoto(action) {
  const currentToken = yield call(getToken, action.user);
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

/**
 * Gets the users's token with a silent call
 * @export
 * @param {UserData} user
 */
export function* getToken(user) {
  try {
    const currentToken = yield call(
      [app, app.acquireTokenSilent],
      graphScopes,
      null,
      user
    );
    return currentToken
  } catch (error) {
    console.error(
      `Could not acquire a valid token ${
      user.displayableId
      } by silently querying MSAL.`
    );
    console.error(error);
    const newUser = new UserData(user, "", error);
    yield put(authentication.updateUser(newUser));
    return "";
  }
}

/**
 * Gets the users's token with a redirect
 * @export
 * @param {UserData} user
 */
export function* getTokenRedirect(user) {
  try {
    const currentToken = yield call(
      [app, app.acquireTokenRedirect],
      graphScopes,
      null,
      user
    );
    return currentToken;
  } catch (error) {
    console.error(
      `Could not acquire a valid token ${
      user.displayableId
      } by redirecting to MSAL authentication.`
    );
    console.error(error);
    const newUser = new UserData(user, "", error);
    yield put(authentication.updateUser(newUser));
    return "";
  }
}


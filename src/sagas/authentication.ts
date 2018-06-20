import { push } from "react-router-redux";
import { call, CallEffect, put, select } from "redux-saga/effects";

import { authentication, IAction, IActionUser, onenote } from "../actions";
import { graphScopes } from "../constants";
import { betaUrl } from "../constants";

import * as localforage from "localforage";
import { User, UserAgentApplication } from "msal";
import * as Msal from "msal";
import { UserData } from "src/types/UserData";
import { IAuthenticate, IGetPhoto } from "../actions/authentication";
import { appId, cacheLocation } from "../constants";
import { IState } from "../reducers";
import * as fetch from "./fetch";

let app: UserAgentApplication;

/**
 * Adds the users who are currently signed into the store
 * @export
 */
export function* authenticate(action: IAuthenticate) {
  const redirectUri = window.location.href.includes("localhost:3000")
    ? "http://localhost:3000"
    : "https://onenotemarkdown.azurewebsites.net";
  app = new UserAgentApplication(
    appId,
    "",
    () => {
      // callback
      action.dispatch(push("/"));
    },
    {
      cacheLocation,
      postLogoutRedirectUri: redirectUri,
      redirectUri
    }
  );
  const userList: Msal.User[] = yield call([app, app.getAllUsers]);
  if (userList.length > 0) {
    const userDataObject = {};
    userList.forEach(user => {
      userDataObject[user.userIdentifier] = new UserData(user);
    });
    yield put(authentication.newUserObject(userDataObject));
    for (const userId in userDataObject) {
      if (userDataObject.hasOwnProperty(userId)) {
        yield put(authentication.getPhoto(userId));
      }
    }
  }
  yield put(onenote.getOneNote());
}

/**
 * Acquires a token by redirecting a user who is logged in, but the token has expired
 * @export
 */
export function* reauthorizeUser(action: IActionUser) {
  const user: User | undefined = yield call(
    getUser,
    action.user.userIdentifier
  );
  yield call(
    [app, app.acquireTokenRedirect],
    graphScopes,
    "https://login.microsoftonline.com/common",
    user
  );
}

function* getUser(
  userIdentifier: string
): IterableIterator<User | CallEffect | undefined> {
  const userList: User[] = yield call([app, app.getAllUsers]);
  let index = -1;
  userList.forEach((user: User) => {
    if (user.userIdentifier === userIdentifier) {
      index++;
    }
  });
  return userList[index];
}

export function* signIn(action: IAction) {
  yield call([app, app.loginRedirect], graphScopes);
  // no need for a put because the app redirects
}

export function* signOut(action: IAction) {
  yield call([localforage, localforage.clear]);
  yield call([app, app.logout]);
  // no need for a put because the app redirects
}

/**
 * Gets the profile photos of users
 * @export
 * @param {any} action
 */
export function* getPhoto(action: IGetPhoto) {
  const { userId } = action;
  const user = yield select((state: IState) => state.users[userId]);
  // the beta URL is used because the v1.0 URl doesn't seem to return the pictures
  const result = yield call(
    fetch.get,
    betaUrl + "me/photo/$value",
    userId,
    fetch.responseTypes.BLOB
  );
  if (result.error === undefined) {
    const photo = result && blobUrl(result);
    const newUser = new UserData(user, photo);
    yield put(authentication.updateUser(newUser));
  } else {
    console.log(`Getting photo failed for ${user.displayableId}`);
  }
}

const urls = new WeakMap();

// code courtesy of https://www.bignerdranch.com/blog/dont-over-react/
const blobUrl = (blob: object) => {
  if (urls.has(blob)) {
    return urls.get(blob);
  } else {
    const url = URL.createObjectURL(blob);
    urls.set(blob, url);
    return url;
  }
};

/**
 * Gets the users's token with a silent call
 * @export
 */
export function* getToken(userId: string) {
  const user = yield select((state: IState) => state.users[userId]);
  try {
    const currentToken = yield call(
      [app, app.acquireTokenSilent],
      graphScopes,
      null,
      user
    );
    return currentToken;
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
 * @param {string} userId
 */
export function* getTokenRedirect(userId: string) {
  try {
    const user: User | undefined = yield call(getUser, userId);
    const currentToken = yield call(
      [app, app.acquireTokenRedirect],
      graphScopes,
      null,
      user
    );
    return currentToken;
  } catch (error) {
    console.error(
      `Could not acquire a valid token ${userId} by redirecting to MSAL authentication.`
    );
    console.error(error);
    const user = yield select((state: IState) => state.users[userId]);
    const newUser = new UserData(user, "", error);
    yield put(authentication.updateUser(newUser));
    return "";
  }
}

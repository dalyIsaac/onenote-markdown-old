import { takeEvery, takeLatest, call, put } from "redux-saga/effects";

import { graphScopes } from "../constants";
import {
  AUTHENTICATE,
  SIGN_IN,
  SIGN_OUT,
  GET_PHOTO,
  GET_ALL_NOTEBOOKS,
  REAUTHORIZE_USER,
  OPEN_NOTEBOOKS,
  LOAD_SAVED_NOTEBOOKS,
  CLOSE_NOTEBOOK
} from "./../actionTypes";
import { UserData } from "./../types";
import { authentication } from "../actions";

import {
  authenticate,
  signIn,
  signOut,
  getPhoto,
  reauthorizeUser
} from "./authentication";
import { getAllNotebooks, openNotebooks, loadSavedNotebooks, closeNotebook } from "./notebooks";

export default function* rootSaga() {
  yield takeLatest(AUTHENTICATE, authenticate);
  yield takeLatest(SIGN_IN, signIn);
  yield takeLatest(SIGN_OUT, signOut);
  yield takeEvery(GET_PHOTO, getPhoto);
  yield takeLatest(GET_ALL_NOTEBOOKS, getAllNotebooks);
  yield takeLatest(REAUTHORIZE_USER, reauthorizeUser);
  yield takeLatest(OPEN_NOTEBOOKS, openNotebooks);
  yield takeLatest(LOAD_SAVED_NOTEBOOKS, loadSavedNotebooks);
  yield takeEvery(CLOSE_NOTEBOOK, closeNotebook);
}

const urls = new WeakMap();

// code courtesy of https://www.bignerdranch.com/blog/dont-over-react/
export const blobUrl = blob => {
  if (urls.has(blob)) {
    return urls.get(blob);
  } else {
    let url = URL.createObjectURL(blob);
    urls.set(blob, url);
    return url;
  }
};

// Storing the token as a variable outside instead of yielding is to avoid interfering with redux-saga.
// It should be thought of as an instance variable
export let currentToken = "";

/**
 * Gets the users's token with a silent call
 * @export
 * @param {UserAgentApplication} app
 * @param {UserData} user
 */
export function* getToken(app, user) {
  try {
    currentToken = yield call(
      [app, app.acquireTokenSilent],
      graphScopes,
      null,
      user
    );
  } catch (error) {
    currentToken = "";
    console.error(
      `Could not acquire a valid token ${
      user.displayableId
      } by silently querying MSAL.`
    );
    console.error(error);
    const newUser = new UserData(user, "", error);
    yield put(authentication.updateUser(newUser));
  }
}

/**
 * Gets the users's token with a redirect
 * @export
 * @param {UserAgentApplication} app
 * @param {UserData} user
 */
export function* getTokenRedirect(app, user) {
  try {
    currentToken = yield call(
      [app, app.acquireTokenRedirect],
      graphScopes,
      null,
      user
    );
  } catch (error) {
    currentToken = "";
    console.error(
      `Could not acquire a valid token ${
      user.displayableId
      } by redirecting to MSAL authentication.`
    );
    console.error(error);
    const newUser = new UserData(user, "", error);
    yield put(authentication.updateUser(newUser));
  }
}

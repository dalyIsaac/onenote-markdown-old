import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';

import { graphScopes } from '../constants';
import { UserData, AUTHENTICATE, SIGN_IN, SIGN_OUT, GET_PHOTO, GET_ALL_NOTEBOOKS } from './../types';
import { authentication }from '../actions';

import { authenticate, signIn, signOut, getPhoto } from './authentication';
import { getAllNotebooks } from './notebooks';

export default function* rootSaga() {
    yield takeLatest(AUTHENTICATE, authenticate);
    yield takeLatest(SIGN_IN, signIn);
    yield takeLatest(SIGN_OUT, signOut);
    yield takeEvery(GET_PHOTO, getPhoto);
    yield takeLatest(GET_ALL_NOTEBOOKS, getAllNotebooks);
}

const urls = new WeakMap();

// code courtesy of https://www.bignerdranch.com/blog/dont-over-react/
export const blobUrl = blob => {
    if (urls.has(blob)) {
      return urls.get(blob)
    } else {
      let url = URL.createObjectURL(blob)
      urls.set(blob, url)
      return url
    }
  }

// Storing the token as a variable outside, instead of yielding is to avoid interfering with redux-saga.
// It should be thought of as an instance variable
export let currentToken = '';

export function* getToken(app, user) {
  try {
    currentToken = yield call([app, app.acquireTokenSilent], graphScopes, null, user);
  } catch (error) {
    currentToken = '';
    console.error(`Token error for ${user}: ${error} `);
    const newUser = UserData(user.msal, '', error)
    yield put(authentication.updateUser(newUser));
  }
}

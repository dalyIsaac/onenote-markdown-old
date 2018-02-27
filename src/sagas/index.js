import { AUTHENTICATE, SIGN_IN, SIGN_OUT, GET_PHOTO } from './../types';
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { authenticate, signIn, signOut, getPhoto } from './authentication';

export const stableUrl = 'https://graph.microsoft.com/v1.0/';
export const betaUrl = 'https://graph.microsoft.com/beta/';


export default function* rootSaga() {
    yield takeLatest(AUTHENTICATE, authenticate);
    yield takeLatest(SIGN_IN, signIn);
    yield takeLatest(SIGN_OUT, signOut);
    yield takeEvery(GET_PHOTO, getPhoto)
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
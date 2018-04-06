import { takeEvery, takeLatest } from "redux-saga/effects";

import {
  AUTHENTICATE,
  SIGN_IN,
  SIGN_OUT,
  GET_PHOTO,
  REAUTHORIZE_USER,
  OPEN_NOTEBOOKS,
  GET_NOTEBOOK,
  GET_ALL_NOTEBOOKS,
  SAVE_NOTEBOOK,
  GET_SECTION_GROUP,
  SAVE_SECTION_GROUP,
  GET_SECTION,
  SAVE_SECTION,
} from "./../actionTypes";

import {
  authenticate,
  signIn,
  signOut,
  getPhoto,
  reauthorizeUser
} from "./authentication";
import {
  openNotebooks,
  getNotebook,
  saveNotebook,
  getSectionGroup,
  saveSectionGroup,
  getSection,
  saveSection
} from "./onenote";
import { getAllNotebooks } from "./notebooks";

// import { openNotebooks } from "./onenote";

export default function* rootSaga() {
  yield takeLatest(AUTHENTICATE, authenticate);
  yield takeLatest(SIGN_IN, signIn);
  yield takeLatest(SIGN_OUT, signOut);
  yield takeEvery(GET_PHOTO, getPhoto);
  yield takeLatest(REAUTHORIZE_USER, reauthorizeUser);
  yield takeEvery(GET_ALL_NOTEBOOKS, getAllNotebooks);
  yield takeEvery(OPEN_NOTEBOOKS, openNotebooks);
  yield takeEvery(GET_NOTEBOOK, getNotebook);
  yield takeEvery(SAVE_NOTEBOOK, saveNotebook);
  yield takeEvery(GET_SECTION_GROUP, getSectionGroup);
  yield takeEvery(SAVE_SECTION_GROUP, saveSectionGroup);
  yield takeEvery(GET_SECTION, getSection);
  yield takeEvery(SAVE_SECTION, saveSection);
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

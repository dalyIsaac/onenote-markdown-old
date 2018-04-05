import { takeEvery, takeLatest } from "redux-saga/effects";

import {
  AUTHENTICATE,
  SIGN_IN,
  SIGN_OUT,
  GET_PHOTO,
  GET_ALL_NOTEBOOKS,
  REAUTHORIZE_USER,
  OPEN_NOTEBOOKS,
  LOAD_SAVED_NOTEBOOKS,
  CLOSE_NOTEBOOK,
  GET_SECTION_GROUPS,
  UPDATE_NOTEBOOK_ORDER,
  LOAD_NOTEBOOK
} from "./../actionTypes";

import {
  authenticate,
  signIn,
  signOut,
  getPhoto,
  reauthorizeUser
} from "./authentication";
import {
  getAllNotebooks,
  openNotebooks,
  loadSavedNotebooks,
  closeNotebook
} from "./notebooks";
import { getSectionGroups } from "./sectionGroups";
import { storageSetNotebookOrder, loadNotebook } from "./storage";

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
  yield takeEvery(GET_SECTION_GROUPS, getSectionGroups);
  yield takeEvery(UPDATE_NOTEBOOK_ORDER, storageSetNotebookOrder);
  yield takeEvery(LOAD_NOTEBOOK, loadNotebook);
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

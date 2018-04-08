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
  ADD_NOTEBOOK_TO_ORDER,
  GET_PAGE,
  SAVE_PAGE,
  GET_ONENOTE,
  UPDATE_SELECTED_NOTEBOOK,
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
  saveSection,
  getPage,
  savePage,
  getOneNote,
  getNotebookChildren
} from "./onenote";
import { getAllNotebooks } from "./allNotebooks";
import { addNotebookToOrder } from "./notebookOrder";

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
  yield takeEvery(GET_PAGE, getPage);
  yield takeEvery(SAVE_PAGE, savePage);
  yield takeEvery(ADD_NOTEBOOK_TO_ORDER, addNotebookToOrder);
  yield takeLatest(GET_ONENOTE, getOneNote);
  yield takeLatest(UPDATE_SELECTED_NOTEBOOK, getNotebookChildren);
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

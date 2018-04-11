import { channel } from "redux-saga";
import { takeEvery, takeLatest, take, fork, call } from "redux-saga/effects";

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
  UPDATE_SELECTED,
  UPDATE_IS_EXPANDED
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
  getChildren
} from "./onenote";
import { getAllNotebooks } from "./allNotebooks";
import { addNotebookToOrder } from "./notebookOrder";
import { updateSelected } from "./selectedNav";

// import { openNotebooks } from "./onenote";

export default function* rootSaga() {

  // AUTH
  yield takeLatest(AUTHENTICATE, authenticate);
  yield takeLatest(SIGN_IN, signIn);
  yield takeLatest(SIGN_OUT, signOut);
  yield takeLatest(REAUTHORIZE_USER, reauthorizeUser);

  // UserData
  yield takeEvery(GET_PHOTO, getPhoto);

  // Get onenote from localforage
  yield takeLatest(GET_ONENOTE, getOneNote); 

  // Save to localforage and redux
  yield takeEvery(SAVE_NOTEBOOK, saveNotebook);
  yield takeEvery(SAVE_SECTION_GROUP, saveSectionGroup);
  yield takeEvery(SAVE_SECTION, saveSection);
  yield takeEvery(SAVE_PAGE, savePage);

  // GET FROM MSGRAPH
  yield takeEvery(OPEN_NOTEBOOKS, openNotebooks);
  yield takeEvery(GET_ALL_NOTEBOOKS, getAllNotebooks);
  yield takeEvery(GET_NOTEBOOK, getNotebook);
  yield takeEvery(GET_SECTION_GROUP, getSectionGroup);
  yield takeEvery(GET_SECTION, getSection);
  yield takeEvery(GET_PAGE, getPage);
  
  // Mainly GUI stuff
  yield takeEvery(ADD_NOTEBOOK_TO_ORDER, addNotebookToOrder);
  yield takeLatest(UPDATE_IS_EXPANDED, getChildren);
  yield takeLatest(UPDATE_SELECTED, getChildren);
  yield takeLatest(UPDATE_SELECTED, updateSelected);
}

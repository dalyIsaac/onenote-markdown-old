import { buffers, channel } from "redux-saga";
import { takeEvery, takeLatest, take, fork, call, put } from "redux-saga/effects";

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
  UPDATE_IS_EXPANDED,
  GET_PAGE_CONTENT,
  SAVE_PAGE_CONTENT
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
  savePageContent,
  getOneNote,
  getChildren,
  getPageContent
} from "./onenote";
import { getAllNotebooks } from "./allNotebooks";
import { addNotebookToOrder } from "./notebookOrder";
import { updateSelected } from "./selectedNav";

function* handleGraphRequests(chan) {
  while (true) {
    const action = yield take(chan);
    let func = undefined;
    switch (action.type) {
      case OPEN_NOTEBOOKS:
        func = openNotebooks;
        break;
      case GET_ALL_NOTEBOOKS:
        func = getAllNotebooks;
        break;
      case GET_NOTEBOOK:
        func = getNotebook;
        break;
      case GET_SECTION_GROUP:
        func = getSectionGroup;
        break;
      case GET_SECTION:
        func = getSection;
        break;
      case GET_PAGE:
        func = getPage;
        break;
      case GET_PAGE_CONTENT:
        func = getPageContent;
        break;
      default:
        func = undefined;
    }

    if (func !== undefined) {
      yield call(func, action);
    }
  }
}

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
  yield takeEvery(SAVE_PAGE_CONTENT, savePageContent);

  // Mainly GUI stuff
  yield takeEvery(ADD_NOTEBOOK_TO_ORDER, addNotebookToOrder);
  yield takeLatest(UPDATE_IS_EXPANDED, getChildren);
  yield takeLatest(UPDATE_SELECTED, getChildren);
  yield takeLatest(UPDATE_SELECTED, updateSelected);

  const chan = channel(buffers.expanding()); // create a channel to queue incoming requests

  // the following ensures that only 5 concurrent calls to MSGraph can be made at once
  for (let i = 0; i < 5; i++) {
    yield fork(handleGraphRequests, chan);
  }

  while (true) {
    const action = yield take([
      OPEN_NOTEBOOKS,
      GET_ALL_NOTEBOOKS,
      GET_NOTEBOOK,
      GET_SECTION_GROUP,
      GET_SECTION,
      GET_PAGE,
      GET_PAGE_CONTENT
    ]);
    yield put(chan, action);
  }


}

import { call, put, select } from "redux-saga/effects";
import { getToken, currentToken } from "./index";
import { stableUrl } from "../constants";
import { getNotebooks, notebooks } from "../actions";
import { Notebook } from "./../types";

import axios from "axios";

import localForage from 'localforage';

const getUsers = state => state.users;

/**
 * Gets a list of all of the notebooks which belong to the signed in users
 */
export function* getAllNotebooks(action) {
  yield put(getNotebooks.clearAllNotebooks());
  const userList = yield select(getUsers);
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    yield call(getToken, action.app, user);
    if (currentToken !== "") {
      const result = yield call(axios, {
        method: "get",
        url: stableUrl + "me/onenote/notebooks",
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      yield put(getNotebooks.putAllNotebooks(user, result.data.value));
    }
  }
}

/**
 * Saves a new notebook to localforage
 * @param {Notebook} notebook 
 */
function* saveNotebook(notebook) {
  try {
    yield call([localForage, localForage.setItem], notebook.id, notebook);
  } catch (error) {
    console.error(`localForage could not write ${notebook} to ${notebook.id}`);
    console.error(error);
  }
}

export function* getItem(action) {
  try {
    const bigValue = yield call([localForage, localForage.getItem], "bigValue")
    console.log(bigValue)
  } catch (error) {
    // console.error(`localForage could not get ${action.notebook.id}`);
    console.log(error)
  }
}

export function* openNotebooks(action) {
  for (let i = 0; i < action.notebooks.length; i++) {
    const element = action.notebooks[i];
    const user = element.user;
    yield call(getToken, action.app, user);
    if (currentToken !== "") {
      const result = yield call(axios, {
        method: "get",
        url: stableUrl + "me/onenote/notebooks/" + element.notebook.id,
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      const newNotebook = new Notebook(result.data, user);
      yield put(notebooks.loadNotebook(newNotebook));
      yield call(saveNotebook, newNotebook);
    }
  }
}

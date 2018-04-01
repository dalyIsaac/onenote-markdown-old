import { call, put, select } from "redux-saga/effects";
import axios from "axios";
import localForage from 'localforage';
import { getToken, currentToken } from "./index";
import { stableUrl } from "../constants";
import { getNotebooks, notebooks } from "../actions";
import { Notebook } from "./../types";
import { updateNotebookOrder } from "../actions/notebooks";

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
 * Sets an object using localForage
 * @param {string} index 
 * @param {any} data 
 */
function* storageSetItem(index, data) {
  try {
    yield call([localForage, localForage.setItem], index, data);
  } catch (error) {
    console.error(`localForage could not write ${index} to ${data}`);
    console.error(error);
  }
}

/**
 * Loads newly opened notebooks into redux and localforage
 * @param action 
 */
export function* openNotebooks(action) {
  let notebookOrder = yield select((state) => {
    return [...(state.notebookOrder)];
  });
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
      yield put(notebooks.loadNotebookIntoRedux(newNotebook));
      yield call(storageSetItem, newNotebook.id, newNotebook);

      // Update notebook order
      notebookOrder.push(newNotebook.id);
      yield call(storageSetItem, 'notebookOrder', notebookOrder);
    }
  }
  yield put(notebooks.updateNotebookOrder(notebookOrder));
}

/**
 * Loads saved notebooks into redux
 * @export
 * @param {any} action 
 */
export function* loadSavedNotebooks(action) {
  try {
    // Retrieve notebooks
    let notebookList = [];
    yield call([localForage, localForage.iterate],
      (value) => {
        notebookList.push(new Notebook(value));
      }
    );
    for (let i = 0; i < notebookList.length; i++) {
      const element = notebookList[i];
      yield put(notebooks.loadNotebookIntoRedux(element));
    }

    // Retrieve notebook order
    const notebookOrder = yield call([localForage, localForage.getItem], 'notebookOrder');
    yield put(updateNotebookOrder(notebookOrder));
  } catch (error) {
    console.error(error)
  }
}

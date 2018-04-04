import { call, put, select } from "redux-saga/effects";
import axios from "axios";
import { getToken } from "./index";
import { stableUrl } from "../constants";
import { getNotebooks, notebooks, totalNotebookLength } from "../actions";
import { Notebook } from "./../types";
import { updateNotebookOrder } from "../actions/notebookOrder";
import { updateSelectedNotebook } from "../actions/selectedNav";
import { storageGetItem, storageSetItem, storageGetItems, storageSetNotebookOrder, storageRemoveItem } from "./storage";

const getUsers = state => state.users;

/**
 * Gets a list of all of the notebooks which belong to the signed in users
 */
export function* getAllNotebooks(action) {
  yield put(getNotebooks.clearAllNotebooks());
  const userObject = yield select(getUsers);
  for (const userId in userObject) {
    const user = userObject[userId];
    const currentToken = yield call(getToken, action.app, user);
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
 * Loads newly opened notebooks into redux and localforage
 * @param action 
 */
export function* openNotebooks(action) {
  // Retrieve notebook order
  let notebookOrder = yield select((state) => {
    return [...(state.notebookOrder)];
  });
  yield put(totalNotebookLength.update(notebookOrder.length + action.notebooks.length));

  for (let i = 0; i < action.notebooks.length; i++) {
    const element = action.notebooks[i];
    const user = element.user;
    const currentToken = yield call(getToken, action.app, user);
    if (currentToken !== "") {
      const result = yield call(axios, {
        method: "get",
        url: stableUrl + "me/onenote/notebooks/" + element.notebook.id,
        headers: { Authorization: `Bearer ${currentToken}` }
      });

      const newNotebook = new Notebook(result.data, user);
      yield put(notebooks.loadNotebookIntoRedux(newNotebook));
      yield call(storageSetItem, newNotebook.id, newNotebook, "notebook");

      // Update notebook order
      notebookOrder.push(newNotebook.id);
      yield call(storageSetNotebookOrder, notebookOrder);
      yield put(updateNotebookOrder(notebookOrder));
    }
  }
}

/**
 * Loads saved notebooks into redux
 * @export
 * @param {any} action 
 */
export function* loadSavedNotebooks(action) {
  try {
    // Retrieve notebook order
    const notebookOrder = (yield call(storageGetItem, "notebookOrder")) || [];
    yield put(totalNotebookLength.update(notebookOrder.length));

    let notebookObject = yield call(storageGetItems, "notebook");

    yield put(notebooks.loadNotebooksIntoRedux(notebookObject));

    // Update notebook order here so that will be able to find all of the notebooks the order specifies
    yield put(updateNotebookOrder(notebookOrder));
  } catch (error) {
    console.error(error)
  }
}

export function* closeNotebook(action) {
  try {
    yield put(totalNotebookLength.removeOne());
    yield call(storageRemoveItem, action.notebookId, "notebook");

    let notebookOrder = yield call(storageGetItem, "notebookOrder");
    const index = notebookOrder.indexOf("notebook." + action.notebookId);
    notebookOrder.splice(index, 1);
    yield call(storageSetItem, 'notebookOrder', notebookOrder);
    yield put(updateNotebookOrder(notebookOrder));

    yield put(updateSelectedNotebook([]));
  } catch (error) {
    console.error(error);
  }
}

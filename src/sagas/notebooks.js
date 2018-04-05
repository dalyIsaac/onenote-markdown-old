import { call, put, select } from "redux-saga/effects";
import axios from "axios";
import { getToken } from "./authentication";
import { stableUrl } from "../constants";
import { getNotebooks, notebooks, totalNotebookLength, sectionGroups } from "../actions";
import { Notebook } from "./../types";
import { updateNotebookOrder } from "../actions/notebookOrder";
import { updateSelectedNotebook } from "../actions/selectedNav";
import { storageGetItem, storageGetItems, storageRemoveItem } from "./storage";

const getUsers = state => state.users;

/**
 * Gets a list of all of the notebooks which belong to the signed in users
 */
export function* getAllNotebooks(action) {
  yield put(getNotebooks.clearAllNotebooks());
  const usersObject = yield select(getUsers);
  for (const userId in usersObject) {
    const user = usersObject[userId];
    const currentToken = yield call(getToken, user);
    if (currentToken !== "") {
      const result = yield call(axios, {
        method: "get",
        url: stableUrl + "me/onenote/notebooks",
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      // result.data.value isn't deflated because allNotebooks is wiped every time the user asks for more notebook.
      // Thus it isn't necessary to worry about React re-rendering on every state change in allNotebooks, because it will
      yield put(getNotebooks.putAllNotebooks(userId, user.displayableId, result.data.value));
    }
  }
}

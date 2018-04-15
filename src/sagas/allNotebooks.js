import { call, put, select } from "redux-saga/effects";
import * as fetch from "./fetch";
import { stableUrl } from "../constants";
import { getNotebooks } from "../actions";

const getUsers = state => state.users;

/**
 * Gets a list of all of the notebooks which belong to the signed in users
 */
export function* getAllNotebooks(action) {
  yield put(getNotebooks.clearAllNotebooks());
  const usersObject = yield select(getUsers);
  for (const userId in usersObject) {
    const user = usersObject[userId];
    const url = stableUrl + "me/onenote/notebooks";
    const result = yield call(fetch.get, url, userId);
    if (result.error === undefined) {
      // result isn't deflated because allNotebooks is wiped every time the user asks for more notebook.
      yield put(getNotebooks.putAllNotebooks(userId, user.displayableId, result.value));
    }
  }
}

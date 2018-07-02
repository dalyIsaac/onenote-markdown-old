import { call, put, select } from "redux-saga/effects";
import { allNotebooks, IAction } from "../actions";
import { stableUrl } from "../constants";
import { IState } from "../reducers";
import * as fetch from "./fetch";

const getUsers = (state: IState) => state.users;

/**
 * Gets a list of all of the notebooks which belong to the signed in users
 */
export function* getAllNotebooks(action: IAction) {
  yield put(allNotebooks.clearAllNotebooks());
  const usersObject = yield select(getUsers);
  for (const userId in usersObject) {
    if (usersObject.hasOwnProperty(userId)) {
      const user = usersObject[userId];
      const url = stableUrl + "me/onenote/notebooks";
      const result = yield call(fetch.get, url, userId);
      if (result.error === undefined) {
        // result isn't deflated because allNotebooks is wiped every time the user asks for more notebook.
        yield put(
          allNotebooks.putAllNotebooks(userId, user.displayableId, result.value)
        );
      }
    }
  }
}

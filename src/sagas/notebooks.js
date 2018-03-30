import { call, put, select } from "redux-saga/effects";
import { getToken, currentToken } from "./index";
import { stableUrl } from "../constants";
import { getNotebooks } from "../actions";

import axios from "axios";

const getUsers = state => state.users;

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

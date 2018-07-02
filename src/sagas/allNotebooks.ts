import { Notebook as Graph_Notebook } from "@microsoft/microsoft-graph-types";
import { call, put, select } from "redux-saga/effects";
import { allNotebooks, IAction } from "../actions";
import { stableUrl } from "../constants";
import { IState, IStateUserNotebooks, IStateUsers } from "../reducers";
import * as fetch from "./fetch";

const getUsers = (state: IState): IStateUsers => state.users;

/**
 * Gets a list of all of the notebooks which belong to the signed in users
 */
export function* getAllNotebooks(action: IAction) {
  const newState: IStateUserNotebooks[] = [];
  const usersObject: IStateUsers = yield select(getUsers);
  for (const userId in usersObject) {
    if (usersObject.hasOwnProperty(userId)) {
      const user = usersObject[userId];
      const url = stableUrl + "me/onenote/notebooks";
      const result = yield call(fetch.get, url, userId);
      if (result.error === undefined) {
        newState.push({
          displayableId: user.displayableId as string,
          notebooks: result.value as Graph_Notebook[],
          userId
        });
      }
    }
  }
  yield put(allNotebooks.putAllNotebooks(newState));
}

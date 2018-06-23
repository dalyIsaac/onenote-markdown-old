import { call } from "redux-saga/effects";
import { IAddNotebookToOrder } from "../actions/notebookOrder";
import { localStorageGetItem, localStorageSetItem } from "./storage";

export function* addNotebookToOrder(action: IAddNotebookToOrder) {
  let order = yield call(localStorageGetItem, "notebookOrder");
  const { notebookId } = action;
  if (order === null) {
    order = [notebookId];
    yield call(localStorageSetItem, "notebookOrder", order);
  } else if (order.indexOf(notebookId) === -1) {
    order.push(notebookId);
    yield call(localStorageSetItem, "notebookOrder", order);
  }
}

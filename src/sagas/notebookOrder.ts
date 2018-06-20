import { call } from "redux-saga/effects";
import { IAddNotebookToOrder } from "../actions/notebookOrder";
import { storageGetItem, storageSetItem } from "./storage";

export function* addNotebookToOrder(action: IAddNotebookToOrder) {
  let order = yield call(storageGetItem, "notebookOrder");
  const { notebookId } = action;
  if (order === null) {
    order = [notebookId];
    yield call(storageSetItem, "notebookOrder", order);
  } else if (order.indexOf(notebookId) === -1) {
    order.push(notebookId);
    yield call(storageSetItem, "notebookOrder", order);
  }
}

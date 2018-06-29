import { call } from "redux-saga/effects";
import { IAddNotebookToOrder } from "../actions/notebookOrder";
import { indexeddbStorageGetItem, indexeddbStorageSetItem } from "./storage";

export function* addNotebookToOrder(action: IAddNotebookToOrder) {
  let order = yield call(indexeddbStorageGetItem, "notebookOrder");
  const { notebookId } = action;
  if (order === null) {
    order = [notebookId];
    yield call(indexeddbStorageSetItem, "notebookOrder", order);
  } else if (order.indexOf(notebookId) === -1) {
    order.push(notebookId);
    yield call(indexeddbStorageSetItem, "notebookOrder", order);
  }
}

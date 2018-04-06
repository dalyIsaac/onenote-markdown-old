import { call } from "redux-saga/effects";
import { storageSetItem, storageGetItem } from "./storage";

export function* addNotebookToOrder(action) {
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
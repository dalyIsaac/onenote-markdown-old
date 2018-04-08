import { select, put } from "redux-saga/effects";
import { selectedNav } from "../actions";

export function* updateSelected(action) {
    let { id } = action;
    const onenote = yield select(state => state.onenote);
    let order = [id];
    let element = onenote[id];
    while (element !== undefined && element.hasOwnProperty("parentNotebook.id")) {
        const id = element["parentSectionGroup.id"] || element["parentNotebook.id"];
        order.unshift(id)
        element = onenote[id];
    }
    yield put(selectedNav.putSelected(order));
}
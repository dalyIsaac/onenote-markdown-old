import { select, put } from "redux-saga/effects";
import { selectedNav } from "../actions";

export function* updateSelected(action) {
    let { id } = action;
    const onenote = yield select(state => state.onenote);
    let order = [id];
    let element = onenote[id];
    
    // for pages
    while (element !== undefined && element.hasOwnProperty("parentSection.id")) {
        const id = element["parentSection.id"];
        order.unshift(id);
        element = onenote[id];
    }

    // for pages, sections, and section groups
    while (element !== undefined && element.hasOwnProperty("parentNotebook.id")) {
        const id = element["parentSectionGroup.id"] || element["parentNotebook.id"];
        order.unshift(id);
        element = onenote[id];
    }

    yield put(selectedNav.putSelected(order));
}
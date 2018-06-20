import { put, select } from "redux-saga/effects";
import { selectedNav } from "../actions";
import { IUpdateSelected } from "../actions/selectedNav";
import { IState } from "../reducers";

export function* updateSelected(action: IUpdateSelected) {
  let { id } = action;
  const onenote = yield select((state: IState) => state.onenote);
  const order = [id];
  let element = onenote[id];

  // for pages
  while (element !== undefined && element.hasOwnProperty("parentSection.id")) {
    id = element["parentSection.id"];
    order.unshift(id);
    element = onenote[id];
  }

  // for pages, sections, and section groups
  while (element !== undefined && element.hasOwnProperty("parentNotebook.id")) {
    id = element["parentSectionGroup.id"] || element["parentNotebook.id"];
    order.unshift(id);
    element = onenote[id];
  }

  yield put(selectedNav.putSelected(order));
}

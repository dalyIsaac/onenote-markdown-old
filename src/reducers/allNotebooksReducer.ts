/**
 * allNotebooksReducer is used for retrieving all of the notebooks which the logged in users have access to, and to open notebooks
 */

import { IStateUserNotebooks } from "src/reducers";
import { IAction } from "../actions";
import { IPutAllNotebooks } from "../actions/allNotebooks";
import { CLEAR_ALL_NOTEBOOKS, PUT_ALL_NOTEBOOKS } from "./../actionTypes";

export default function notebooksReducer(
  state: IStateUserNotebooks[] = [],
  action: IAction
) {
  switch (action.type) {
    case CLEAR_ALL_NOTEBOOKS:
      return [];
    case PUT_ALL_NOTEBOOKS:
      const castedAction = action as IPutAllNotebooks;
      return castedAction.newState;
    default:
      return state;
  }
}

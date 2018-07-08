/**
 * allNotebooksReducer is used for retrieving all of the notebooks which the logged in users have access to, and to open notebooks
 */

import { IStateUserNotebooks } from "src/reducers";
import { IAction } from "../../actions";
import { IPutAllNotebooks } from "../../actions/allNotebooks";
import { PUT_ALL_NOTEBOOKS } from "../../actionTypes";

export default function notebooksReducer(
  state: IStateUserNotebooks[] = [],
  action: IAction
) {
  switch (action.type) {
    case PUT_ALL_NOTEBOOKS:
      const castedAction = action as IPutAllNotebooks;
      return castedAction.newState;
    default:
      return state;
  }
}

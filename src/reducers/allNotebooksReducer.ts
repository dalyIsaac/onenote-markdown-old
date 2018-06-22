import { IStateUserNotebooks } from "src/reducers";
import { IAction } from "../actions";
import { IPutAllNotebooks } from "../actions/getNotebooks";
import { CLEAR_ALL_NOTEBOOKS, PUT_ALL_NOTEBOOKS } from "./../actionTypes";

type actionType = IPutAllNotebooks & IAction;

export default function notebooksReducer(
  state: IStateUserNotebooks[] = [],
  action: actionType
) {
  switch (action.type) {
    case CLEAR_ALL_NOTEBOOKS:
      return [];
    case PUT_ALL_NOTEBOOKS:
      return [
        ...state,
        {
          displayableId: action.displayableId,
          notebooks: action.notebooks,
          userId: action.userId
        }
      ];
    default:
      return state;
  }
}

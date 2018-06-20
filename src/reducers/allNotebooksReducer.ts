import { Notebook } from "@microsoft/microsoft-graph-types";
import { IAction } from "../actions";
import { IPutAllNotebooks } from "../actions/getNotebooks";
import { CLEAR_ALL_NOTEBOOKS, PUT_ALL_NOTEBOOKS } from "./../actionTypes";

type actionType = IPutAllNotebooks & IAction;

interface IUserNotebooks {
  userId: string;
  displayableId: string;
  notebooks: Notebook;
}

export default function notebooksReducer(
  state: IUserNotebooks[] = [],
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

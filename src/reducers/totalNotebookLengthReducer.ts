import { IAction } from "../actions";
import { INotebookLength } from "../actions/totalNotebookLength";
import {
  TOTAL_NOTEBOOK_LENGTH_ADD,
  UPDATE_TOTAL_NOTEBOOK_LENGTH
} from "../actionTypes";

export default function updateTotalNotebookLengthReducer(
  state: number = 0,
  action: IAction
) {
  switch (action.type) {
    case UPDATE_TOTAL_NOTEBOOK_LENGTH:
      return (action as INotebookLength).amount;
    case TOTAL_NOTEBOOK_LENGTH_ADD:
      return state + (action as INotebookLength).amount;
    default:
      return state;
  }
}

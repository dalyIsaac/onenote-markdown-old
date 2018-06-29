import { INotebookLength } from "../actions/totalNotebookLength";
import {
  TOTAL_NOTEBOOK_LENGTH_ADD,
  UPDATE_TOTAL_NOTEBOOK_LENGTH
} from "../actionTypes";

type actionType = INotebookLength;

export default function updateTotalNotebookLengthReducer(
  state: number = 0,
  action: actionType
) {
  switch (action.type) {
    case UPDATE_TOTAL_NOTEBOOK_LENGTH:
      return action.amount;
    case TOTAL_NOTEBOOK_LENGTH_ADD:
      return state + action.amount;
    default:
      return state;
  }
}

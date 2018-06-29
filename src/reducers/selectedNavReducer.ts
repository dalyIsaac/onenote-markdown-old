import { IPutSelected } from "../actions/selectedNav";
import { PUT_SELECTED } from "./../actionTypes";

type actionType = IPutSelected;

export default function SelectedNavReducer(
  state: string[] = [],
  action: actionType
) {
  switch (action.type) {
    case PUT_SELECTED:
      const { order } = action;
      return order;
    default:
      return state;
  }
}

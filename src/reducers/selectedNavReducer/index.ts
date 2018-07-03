import { IAction } from "../../actions";
import { IPutSelected } from "../../actions/selectedNav";
import { PUT_SELECTED } from "../../actionTypes";

export default function selectedNavReducer(
  state: string[] = [],
  action: IAction
) {
  switch (action.type) {
    case PUT_SELECTED:
      const { order } = action as IPutSelected;
      return order;
    default:
      return state;
  }
}

import { IAction } from "../../actions";
import {
  IAddNotebookToOrder,
  ILoadNotebookOrder
} from "../../actions/notebookOrder";
import { ADD_NOTEBOOK_TO_ORDER, LOAD_NOTEBOOK_ORDER } from "../../actionTypes";

export default function notebookOrderReducer(
  state: string[] = [],
  action: IAction
) {
  const order = [...state];
  switch (action.type) {
    case ADD_NOTEBOOK_TO_ORDER:
      const { notebookId } = action as IAddNotebookToOrder;
      if (order.indexOf(notebookId) === -1) {
        order.push(notebookId);
      }
      return order;
    case LOAD_NOTEBOOK_ORDER:
      const { notebookOrder } = action as ILoadNotebookOrder;
      return notebookOrder;
    default:
      return state;
  }
}

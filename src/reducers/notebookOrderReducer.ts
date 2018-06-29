import {
  IAddNotebookToOrder,
  ILoadNotebookOrder
} from "../actions/notebookOrder";
import { ADD_NOTEBOOK_TO_ORDER, LOAD_NOTEBOOK_ORDER } from "../actionTypes";

type actionType = IAddNotebookToOrder & ILoadNotebookOrder;

export default function notebookOrderReducer(
  state: string[] = [],
  action: actionType
) {
  const order = [...state];
  switch (action.type) {
    case ADD_NOTEBOOK_TO_ORDER:
      const { notebookId } = action;
      if (order.indexOf(notebookId) === -1) {
        order.push(notebookId);
      }
      return order;
    case LOAD_NOTEBOOK_ORDER:
      const { notebookOrder } = action;
      return notebookOrder;
    default:
      return state;
  }
}

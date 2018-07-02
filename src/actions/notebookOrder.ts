import { ADD_NOTEBOOK_TO_ORDER, LOAD_NOTEBOOK_ORDER } from "../actionTypes";
import { IAction } from "./index";

export interface IAddNotebookToOrder extends IAction {
  notebookId: string;
}

/**
 * Creates an action which adds the notebook to the notebookOrder array
 * @param notebookId Microsoft Graph ID of the notebook
 */
export const addNotebookToOrder = (
  notebookId: string
): IAddNotebookToOrder => ({
  notebookId,
  type: ADD_NOTEBOOK_TO_ORDER
});

export interface ILoadNotebookOrder extends IAction {
  notebookOrder: string[];
}

/**
 * Creates an action which loads a new notebookOrder into the Redux store and localForage
 * @param notebookOrder array of ids which indicates the new notebookOrder
 */
export const loadNotebookOrder = (
  notebookOrder: string[]
): ILoadNotebookOrder => ({
  notebookOrder,
  type: LOAD_NOTEBOOK_ORDER
});

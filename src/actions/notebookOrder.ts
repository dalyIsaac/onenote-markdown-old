import { ADD_NOTEBOOK_TO_ORDER, LOAD_NOTEBOOK_ORDER } from "../actionTypes";

export interface IAddNotebookToOrder {
  notebookId: string;
  type: string;
}

export const addNotebookToOrder = (
  notebookId: string
): IAddNotebookToOrder => ({
  notebookId,
  type: ADD_NOTEBOOK_TO_ORDER
});

export interface ILoadNotebookOrder {
  notebookOrder: string[];
  type: string;
}

export const loadNotebookOrder = (
  notebookOrder: string[]
): ILoadNotebookOrder => ({
  notebookOrder,
  type: LOAD_NOTEBOOK_ORDER
});

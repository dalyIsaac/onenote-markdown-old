import { ADD_NOTEBOOK_TO_ORDER, LOAD_NOTEBOOK_ORDER } from "../actionTypes";

export const addNotebookToOrder = (notebookId: string) => ({
    notebookId,
    type: ADD_NOTEBOOK_TO_ORDER
});

export const loadNotebookOrder = (notebookOrder: string[]) => ({
    notebookOrder,
    type: LOAD_NOTEBOOK_ORDER
});

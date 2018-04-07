import { ADD_NOTEBOOK_TO_ORDER, LOAD_NOTEBOOK_ORDER } from "../actionTypes";

export const addNotebookToOrder = (notebookId) => ({
    type: ADD_NOTEBOOK_TO_ORDER,
    notebookId
});

export const loadNotebookOrder = (notebookOrder) => ({
    type: LOAD_NOTEBOOK_ORDER,
    notebookOrder
});

import { ADD_NOTEBOOK_TO_ORDER } from "../actionTypes";

export const addNotebookToOrder = (notebookId) => ({
    type: ADD_NOTEBOOK_TO_ORDER,
    notebookId
});

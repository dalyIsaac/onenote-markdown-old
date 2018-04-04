import { UPDATE_NOTEBOOK_ORDER } from "../actionTypes";

/**
 * Replaces the notebook order
 * @param {array} notebookOrder New array to replace the currently stored array
 */
export const updateNotebookOrder = (notebookOrder) => ({
    type: UPDATE_NOTEBOOK_ORDER,
    notebookOrder
});

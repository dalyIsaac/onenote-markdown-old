import { OPEN_NOTEBOOKS, LOAD_NOTEBOOK_INTO_REDUX, LOAD_SAVED_NOTEBOOKS, UPDATE_NOTEBOOK_ORDER } from "../types";
import { app } from "./index";

/**
 * Replaces the notebook order
 * @param {array} notebookOrder New array to replace the currently stored array
 */
export const updateNotebookOrder = (notebookOrder) => ({
    type: UPDATE_NOTEBOOK_ORDER,
    notebookOrder
});

/**
 * Opens all of the notebooks
 * @param {*} notebooks 
 */
export const openNotebooks = (notebooks) => ({
    type: OPEN_NOTEBOOKS,
    notebooks,
    app
});

/**
 * Loads a notebook into the redux store
 * @param {Notebook} notebook 
 */
export const loadNotebookIntoRedux = (notebook) => ({
    type: LOAD_NOTEBOOK_INTO_REDUX,
    notebook
})

/**
 * Loads notebooks from localforage into the redux store
 */
export const loadSavedNotebooks = () => ({
    type: LOAD_SAVED_NOTEBOOKS
});

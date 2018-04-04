import {
    OPEN_NOTEBOOKS,
    LOAD_NOTEBOOK_INTO_REDUX,
    LOAD_NOTEBOOKS_INTO_REDUX,
    LOAD_SAVED_NOTEBOOKS,
    CLOSE_NOTEBOOK
} from "../actionTypes";
import { app } from "./index";

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
 * Loads a notebook into the redux store
 * @param {Object} notebooks 
 */
export const loadNotebooksIntoRedux = (notebooks) => ({
    type: LOAD_NOTEBOOKS_INTO_REDUX,
    notebooks
})

/**
 * Loads notebooks from localforage into the redux store
 */
export const loadSavedNotebooks = () => ({
    type: LOAD_SAVED_NOTEBOOKS
});

export const closeNotebook = (notebookId) => ({
    type: CLOSE_NOTEBOOK,
    notebookId
});

import {
    OPEN_NOTEBOOKS,
    LOAD_NOTEBOOK,
    LOAD_NOTEBOOKS_INTO_REDUX,
    LOAD_SAVED_NOTEBOOKS,
    CLOSE_NOTEBOOK,
    UPDATE_NOTEBOOK_SECTION_GROUPS
} from "../actionTypes";

/**
 * Opens all of the notebooks
 * @param {*} notebooks 
 */
export const openNotebooks = (notebooks) => ({
    type: OPEN_NOTEBOOKS,
    notebooks
});

/**
 * Loads a notebook into the redux store
 * @param {Notebook} notebook 
 */
export const loadNotebook = (notebook) => ({
    type: LOAD_NOTEBOOK,
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

// this should be used in the reducer and a saga
export const updateNotebookSectionGroups = (sectionGroups, notebookId) => ({
    type: UPDATE_NOTEBOOK_SECTION_GROUPS,
    sectionGroups,
    notebookId
});

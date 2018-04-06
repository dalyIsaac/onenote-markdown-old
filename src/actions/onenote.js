import { OPEN_NOTEBOOKS, GET_NOTEBOOK, SAVE_NOTEBOOK, GET_SECTION_GROUP, GET_SECTION, SAVE_SECTION_GROUP, SAVE_SECTION, GET_PAGE, SAVE_PAGE } from "../actionTypes";

export const openNotebooks = (notebookList) => ({
    type: OPEN_NOTEBOOKS,
    notebookList
});

/**
 * Fetches a notebook
 * @param {string} userId 
 * @param {string} notebookId 
 */
export const getNotebook = (userId, notebookId) => ({
    type: GET_NOTEBOOK,
    userId,
    notebookId
});

/**
 * Saves a notebook in Redux and in localforage
 * @param {Notebook} notebook 
 */
export const saveNotebook = (notebook) => ({
    type: SAVE_NOTEBOOK,
    notebook
});


/**
 * Fetches a section group
 * @param {string} userId 
 * @param {string} sectionGroupId 
 */
export const getSectionGroup = (userId, sectionGroupId) => ({
    type: GET_SECTION_GROUP,
    userId, 
    sectionGroupId
});

/**
 * Saves a section group in Redux and in localforage
 * @param {SectionGroup} sectionGroup 
 */
export const saveSectionGroup = (sectionGroup) => ({
    type: SAVE_SECTION_GROUP,
    sectionGroup
});


/**
 * Fetches a section
 * @param {string} userId 
 * @param {string} sectionId 
 */
export const getSection = (userId, sectionId) => ({
    type: GET_SECTION,
    userId, 
    sectionId
});

/**
 * Saves a section in Redux and in localforage
 * @param {Section} section 
 */
export const saveSection = (section) => ({
    type: SAVE_SECTION,
    section
});


/**
 * Fetches a page and it's content
 * @param {string} userId
 * @param {string} pageId
 */
export const getPage = (userId, pageId) => ({
    type: GET_PAGE,
    userId,
    pageId
});

/**
 * Saves a page in Redux and in localforage
 * @param {Page} page 
 */
export const savePage = (page) => ({
    type: SAVE_PAGE,
    page
});

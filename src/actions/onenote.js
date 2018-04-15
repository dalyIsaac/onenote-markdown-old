import { OPEN_NOTEBOOKS, GET_NOTEBOOK, SAVE_NOTEBOOK, GET_SECTION_GROUP, GET_SECTION, SAVE_SECTION_GROUP, SAVE_SECTION, GET_PAGE, SAVE_PAGE, LOAD_ONENOTE, GET_ONENOTE, UPDATE_IS_EXPANDED, GET_PAGE_CONTENT, SAVE_PAGE_CONTENT, GET_PAGE_CONTENT_ERROR } from "../actionTypes";

export const openNotebooks = (notebookList) => ({
    type: OPEN_NOTEBOOKS,
    notebookList
});

/**
 * Load all OneNote objects
 * @param {Object} onenote 
 */
export const loadOneNote = (onenote) => ({
    type: LOAD_ONENOTE,
    onenote
});

/**
 * Gets OneNote from localforage
 */
export const getOneNote = () => ({
    type: GET_ONENOTE
});

/**
 * Fetches a notebook
 * @param {string} userId 
 * @param {string} notebookUrl Notebook URL for self
 */
export const getNotebook = (userId, notebookUrl) => ({
    type: GET_NOTEBOOK,
    userId,
    notebookUrl
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
 * @param {string} parentSelfUser user as defined in the self URL for the parent
 */
export const getSectionGroup = (userId, sectionGroupId, parentSelfUser) => ({
    type: GET_SECTION_GROUP,
    userId, 
    sectionGroupId,
    parentSelfUser
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
 * @param {string} parentSelfUser user as defined in the self URL for the parent
 */
export const getSection = (userId, sectionId, parentSelfUser) => ({
    type: GET_SECTION,
    userId, 
    sectionId,
    parentSelfUser
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
 * @param {string} parentSelfUser user as defined in the self URL for the parent
 */
export const getPage = (userId, pageId, parentSelfUser) => ({
    type: GET_PAGE,
    userId,
    pageId,
    parentSelfUser
});

/**
 * Gets page content
 * @param {string} pageId 
 */
export const getPageContent = (pageId) => ({
    type: GET_PAGE_CONTENT,
    pageId
});

/**
 * Saves page content
 * @param {string} pageId 
 * @param {string} content 
 */
export const savePageContent = (pageId, content) => ({
    type: SAVE_PAGE_CONTENT,
    pageId,
    content
});

/**
 * Saves the error for the request to Redux (but not to localforage)
 * @param {string} pageId 
 * @param {string} content 
 */
export const getPageContentError = (pageId, error) => ({
    type: GET_PAGE_CONTENT_ERROR,
    pageId,
    error
});

/**
 * Saves a page in Redux and in localforage
 * @param {Page} page 
 */
export const savePage = (page) => ({
    type: SAVE_PAGE,
    page
});

/**
 * Updates a section group to indicate whether it is expanded in sectionsNav
 * @param {string} id 
 * @param {boolean} isExpanded 
 */
export const updateIsExpanded = (id, isExpanded) => ({
    type: UPDATE_IS_EXPANDED,
    id,
    isExpanded
});

import {
  GET_NOTEBOOK,
  GET_ONENOTE,
  GET_PAGE,
  GET_PAGE_CONTENT,
  GET_PAGE_CONTENT_ERROR,
  GET_SECTION,
  GET_SECTION_GROUP,
  LOAD_ONENOTE,
  OPEN_NOTEBOOKS,
  SAVE_NOTEBOOK,
  SAVE_PAGE,
  SAVE_PAGE_CONTENT,
  SAVE_SECTION,
  SAVE_SECTION_GROUP,
  UPDATE_IS_EXPANDED
} from "../actionTypes";
import { IOneNoteBase } from "../types/IOneNoteBase";
import { Notebook } from "../types/Notebook";
import { NotebookRow } from "../types/NotebookRow";
import { Page } from "../types/Page";
import { Section } from "../types/Section";
import { SectionGroup } from "../types/SectionGroup";

export const openNotebooks = (notebookList: NotebookRow) => ({
  notebookList,
  type: OPEN_NOTEBOOKS
});

/**
 * Load all OneNote objects
 * @param {Object} onenote
 */
export const loadOneNote = (onenote: IOneNoteBase[]) => ({
  onenote,
  type: LOAD_ONENOTE
});

/**
 * Gets OneNote from localforage
 */
export const getOneNote = () => ({
  type: GET_ONENOTE
});

/**
 * Fetches a notebook
 * @param userId
 * @param notebookUrl Notebook URL for self
 */
export const getNotebook = (userId: string, notebookUrl: string) => ({
  notebookUrl,
  type: GET_NOTEBOOK,
  userId
});

/**
 * Saves a notebook in Redux and in localforage
 * @param notebook
 */
export const saveNotebook = (notebook: Notebook) => ({
  notebook,
  type: SAVE_NOTEBOOK
});

/**
 * Fetches a section group
 * @param userId
 * @param sectionGroupId
 * @param parentSelfUser user as defined in the self URL for the parent
 */
export const getSectionGroup = (
  userId: string,
  sectionGroupId: string,
  parentSelfUser: string
) => ({
  parentSelfUser,
  sectionGroupId,
  type: GET_SECTION_GROUP,
  userId
});

/**
 * Saves a section group in Redux and in localforage
 * @param sectionGroup
 */
export const saveSectionGroup = (sectionGroup: SectionGroup) => ({
  sectionGroup,
  type: SAVE_SECTION_GROUP
});

/**
 * Fetches a section
 * @param userId
 * @param sectionId
 * @param parentSelfUser user as defined in the self URL for the parent
 */
export const getSection = (
  userId: string,
  sectionId: string,
  parentSelfUser: string
) => ({
  parentSelfUser,
  sectionId,
  type: GET_SECTION,
  userId
});

/**
 * Saves a section in Redux and in localforage
 * @param {Section} section
 */
export const saveSection = (section: Section) => ({
  section,
  type: SAVE_SECTION
});

/**
 * Fetches a page and it's content
 * @param userId
 * @param pageId
 * @param parentSelfUser user as defined in the self URL for the parent
 */
export const getPage = (
  userId: string,
  pageId: string,
  parentSelfUser: string
) => ({
  pageId,
  parentSelfUser,
  type: GET_PAGE,
  userId
});

/**
 * Gets page content
 * @param pageId
 */
export const getPageContent = (pageId: string) => ({
  pageId,
  type: GET_PAGE_CONTENT
});

/**
 * Saves page content
 * @param pageId
 * @param content
 */
export const savePageContent = (pageId: string, content: string) => ({
  content,
  pageId,
  type: SAVE_PAGE_CONTENT
});

/**
 * Saves the error for the request to Redux (but not to localforage)
 * @param pageId
 * @param content
 */
export const getPageContentError = (pageId: string, error: any) => ({
  error,
  pageId,
  type: GET_PAGE_CONTENT_ERROR
});

/**
 * Saves a page in Redux and in localforage
 * @param {Page} page
 */
export const savePage = (page: Page) => ({
  page,
  type: SAVE_PAGE
});

/**
 * Updates a section group to indicate whether it is expanded in sectionsNav
 * @param id
 * @param {boolean} isExpanded
 */
export const updateIsExpanded = (id: string, isExpanded: boolean) => ({
  id,
  isExpanded,
  type: UPDATE_IS_EXPANDED
});

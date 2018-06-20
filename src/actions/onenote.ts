import { IAction } from "src/actions";
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
import { OneNoteBase } from "../types/OneNoteBase";
import { Notebook } from "../types/Notebook";
import { NotebookRow } from "../types/NotebookRow";
import { Page } from "../types/Page";
import { Section } from "../types/Section";
import { SectionGroup } from "../types/SectionGroup";

export interface IOpenNotebooks {
  notebookList: NotebookRow;
  type: string;
}

export const openNotebooks = (notebookList: NotebookRow): IOpenNotebooks => ({
  notebookList,
  type: OPEN_NOTEBOOKS
});

export interface ILoadOneNote {
  onenote: OneNoteBase[];
  type: string;
}

/**
 * Load all OneNote objects
 * @param {Object} onenote
 */
export const loadOneNote = (onenote: OneNoteBase[]) => ({
  onenote,
  type: LOAD_ONENOTE
});

/**
 * Gets OneNote from localforage
 */
export const getOneNote = (): IAction => ({
  type: GET_ONENOTE
});

export interface IGetNotebook {
  notebookUrl: string;
  userId: string;
  type: string;
}

/**
 * Fetches a notebook
 * @param userId
 * @param notebookUrl Notebook URL for self
 */
export const getNotebook = (
  userId: string,
  notebookUrl: string
): IGetNotebook => ({
  notebookUrl,
  type: GET_NOTEBOOK,
  userId
});

export interface ISaveNotebook {
  notebook: Notebook;
  type: string;
}

/**
 * Saves a notebook in Redux and in localforage
 * @param notebook
 */
export const saveNotebook = (notebook: Notebook): ISaveNotebook => ({
  notebook,
  type: SAVE_NOTEBOOK
});

export interface IGetSectionGroup {
  parentSelfUser: string;
  sectionGroupId: string;
  userId: string;
  type: string;
}

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
): IGetSectionGroup => ({
  parentSelfUser,
  sectionGroupId,
  type: GET_SECTION_GROUP,
  userId
});

export interface ISaveSectionGroup {
  sectionGroup: SectionGroup;
  type: string;
}

/**
 * Saves a section group in Redux and in localforage
 * @param sectionGroup
 */
export const saveSectionGroup = (
  sectionGroup: SectionGroup
): ISaveSectionGroup => ({
  sectionGroup,
  type: SAVE_SECTION_GROUP
});

export interface IGetSection {
  userId: string;
  sectionId: string;
  parentSelfUser: string;
  type: string;
}

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
): IGetSection => ({
  parentSelfUser,
  sectionId,
  type: GET_SECTION,
  userId
});

export interface ISaveSection {
  section: Section;
  type: string;
}

/**
 * Saves a section in Redux and in localforage
 * @param {Section} section
 */
export const saveSection = (section: Section): ISaveSection => ({
  section,
  type: SAVE_SECTION
});

export interface IGetPage {
  pageId: string;
  parentSelfUser: string;
  type: string;
  userId: string;
}

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
): IGetPage => ({
  pageId,
  parentSelfUser,
  type: GET_PAGE,
  userId
});

export interface IGetPageContent {
  pageId: string;
  type: string;
}

/**
 * Gets page content
 * @param pageId
 */
export const getPageContent = (pageId: string): IGetPageContent => ({
  pageId,
  type: GET_PAGE_CONTENT
});

export interface ISavePageContent {
  content: string;
  pageId: string;
  type: string;
}

/**
 * Saves page content
 * @param pageId
 * @param content
 */
export const savePageContent = (
  pageId: string,
  content: string
): ISavePageContent => ({
  content,
  pageId,
  type: SAVE_PAGE_CONTENT
});

export interface IGetPageContentError {
  error: any;
  pageId: string;
  type: string;
}

/**
 * Saves the error for the request to Redux (but not to localforage)
 * @param pageId
 * @param content
 */
export const getPageContentError = (
  pageId: string,
  error: any
): IGetPageContentError => ({
  error,
  pageId,
  type: GET_PAGE_CONTENT_ERROR
});

export interface ISavePage {
  page: Page;
  type: string;
}

/**
 * Saves a page in Redux and in localforage
 * @param {Page} page
 */
export const savePage = (page: Page): ISavePage => ({
  page,
  type: SAVE_PAGE
});

export interface IUpdateIsExpanded {
  id: string;
  isExpanded: boolean;
  type: string;
}

/**
 * Updates a section group to indicate whether it is expanded in sectionsNav
 * @param id
 * @param {boolean} isExpanded
 */
export const updateIsExpanded = (
  id: string,
  isExpanded: boolean
): IUpdateIsExpanded => ({
  id,
  isExpanded,
  type: UPDATE_IS_EXPANDED
});

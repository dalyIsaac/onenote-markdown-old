import { Notebook } from "../types/Notebook";
import { OneNoteBase } from "../types/OneNoteBase";

import {
  content,
  graphNotebookInstance,
  graphNotebookInstance1,
  notebook,
  page,
  page1,
  pageId,
  parentSelfUser,
  section,
  sectionGroup,
  sectionGroup1,
  userId,
  userId1
} from "../testObjects";
import {
  getNotebook,
  getOneNote,
  getPage,
  getPageContent,
  getPageContentError,
  getSection,
  getSectionGroup,
  loadOneNote,
  openNotebooks,
  saveNotebook,
  savePage,
  savePageContent,
  saveSection,
  saveSectionGroup,
  updateIsExpanded
} from "./onenote";

describe("Actions: onenote", () => {
  test("Should create an action to open the notebooks in the notebookList", () => {
    const type = "OPEN_NOTEBOOKS";
    const notebookList: Notebook[] = [
      new Notebook(graphNotebookInstance, userId),
      new Notebook(graphNotebookInstance1, userId1)
    ];
    const expectedAction = { notebookList, type };
    expect(openNotebooks(notebookList)).toEqual(expectedAction);
  });

  test("Should create an action which loads all OneNote objects", () => {
    const type = "LOAD_ONENOTE";

    const onenote: OneNoteBase[] = [
      notebook,
      sectionGroup,
      sectionGroup1,
      section,
      page,
      page1
    ];

    const expectedAction = { onenote, type };
    expect(loadOneNote(onenote)).toEqual(expectedAction);
  });

  test("Should create an action which gets all of the OneNote objects from localForage", () => {
    const type = "GET_ONENOTE";
    const expectedAction = { type };
    expect(getOneNote()).toEqual(expectedAction);
  });

  test("Should create an action which fetches/gets a notebook", () => {
    const type = "GET_NOTEBOOK";
    const notebookUrl = "https://www.example.com/notebookUrl";
    const expectedAction = {
      notebookUrl,
      type,
      userId
    };
    expect(getNotebook(userId, notebookUrl)).toEqual(expectedAction);
  });

  test("Sould create an action which saves a notebook in Redux and in localForage", () => {
    const type = "SAVE_NOTEBOOK";
    const expectedAction = { notebook, type };
    expect(saveNotebook(notebook)).toEqual(expectedAction);
  });

  test("Should create an action which fetches/gets a section group", () => {
    const type = "GET_SECTION_GROUP";
    const sectionGroupId = "genericstring1";
    const expectedAction = {
      parentSelfUser,
      sectionGroupId,
      type,
      userId
    };
    expect(getSectionGroup(userId, sectionGroupId, parentSelfUser)).toEqual(
      expectedAction
    );
  });

  test("Should create an action which saves a section group in Redux and in localForage", () => {
    const type = "SAVE_SECTION_GROUP";
    const expectedAction = { type, sectionGroup };
    expect(saveSectionGroup(sectionGroup)).toEqual(expectedAction);
  });

  test("Should create an action which fetches/gets a section", () => {
    const type = "GET_SECTION";
    const sectionId = "genericstring1";
    const expectedAction = { parentSelfUser, sectionId, type, userId };
    expect(getSection(userId, sectionId, parentSelfUser)).toEqual(
      expectedAction
    );
  });

  test("Should create an action which saves a section in Redux and in localForage", () => {
    const type = "SAVE_SECTION";
    const expectedAction = { section, type };
    expect(saveSection(section)).toEqual(expectedAction);
  });

  test("Should create an action which fetches/gets a page and its contents", () => {
    const type = "GET_PAGE";
    const expectedAction = { pageId, parentSelfUser, type, userId };
    expect(getPage(userId, pageId, parentSelfUser)).toEqual(expectedAction);
  });

  test("Should create an action to get a page's contents", () => {
    const type = "GET_PAGE_CONTENT";
    const expectedAction = { pageId, type };
    expect(getPageContent(pageId)).toEqual(expectedAction);
  });

  test("Should create an action to save a page's contents to Redux and localForage", () => {
    const type = "SAVE_PAGE_CONTENT";
    const expectedAction = { content, pageId, type };
    expect(savePageContent(pageId, content)).toEqual(expectedAction);
  });

  test("Should create an action to save the error for the page content request to Redux (but not to localForage)", () => {
    const type = "GET_PAGE_CONTENT_ERROR";
    const error = { errorType: "ErrorType1" };
    const expectedAction = { error, pageId, type };
    expect(getPageContentError(pageId, error)).toEqual(expectedAction);
  });

  test("Should create an action to save a page in Redux and in localForage", () => {
    const type = "SAVE_PAGE";
    const expectedAction = { page, type };
    expect(savePage(page)).toEqual(expectedAction);
  });

  test("Should create an action to update a section group to indicate whether it is expected in sectionsNav", () => {
    const type = "UPDATE_IS_EXPANDED";
    const id = "genericstring1";
    const isExpanded = true;
    const expectedAction = { id, isExpanded, type };
    expect(updateIsExpanded(id, isExpanded)).toEqual(expectedAction);
  });
});

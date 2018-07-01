import {
  Notebook as INotebook,
  OnenotePage as IPage,
  OnenoteSection as ISection,
  SectionGroup as ISectionGroup
} from "@microsoft/microsoft-graph-types";
import { Notebook } from "../types/Notebook";
import { NotebookRow } from "../types/NotebookRow";
import { OneNoteBase } from "../types/OneNoteBase";
import { Page } from "../types/Page";
import { Section } from "../types/Section";
import { SectionGroup } from "../types/SectionGroup";
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
  const userId = "jane.doe@email.com";
  const userId1 = "john.smith@email.com";

  const graphNotebookInstance: INotebook = {
    isDefault: true,
    isShared: false,
    sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl",
    sectionsUrl: "https://www.example.com/sections",
    userRole: "Owner"
  };

  const graphNotebookInstance1: INotebook = {
    isDefault: false,
    isShared: true,
    sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl1",
    sectionsUrl: "https://www.example.com/sections1",
    userRole: "Owner"
  };

  const notebook = new Notebook(graphNotebookInstance, userId);
  // const notebook1 = new Notebook(graphNotebookInstance1, userId1);

  const graphSectionGroupInstance: ISectionGroup = {
    parentNotebook: graphNotebookInstance,
    sectionGroups: [],
    sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl",
    sections: [],
    sectionsUrl: "https://www.example.com/sections"
  };

  const graphSectionGroupInstance1: ISectionGroup = {
    parentNotebook: graphNotebookInstance,
    parentSectionGroup: graphSectionGroupInstance,
    sectionGroups: [],
    sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl1",
    sections: [],
    sectionsUrl: "https://www.example.com/sections"
  };

  const sectionGroup = new SectionGroup(graphSectionGroupInstance, userId);
  const sectionGroup1 = new SectionGroup(graphSectionGroupInstance1, userId1);

  const content = "<h1>Hello Page 1</h1>";
  const content1 = "<h1>Hello Page 2</h1>";

  const graphPageInstance: IPage = {
    content,
    contentUrl: "https://www.example.com/Hello%20Page%201/content",
    createdByAppId: "genericstring1",
    lastModifiedDateTime: "2014-01-01T00:00:00Z",
    level: 0,
    order: 0,
    parentNotebook: graphNotebookInstance,
    title: "Hello Page 1",
    userTags: ["tag1", "tag2"]
  };

  const graphSectionInstance: ISection = {
    isDefault: true,
    pages: [graphPageInstance],
    pagesUrl: "https://www.example.com/pages",
    parentNotebook: graphNotebookInstance,
    parentSectionGroup: graphSectionGroupInstance
  };

  const graphPageInstance1: IPage = {
    content: content1,
    contentUrl: "https://www.example.com/Hello%20Page%202/content",
    createdByAppId: "genericstring2",
    lastModifiedDateTime: "2014-01-01T00:00:00Z",
    level: 0,
    order: 0,
    parentNotebook: graphNotebookInstance,
    parentSection: graphSectionInstance,
    title: "Hello Page 2",
    userTags: ["tag1", "tag2"]
  };

  const section = new Section(
    graphSectionInstance,
    [[graphPageInstance, graphPageInstance1]],
    userId
  );

  const page = new Page(graphPageInstance, userId);
  const page1 = new Page(graphPageInstance1, userId);

  const pageId = "genericstring1";

  const parentSelfUser = "jane.doe@email.com";

  test("Should create an action to open the notebooks in the notebookList", () => {
    const type = "OPEN_NOTEBOOKS";
    const notebookList: NotebookRow[] = [
      new NotebookRow(graphNotebookInstance, userId, "genericstring1"),
      new NotebookRow(graphNotebookInstance1, userId1, "genericstring2")
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

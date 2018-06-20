import { call, put, select } from "redux-saga/effects";
import {
  storageGetItem,
  storageGetItems,
  storageSetItem
} from "src/sagas/storage";
import { Notebook } from "src/types/Notebook";
import { Section } from "src/types/Section";
import { SectionGroup } from "src/types/SectionGroup";
import {
  IAction,
  notebookOrder,
  onenote,
  totalNotebookLength
} from "../actions";
import {
  IGetNotebook,
  IGetPage,
  IGetPageContent,
  IGetSection,
  IGetSectionGroup,
  IOpenNotebooks,
  ISaveNotebook,
  ISavePage,
  ISavePageContent,
  ISaveSection,
  ISaveSectionGroup,
  IUpdateIsExpanded
} from "../actions/onenote";
import { IUpdateSelected } from "../actions/selectedNav";
import { stableUrl } from "../constants";
import { IState } from "../reducers";
import { Page } from "../types/Page";
import * as fetch from "./fetch";

export function* openNotebooks(action: IOpenNotebooks) {
  const { notebookList } = action; // notebookList is a list of NotebookRows
  yield put(totalNotebookLength.addToLength(notebookList.length));
  for (const element of notebookList) {
    yield put(onenote.getNotebook(element.userId, element.notebook.self));
  }
}

export function* getNotebook(action: IGetNotebook) {
  // Using OData, it should get all section groups and sections.
  // The notebook, its section groups and sections should be then put into Redux and localforage as:
  // notebookId: { ...metadata, sectionGroups: {...sectionGroupIds }, sections: { ...sections }}

  const { userId, notebookUrl } = action;
  const url = notebookUrl + "?$expand=sectionGroups,sections";
  const result = yield call(fetch.get, url, userId);
  if (result.error === undefined) {
    const notebook = new Notebook(result, userId);
    yield put(onenote.saveNotebook(notebook));
    yield put(notebookOrder.addNotebookToOrder(notebook.id));
  }
}

/**
 * Gets all of the immediate children of a notebook, section group, or section
 * @param {any} action
 */
export function* getChildren(action: IUpdateIsExpanded | IUpdateSelected) {
  const element: SectionGroup & Section & Page = yield select(
    (state: IState) => state.onenote[action.id]
  );
  const parentSelfUser = element.self.split("/")[5];
  if (element.hasOwnProperty("sectionGroups")) {
    // it's a notebook or a section group
    for (const sectionId of element.sections) {
      yield put(onenote.getSection(element.userId, sectionId, parentSelfUser));
    }

    for (const sectionGroupId of element.sectionGroups) {
      yield put(
        onenote.getSectionGroup(element.userId, sectionGroupId, parentSelfUser)
      );
    }
  } else if (element.hasOwnProperty("pages")) {
    // it's a section
    for (const pageId of element.pages) {
      yield put(onenote.getPage(element.userId, pageId, parentSelfUser));
    }
  } else {
    // it's a page
    yield put(onenote.getPageContent(action.id));
  }
}

export function* getSectionGroup(action: IGetSectionGroup) {
  // Using OData, it should get all section groups and sections.
  // The parent section group, its section groups and sections should be then put into Redux and localforage as:
  // sectionGroupId: { ...metadata, sectionGroups: {...sectionGroupIds }, sections: { ...sections }}

  const { userId, sectionGroupId, parentSelfUser } = action;
  const url = `${stableUrl}users/${parentSelfUser}/onenote/sectionGroups/${sectionGroupId}?$expand=sectionGroups,sections,parentNotebook,parentSectionGroup`;
  const result = yield call(fetch.get, url, userId);
  if (result.error === undefined) {
    const sectionGroup = new SectionGroup(result, userId);
    yield put(onenote.saveSectionGroup(sectionGroup));
  }
}

export function* getSection(action: IGetSection) {
  // Using the /pages method, it should get all pages
  // The section, and all of its pages should be then put into Redux and localforage as:
  // sectionId: { ...metadata, pages: { ...pages }}

  const { userId, sectionId, parentSelfUser } = action;
  let url = `${stableUrl}users/${parentSelfUser}/onenote/sections/${sectionId}?$expand=parentNotebook,parentSectionGroup`;
  const sectionResult = yield call(fetch.get, url, userId);
  if (sectionResult.error === undefined) {
    const pagesResult = [];
    url = `${stableUrl}users/${parentSelfUser}/onenote/sections/${sectionId}/pages?pagelevel=true&$top=100`;
    pagesResult.push((yield call(fetch.get, url, userId)).value);
    while (pagesResult[pagesResult.length - 1].length > 0) {
      url = `${stableUrl}users/${parentSelfUser}/onenote/sections/${sectionId}/pages?pagelevel=true&$skip=${
        pagesResult.length
      }00`;
      pagesResult.push((yield call(fetch.get, url, userId)).value);
    }

    const section = new Section(sectionResult, pagesResult, userId);
    yield put(onenote.saveSection(section));
  }
}

export function* getPage(action: IGetPage) {
  const { userId, pageId, parentSelfUser } = action;
  const url = `${stableUrl}users/${parentSelfUser}/onenote/pages/${pageId}?pagelevel=true`;
  const result = yield call(fetch.get, url, userId);
  if (result.error === undefined) {
    const page = new Page(result, userId);
    yield put(onenote.savePage(page));
  }
}

export function* getPageContent(action: IGetPageContent) {
  const { pageId } = action;
  const { userId, self } = yield select(
    (state: IState) => state.onenote[pageId]
  );
  const parentSelfUser = self.split("/")[5];
  const url = `${stableUrl}users/${parentSelfUser}/onenote/pages/${pageId}/content`;
  const result = yield call(fetch.get, url, userId, fetch.responseTypes.TEXT);
  if (result.error === undefined) {
    yield put(onenote.savePageContent(pageId, result));
    // get resources?
  } else {
    console.log(
      `The content for the page with id '${pageId}' could not be found in Microsoft Graph. This is an error with Microsoft Graph, server side, not OneNoteMarkdown`
    );
    yield put(onenote.getPageContentError(pageId, result.error));
  }
}

export function* savePageContent(action: ISavePageContent) {
  const { pageId, content } = action;
  const page: Page = yield call(storageGetItem, pageId);
  page.content = content;
  yield call(storageSetItem, pageId, page);
}

export function* saveNotebook(action: ISaveNotebook) {
  const { notebook } = action;
  yield call(storageSetItem, notebook.id, notebook);
}

export function* saveSectionGroup(action: ISaveSectionGroup) {
  const { sectionGroup } = action;
  yield call(storageSetItem, sectionGroup.id, sectionGroup);
}

export function* saveSection(action: ISaveSection) {
  const { section } = action;
  yield call(storageSetItem, section.id, section);
}

export function* savePage(action: ISavePage) {
  const { page } = action;
  yield call(storageSetItem, page.id, page);
}

export function* getOneNote(action: IAction) {
  const order = (yield call(storageGetItem, "notebookOrder")) || [];
  yield put(notebookOrder.loadNotebookOrder(order));
  yield put(totalNotebookLength.updateLength(order.length));
  const everythingElse = (yield call(storageGetItems)) || {};
  yield put(onenote.loadOneNote(everythingElse));
}

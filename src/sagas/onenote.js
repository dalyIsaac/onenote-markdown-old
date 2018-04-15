import { call, put, select } from "redux-saga/effects";
import { stableUrl } from "../constants";
import { onenote, notebookOrder, totalNotebookLength } from "../actions";
import { Notebook, SectionGroup, Section, Page } from "../types";
import { storageSetItem, storageGetItem, storageGetItems } from "./storage";
import * as fetch from "./fetch";

export function* openNotebooks(action) {
    const { notebookList } = action; // notebookList is a list of NotebookRows
    yield put(totalNotebookLength.updateLength(notebookList.length));
    for (let i = 0; i < notebookList.length; i++) {
        const element = notebookList[i];
        yield put(onenote.getNotebook(element.userId, element.notebook.self));
    }
}

export function* getNotebook(action) {
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
export function* getChildren(action) {
    const element = yield select(state => state.onenote[action.id]);
    if (element.hasOwnProperty("sectionGroups")) { // it's a notebook or a section group
        for (let i = 0; i < element.sections.length; i++) {
            const sectionId = element.sections[i];
            yield put(onenote.getSection(element.userId, sectionId));
        }

        for (let i = 0; i < element.sectionGroups.length; i++) {
            const sectionGroupId = element.sectionGroups[i];
            yield put(onenote.getSectionGroup(element.userId, sectionGroupId));
        }
    } else if (element.hasOwnProperty("pages")) { // it's a section
        for (let i = 0; i < element.pages.length; i++) {
            const pageId = element.pages[i];
            yield put(onenote.getPage(element.userId, pageId));
        }
    } else { // it's a page
        yield put(onenote.getPageContent(action.id));
    }
}

export function* getSectionGroup(action) {
    // Using OData, it should get all section groups and sections.
    // The parent section group, its section groups and sections should be then put into Redux and localforage as:
    // sectionGroupId: { ...metadata, sectionGroups: {...sectionGroupIds }, sections: { ...sections }}

    const { userId, sectionGroupId } = action;
    const url = `${stableUrl}me/onenote/sectionGroups/${sectionGroupId}?$expand=sectionGroups,sections,parentNotebook,parentSectionGroup`;
    const result = yield call(fetch.get, url, userId);
    if (result.error === undefined) {
        const sectionGroup = new SectionGroup(result, userId);
        yield put(onenote.saveSectionGroup(sectionGroup));
    }
}

export function* getSection(action) {
    // Using the /pages method, it should get all pages
    // The section, and all of its pages should be then put into Redux and localforage as:
    // sectionId: { ...metadata, pages: { ...pages }}

    const { userId, sectionId } = action;
    const url = `${stableUrl}me/onenote/sections/${sectionId}?$expand=parentNotebook,parentSectionGroup`;
    const sectionResult = yield call(fetch.get, url, userId);
    if (sectionResult.error === undefined) {
        let pagesResult = [];
        const url = `${stableUrl}me/onenote/sections/${sectionId}/pages?pagelevel=true&$top=100`;
        pagesResult.push(yield call(fetch.get, url, userId));
        while (pagesResult[pagesResult.length - 1].value.length > 0) {
            const url = `${stableUrl}me/onenote/sections/${sectionId}/pages?pagelevel=true&$skip=${pagesResult.length}00`;
            pagesResult.push(yield call(fetch.get, url, userId));
        }

        const section = new Section(sectionResult, pagesResult, userId);
        yield put(onenote.saveSection(section));
    }
}

export function* getPage(action) {
    const { userId, pageId } = action;
    const url = `${stableUrl}me/onenote/pages/${pageId}?pagelevel=true`;
    const result = yield call(fetch.get, url, userId);
    if (result.error === undefined) {
        const page = new Page(result, userId);
        yield put(onenote.savePage(page));
    }
}

export function* getPageContent(action) {
    const { pageId } = action;
    const userId = yield select(state => state.onenote[pageId].userId);
    const url = `${stableUrl}me/onenote/pages/${pageId}/content`;    
    const result = yield call(fetch.get, url, userId, fetch.responseTypes.TEXT);
    if (result.error === undefined) {
        yield put(onenote.savePageContent(pageId, result));
        // get resources?
    } else {
        console.log(`The content for the page with id '${pageId}' could not be found in Microsoft Graph. This is an error with Microsoft Graph, server side, not OneNoteMarkdown`);
        yield put(onenote.getPageContentError(pageId, result.error));
    }
}

export function* savePageContent(action) {
    const { pageId, content } = action;
    let page = yield call(storageGetItem, pageId);
    page["content"] = content;
    yield call(storageSetItem, pageId, page);
}

export function* saveNotebook(action) {
    const { notebook } = action;
    yield call(storageSetItem, notebook.id, notebook);
}

export function* saveSectionGroup(action) {
    const { sectionGroup } = action;
    yield call(storageSetItem, sectionGroup.id, sectionGroup);
}

export function* saveSection(action) {
    const { section } = action;
    yield call(storageSetItem, section.id, section);
}

export function* savePage(action) {
    const { page } = action;
    yield call(storageSetItem, page.id, page);
}

export function* getOneNote(action) {
    const order = (yield call(storageGetItem, "notebookOrder")) || [];
    yield put(notebookOrder.loadNotebookOrder(order));
    yield put(totalNotebookLength.update(order.length));
    const everythingElse = (yield call(storageGetItems)) || {};
    yield put(onenote.loadOneNote(everythingElse));
}

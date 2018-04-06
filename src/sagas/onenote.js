import { getToken } from "./authentication";
import { call, put } from "redux-saga/effects";
import Axios from "axios";
import { stableUrl } from "../constants";
import { onenote, notebookOrder } from "../actions";
import { Notebook, SectionGroup, Section, Page } from "../types";
import { storageSetItem } from "./storage";

export function* openNotebooks(action) {
    const { notebookList } = action; // notebookList is a list of NotebookRows
    for (let i = 0; i < notebookList.length; i++) {
        const element = notebookList[i];
        yield put(onenote.getNotebook(element.userId, element.notebook.id));
    }
}

export function* getNotebook(action) {
    // Using OData, it should get all section groups and sections.
    // The notebook, its section groups and sections should be then put into Redux and localforage as:
    // notebookId: { ...metadata, sectionGroups: {...sectionGroupIds }, sections: { ...sections }}
    // Then, getSectionGroup should be called on each section group.
    // Then, getSection should be called on each section.

    const { userId, notebookId } = action;
    const token = yield call(getToken, userId);
    if (token !== "") {
        const result = yield call(Axios, {
            method: "get",
            url: `${stableUrl}me/onenote/notebooks/${notebookId}?$expand=sectionGroups,sections`,
            headers: { Authorization: `Bearer ${token}` }
        });
        const notebook = new Notebook(result.data, userId);
        yield put(onenote.saveNotebook(notebook));
        yield put(notebookOrder.addNotebookToOrder(notebookId));
        for (const sectionGroupId of notebook.sectionGroups) {
            yield put(onenote.getSectionGroup(userId, sectionGroupId));
        }
        for (const sectionId of notebook.sections) {
            yield put(onenote.getSection(userId, sectionId));
        }
    }
}

export function* getSectionGroup(action) {
    // Using OData, it should get all section groups and sections.
    // The parent section group, its section groups and sections should be then put into Redux and localforage as:
    // sectionGroupId: { ...metadata, sectionGroups: {...sectionGroupIds }, sections: { ...sections }}
    // Then, getSectionGroup should be called on each section group.
    // Then, getSection should be called on each section.

    const { userId, sectionGroupId } = action;
    const token = yield call(getToken, userId);
    if (token !== "") {
        const result = yield call(Axios, {
            method: "get",
            url: `${stableUrl}me/onenote/sectionGroups/${sectionGroupId}?$expand=sectionGroups,sections`,
            headers: { Authorization: `Bearer ${token}` }
        });
        const sectionGroup = new SectionGroup(result.data, userId);
        yield put(onenote.saveSectionGroup(sectionGroup));
        for (const sectionGroupId of sectionGroup.sectionGroups) {
            yield put(onenote.getSectionGroup(userId, sectionGroupId));
        }
        for (const sectionId of sectionGroup.sections) {
            yield put(onenote.getSection(userId, sectionId));
        }
    }
}

export function* getSection(action) {
    // Using the /pages method, it should get all pages
    // The section, and all of its pages should be then put into Redux and localforage as:
    // sectionId: { ...metadata, pages: { ...pages }}

    const { userId, sectionId } = action;
    const token = yield call(getToken, userId);
    if (token !== "") {
        const sectionResult = yield call(Axios, {
            method: "get",
            url: `${stableUrl}me/onenote/sections/${sectionId}`,
            headers: { Authorization: `Bearer ${token}` }
        });
        const pagesResult = yield call(Axios, {
            method: "get",
            url: `${stableUrl}me/onenote/sections/${sectionId}/pages`,
            headers: { Authorization: `Bearer ${token}` }
        });

        const section = new Section(sectionResult.data, pagesResult.data, userId);
        yield put(onenote.saveSection(section));

        for (const pageId of section.pages) {
            yield put(onenote.getPage(userId, pageId));
        }
    }
}

export function* getPage(action) {
    const { userId, pageId } = action;
    const token = yield call(getToken, userId);
    if (token !== "") {
        const pageResult = yield call(Axios, {
            method: "get",
            url: `${stableUrl}me/onenote/pages/${pageId}`,
            headers: { Authorization: `Bearer ${token}` }
        });
        const pageContent = yield call(Axios, {
            method: "get",
            url: `${stableUrl}me/onenote/pages/${pageId}/content`,
            responseType: 'text',
            headers: { Authorization: `Bearer ${token}` }
        });
        const page = new Page(pageResult.data, pageContent.data, userId);
        yield put(onenote.savePage(page));
        // get resources?
    }
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

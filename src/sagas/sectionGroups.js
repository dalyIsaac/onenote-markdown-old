import { call, put, select } from "redux-saga/effects";
import { getToken } from "./authentication";
import axios from "axios";
import { SectionGroup } from "../types";
import { updateNotebookSectionGroups } from "../actions/notebooks";
import { sectionGroups } from "../actions";
import { storageGetItems } from "./storage";

export function* getSectionGroups(action) {
    const notebook = action.notebook;
    const user = yield select(state => state.users[notebook.userId]);
    const currentToken = yield call(getToken, user);
    if (currentToken !== "") {
        const result = yield call(axios, {
            method: "get",
            url: notebook.sectionGroupsUrl,
            headers: { Authorization: `Bearer ${currentToken}` }
        });

        let sectionGroupsObject = {};
        for (let i = 0; i < result.data.value.length; i++) {
            const element = result.data.value[i];
            const sectionGroup = new SectionGroup(element, notebook.userId);
            sectionGroupsObject[sectionGroup.id] = sectionGroup;
        }
        yield put(updateNotebookSectionGroups(sectionGroupsObject, notebook.id));
        yield put(sectionGroups.loadSectionGroups(sectionGroupsObject));
    }
}

export function* loadSavedSectionGroups(action) {
    try {
        const sectionGroupsObject = yield call(storageGetItems, "sectionGroup");
        yield put(sectionGroups.loadSavedSectionGroupsIntoRedux(sectionGroupsObject));
    } catch (error) {
        console.error(error);
    }
}

import {
    GET_SECTION_GROUPS,
    LOAD_SECTION_GROUPS,
    LOAD_SAVED_SECTION_GROUPS,
    LOAD_SAVED_SECTION_GROUPS_INTO_REDUX
} from "../actionTypes";

export const getSectionGroups = (notebook) => ({
    type: GET_SECTION_GROUPS,
    notebook
});

export const loadSectionGroups = (sectionGroups) => ({
    type: LOAD_SECTION_GROUPS,
    sectionGroups
});

export const loadSavedSectionGroupsIntoRedux = (sectionGroups) => ({
    type: LOAD_SAVED_SECTION_GROUPS_INTO_REDUX,
    sectionGroups
});

export const loadSavedSectionGroups = () => ({
    type: LOAD_SAVED_SECTION_GROUPS
});
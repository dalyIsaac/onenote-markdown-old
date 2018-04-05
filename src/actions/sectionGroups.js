import { GET_SECTION_GROUPS, LOAD_SECTION_GROUPS } from "../actionTypes";

export const getSectionGroups = (notebook) => ({
    type: GET_SECTION_GROUPS,
    notebook
});

export const loadSectionGroups = (sectionGroups) => ({
    type: LOAD_SECTION_GROUPS,
    sectionGroups
});

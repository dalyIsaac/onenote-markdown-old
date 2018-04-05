import { LOAD_SECTION_GROUPS, UPDATE_NOTEBOOK_SECTION_GROUPS } from "../actionTypes";

export default function sectionGroupsReducer(state = {}, action) {
    let data = {};
    switch (action.type) {
        case LOAD_SECTION_GROUPS:
            data = { ...state };
            Object.keys(action.sectionGroups).forEach(key => data[key] = action.sectionGroups[key]);
            return data;
        default:
            return state;
    }
}
import { LOAD_SECTION_GROUPS, UPDATE_NOTEBOOK_SECTION_GROUPS, LOAD_SAVED_SECTION_GROUPS_INTO_REDUX } from "../actionTypes";

export default function sectionGroupsReducer(state = {}, action) {
    let data = {};
    switch (action.type) {
        case LOAD_SECTION_GROUPS:
            data = { ...state };
            Object.keys(action.sectionGroups).forEach(key => data[key] = action.sectionGroups[key]);
            return data;
        case LOAD_SAVED_SECTION_GROUPS_INTO_REDUX:
            data = { ...state };
            Object.assign(data, action.sectionGroups);
            return data;
        default:
            return state;
    }
}
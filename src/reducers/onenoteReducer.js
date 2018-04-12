import { SAVE_NOTEBOOK, SAVE_SECTION_GROUP, SAVE_SECTION, SAVE_PAGE, LOAD_ONENOTE, UPDATE_IS_EXPANDED, SAVE_PAGE_CONTENT, GET_PAGE_CONTENT_ERROR } from "../actionTypes";

export default function onenote(state = {}, action) {
    let data = { ...state };
    let sectionGroup = undefined;
    switch (action.type) {
        case SAVE_NOTEBOOK:
            let notebook = { ...action.notebook };
            notebook["sections"] = [...action.notebook.sections];
            notebook["sectionGroups"] = [...action.notebook.sectionGroups];
            data[notebook.id] = notebook;
            return data;
        case SAVE_SECTION_GROUP:
            sectionGroup = { ...action.sectionGroup };
            sectionGroup["sections"] = [...action.sectionGroup.sections];
            sectionGroup["sectionGroups"] = [...action.sectionGroup.sectionGroups];
            if (state[sectionGroup.id] !== undefined) {
                sectionGroup["isExpanded"] = state[sectionGroup.id]["isExpanded"];
            }
            data[sectionGroup.id] = sectionGroup;
            return data;
        case SAVE_SECTION:
            let section = { ...action.section };
            section["pages"] = [...action.section.pages];
            data[section.id] = section;
            return data;
        case SAVE_PAGE:
            let page = { ...action.page };
            data[page.id] = page;
            return data;
        case LOAD_ONENOTE:
            const { onenote } = action;
            return onenote;
        case UPDATE_IS_EXPANDED:
            const { id, isExpanded } = action;
            sectionGroup = { ...state[id] };
            sectionGroup.isExpanded = isExpanded;
            data[id] = sectionGroup;
            return data;
        case SAVE_PAGE_CONTENT: {
            const { pageId, content } = action;
            const newPage = { ...state[pageId], content };
            data[pageId] = newPage;
            return { ...data };
        }
        case GET_PAGE_CONTENT_ERROR: {
            const { pageId, error } = action;
            const page = { ...state[pageId], error };
            data[pageId] = page;
            return { ...data };
        }
        default:
            return state;
    }
}
import { SAVE_NOTEBOOK, SAVE_SECTION_GROUP, SAVE_SECTION, SAVE_PAGE, LOAD_ONENOTE } from "../actionTypes";

export default function onenote(state = {}, action) {
    let data = { ...state };
    switch (action.type) {
        case SAVE_NOTEBOOK:
            let notebook = { ...action.notebook };
            notebook["sections"] = { ...action.notebook.sections };
            notebook["sectionGroups"] = { ...action.notebook.sectionGroups };
            data[notebook.id] = notebook;
            return data;
        case SAVE_SECTION_GROUP:
            let sectionGroup = { ...action.sectionGroup };
            sectionGroup["sections"] = { ...action.sectionGroup.sections };
            sectionGroup["sectionGroups"] = { ...action.sectionGroup.sectionGroups };
            data[sectionGroup.id] = sectionGroup;
            return data;
        case SAVE_SECTION:
            let section = { ...action.section };
            section["pages"] = { ...action.section.pages };
            data[section.id] = section;
            return data;
        case SAVE_PAGE:
            let page = { ...action.page };
            data[page.id] = page;
            return data;
        case LOAD_ONENOTE:
            const { onenote } = action;
            return onenote;
        default:
            return state;
    }
}
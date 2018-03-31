import { LOAD_NOTEBOOK } from "./../types";

export default function notebooksReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_NOTEBOOK:
            let data = { ...state };
            data[action.notebook.id] = action.notebook;
            return data;
        default:
            return state;
    }
}

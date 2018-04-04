import { LOAD_NOTEBOOK_INTO_REDUX, CLOSE_NOTEBOOK } from "./../types";

export default function notebooksReducer(state = {}, action) {
    let data = {};
    switch (action.type) {
        case CLOSE_NOTEBOOK:
            data = {};
            for (const key in state) {
                if (key !== action.notebookId) {
                    data[key] = state[key];
                }
            }
            return data;
        case LOAD_NOTEBOOK_INTO_REDUX:
            data = { ...state };
            data["notebook." + action.notebook.id] = { ...action.notebook };
            return data;
        default:
            return state;
    }
}
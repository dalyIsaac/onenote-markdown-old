import { LOAD_NOTEBOOK_INTO_REDUX, CLOSE_NOTEBOOK } from "./../types";

export default function notebooksReducer(state = {}, action) {
    let data = undefined;
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
            data = deepCopy(state);
            data[action.notebook.id] = action.notebook;
            return data;
        default:
            return state;
    }
}

function deepCopy(obj) {
    let newObj = JSON.parse(JSON.stringify(obj));
    return newObj;
}
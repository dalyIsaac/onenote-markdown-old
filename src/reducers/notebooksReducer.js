import { LOAD_NOTEBOOK_INTO_REDUX, CLOSE_NOTEBOOK, LOAD_NOTEBOOKS_INTO_REDUX } from "./../actionTypes";

export default function notebooksReducer(state = {}, action) {
    let data = {};
    switch (action.type) {
        case CLOSE_NOTEBOOK:
            data = {};
            const notebookId = 'notebook.' + action.notebookId;
            for (const key in state) {
                if (key !== notebookId) {
                    data[key] = state[key];
                }
            }
            return data;
        case LOAD_NOTEBOOK_INTO_REDUX:
            data = { ...state };
            data["notebook." + action.notebook.id] = { ...action.notebook };
            return data;
        case LOAD_NOTEBOOKS_INTO_REDUX:
            data = { ...state };
            Object.assign(data, action.notebooks);
            return data;
        default:
            return state;
    }
}
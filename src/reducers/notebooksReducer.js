import { LOAD_NOTEBOOK_INTO_REDUX, CLOSE_NOTEBOOK, LOAD_NOTEBOOKS_INTO_REDUX } from "./../actionTypes";

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
        case LOAD_NOTEBOOKS_INTO_REDUX:
            data = { ...state };
            Object.assign(data, action.notebooks);
            return data;
        default:
            return state;
    }
}
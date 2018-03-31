import { LOAD_NOTEBOOK_INTO_REDUX } from "./../types";

export default function notebooksReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_NOTEBOOK_INTO_REDUX:
            let data = { ...state };
            data[action.notebook.id] = action.notebook;
            return data;
        default:
            return state;
    }
}

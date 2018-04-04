import { UPDATE_NOTEBOOK_ORDER } from "../actionTypes";

export default function notebookOrderReducer(state = [], action) {
    switch (action.type) {
        case UPDATE_NOTEBOOK_ORDER:
            return [...action.notebookOrder].map(val => val.slice(0, 8) === "notebook" ? val : "notebook." + val);
        default:
            return state;
    }
}
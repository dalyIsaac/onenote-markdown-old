import { UPDATE_NOTEBOOK_ORDER } from "../types";

export default function notebookOrderReduer(state = [], action) {
    switch (action.type) {
        case UPDATE_NOTEBOOK_ORDER:
            return action.notebookOrder;
        default:
            return state;
    }
}
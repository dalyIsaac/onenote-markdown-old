import { TOTAL_NOTEBOOK_LENGTH } from "../actionTypes";

export default function updateTotalNotebookLength(state = 0, action) {
    switch (action.type) {
        case TOTAL_NOTEBOOK_LENGTH:
            return action.numberLeft
        default:
            return state;
    }
}
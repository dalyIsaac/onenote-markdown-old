import { TOTAL_NOTEBOOK_LENGTH, TOTAL_NOTEBOOK_LENGTH_ADD } from "../actionTypes";

export default function updateTotalNotebookLength(state = 0, action) {
    switch (action.type) {
        case TOTAL_NOTEBOOK_LENGTH:
            return action.numberLeft;
        case TOTAL_NOTEBOOK_LENGTH_ADD:
            return state + action.amount;
        default:
            return state;
    }
}
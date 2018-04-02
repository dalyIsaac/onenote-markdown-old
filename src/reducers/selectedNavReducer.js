import { UPDATE_SELECTED_NOTEBOOK } from "./../types";

export default function SelectedNavReducer(state = [], action) {
    switch (action.type) {
        case UPDATE_SELECTED_NOTEBOOK:
            return action.data
        default:
            return state;
    }
}
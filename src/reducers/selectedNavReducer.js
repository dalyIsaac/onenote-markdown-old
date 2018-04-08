import { PUT_SELECTED } from "./../actionTypes";

export default function SelectedNavReducer(state = [], action) {
    switch (action.type) {
        case PUT_SELECTED:
            const { order } = action;
            return order;
        default:
            return state;
    }
}
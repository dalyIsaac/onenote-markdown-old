import { ADD_NOTEBOOK_TO_ORDER } from "../actionTypes";

export default function notebookOrderReducer(state = [], action) {
    const order = [...state];
    switch (action.type) {
        case ADD_NOTEBOOK_TO_ORDER:
            const { notebookId } = action;
            if (order.indexOf(notebookId) === -1) {
                order.push(notebookId);
            }
            return order;
        default:
            return state;
    }
}
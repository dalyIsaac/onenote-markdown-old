import { UPDATE_SELECTED, PUT_SELECTED } from "./../actionTypes";

export const updateSelected = (id) => ({
    type: UPDATE_SELECTED,
    id
});

export const putSelected = (order) => ({
    type: PUT_SELECTED,
    order
});

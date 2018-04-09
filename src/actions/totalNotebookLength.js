import { TOTAL_NOTEBOOK_LENGTH, TOTAL_NOTEBOOK_LENGTH_ADD } from "../actionTypes";

export const update = (numberLeft) => ({
    type: TOTAL_NOTEBOOK_LENGTH,
    numberLeft
});

export const updateLength = (amount) => ({
    type: TOTAL_NOTEBOOK_LENGTH_ADD,
    amount
});

import { TOTAL_NOTEBOOK_LENGTH, REMOVE_ONE_NOTEBOOK_LENGTH } from "../types";

export const update = (numberLeft) => ({
    type: TOTAL_NOTEBOOK_LENGTH,
    numberLeft
});

export const removeOne = () => ({
    type: REMOVE_ONE_NOTEBOOK_LENGTH
});

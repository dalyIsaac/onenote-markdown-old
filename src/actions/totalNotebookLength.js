import { TOTAL_NOTEBOOK_LENGTH } from "../actionTypes";

export const update = (numberLeft) => ({
    type: TOTAL_NOTEBOOK_LENGTH,
    numberLeft
});

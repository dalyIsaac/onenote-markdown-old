import {
  TOTAL_NOTEBOOK_LENGTH_ADD,
  UPDATE_TOTAL_NOTEBOOK_LENGTH
} from "../actionTypes";

// Was formerly update
export const updateLength = (numberLeft: number) => ({
  numberLeft,
  type: UPDATE_TOTAL_NOTEBOOK_LENGTH
});

// Was formerly updateLength
export const addToLength = (amount: number) => ({
  amount,
  type: TOTAL_NOTEBOOK_LENGTH_ADD
});

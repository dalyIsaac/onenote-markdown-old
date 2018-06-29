import {
  TOTAL_NOTEBOOK_LENGTH_ADD,
  UPDATE_TOTAL_NOTEBOOK_LENGTH
} from "../actionTypes";

export interface INotebookLength {
  amount: number;
  type: string;
}
// updateLength was formerly update
// amount was formerly numberLeft
export const updateLength = (amount: number): INotebookLength => ({
  amount,
  type: UPDATE_TOTAL_NOTEBOOK_LENGTH
});

// Was formerly updateLength
export const addToLength = (amount: number): INotebookLength => ({
  amount,
  type: TOTAL_NOTEBOOK_LENGTH_ADD
});

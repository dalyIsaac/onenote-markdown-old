import {
  TOTAL_NOTEBOOK_LENGTH_ADD,
  UPDATE_TOTAL_NOTEBOOK_LENGTH
} from "../actionTypes";
import { IAction } from "./index";

export interface INotebookLength extends IAction {
  amount: number;
}

/**
 * Updates the length of the total notebook length (reassigns the length with `amount`)
 * @param amount the amount of open notebooks
 */
export const updateLength = (amount: number): INotebookLength => ({
  amount,
  type: UPDATE_TOTAL_NOTEBOOK_LENGTH
});

/**
 * Creates an action which increases the total notebook length
 * @param amount the amount of new notebooks opened
 */
export const addToLength = (amount: number): INotebookLength => ({
  amount,
  type: TOTAL_NOTEBOOK_LENGTH_ADD
});

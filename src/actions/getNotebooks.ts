import { IAction } from "src/actions";
import {
  CLEAR_ALL_NOTEBOOKS,
  GET_ALL_NOTEBOOKS,
  PUT_ALL_NOTEBOOKS
} from "../actionTypes";
import { Notebook } from "../types/Notebook";

/**
 * Creates an action which starts the process of getting all of the notebooks of all the logged in users
 */
export const getAllNotebooks = (): IAction => ({
  type: GET_ALL_NOTEBOOKS
});

export interface IPutAllNotebooks {
  userId: string;
  displayableId: string;
  notebooks: Notebook[];
  type: string;
}

/**
 * Creates an action which puts freshly fetched notebooks into the store
 */
export const putAllNotebooks = (
  userId: string,
  displayableId: string,
  notebooks: Notebook[]
): IPutAllNotebooks => ({
  displayableId,
  notebooks,
  type: PUT_ALL_NOTEBOOKS,
  userId
});

/**
 * Creates an action which clears all the notebook data from the localForage stores
 */
export const clearAllNotebooks = (): IAction => ({
  type: CLEAR_ALL_NOTEBOOKS
});

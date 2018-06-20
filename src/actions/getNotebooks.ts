import { IAction } from "src/actions";
import {
  CLEAR_ALL_NOTEBOOKS,
  GET_ALL_NOTEBOOKS,
  PUT_ALL_NOTEBOOKS
} from "../actionTypes";
import { Notebook } from "../types/Notebook";

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
 * Puts freshly fetched notebooks into the store
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

export const clearAllNotebooks = (): IAction => ({
  type: CLEAR_ALL_NOTEBOOKS
});

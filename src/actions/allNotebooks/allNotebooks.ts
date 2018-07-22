/**
 * allNotebooks is used for retrieving all of the notebooks which the logged in users have access to, and to open notebooks
 */

import { GET_ALL_NOTEBOOKS, PUT_ALL_NOTEBOOKS } from "../../actionTypes";
import { IStateUserNotebooks } from "../../reducers";
import { IAction } from "../index";

/**
 * Creates an action which starts the process of getting all of the notebooks of all the logged in users
 */
export const getAllNotebooks = (): IAction => ({
  type: GET_ALL_NOTEBOOKS
});

export interface IPutAllNotebooks extends IAction {
  newState: IStateUserNotebooks[];
}

/**
 * Creates an action which puts freshly fetched notebooks into the store
 */
export const putAllNotebooks = (
  newState: IStateUserNotebooks[]
): IPutAllNotebooks => ({
  newState,
  type: PUT_ALL_NOTEBOOKS
});

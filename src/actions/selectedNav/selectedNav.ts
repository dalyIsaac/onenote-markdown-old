import { PUT_SELECTED, UPDATE_SELECTED } from "../../actionTypes";
import { IAction } from "../index";

export interface IUpdateSelected extends IAction {
  id: string;
}

/**
 * Creates an action which updates the selected `onenote` object
 * @param id if of the newly selected `onenote` object
 */
export const updateSelected = (id: string): IUpdateSelected => ({
  id,
  type: UPDATE_SELECTED
});

export interface IPutSelected extends IAction {
  order: string[];
}

/**
 * Creates an action which replaces the previous selected order
 * for the selected `onenote` object
 * @param order the new order of the selected `onenote` object,
 * which replaces the previous order
 */
export const putSelected = (order: string[]): IPutSelected => ({
  order,
  type: PUT_SELECTED
});

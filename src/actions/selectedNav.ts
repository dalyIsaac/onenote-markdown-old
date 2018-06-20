import { PUT_SELECTED, UPDATE_SELECTED } from "./../actionTypes";

export interface IUpdateSelected {
  id: string;
  type: string;
}

export const updateSelected = (id: string): IUpdateSelected => ({
  id,
  type: UPDATE_SELECTED
});

export interface IPutSelected {
  order: string[];
  type: string;
}

export const putSelected = (order: string[]): IPutSelected => ({
  order,
  type: PUT_SELECTED
});

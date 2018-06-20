import { PUT_SELECTED, UPDATE_SELECTED } from "./../actionTypes";

export const updateSelected = (id: string) => ({
  id,
  type: UPDATE_SELECTED
});

export const putSelected = (order: string[]) => ({
  order,
  type: PUT_SELECTED
});

import { putSelected, updateSelected } from "./index";

describe("Actions: selectedNav", () => {
  test("Should create an action which updates the selected `onenote` object", () => {
    const type = "UPDATE_SELECTED";
    const id = "genericstring1";
    const expectedAction = { id, type };
    expect(updateSelected(id)).toEqual(expectedAction);
  });

  test("Should create an action which replaces the previous selected order for the selected onenote object", () => {
    const type = "PUT_SELECTED";
    const order = ["genericstring1", "genericstring2", "genericstring3"];
    const expectedAction = { order, type };
    expect(putSelected(order)).toEqual(expectedAction);
  });
});

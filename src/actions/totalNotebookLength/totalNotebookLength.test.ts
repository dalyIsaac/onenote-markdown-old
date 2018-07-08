import { addToLength, updateLength } from "./index";

describe("Actions: totalNotebookLength", () => {
  test("Should create an action to update the length of the total notebook length", () => {
    const type = "UPDATE_TOTAL_NOTEBOOK_LENGTH";
    const amount = 5;
    const expectedAction = { amount, type };
    expect(updateLength(amount)).toEqual(expectedAction);
  });

  test("Should create an action which increases the total notebook length", () => {
    const type = "TOTAL_NOTEBOOK_LENGTH_ADD";
    const amount = 5;
    const expectedAction = { amount, type };
    expect(addToLength(amount)).toEqual(expectedAction);
  });
});

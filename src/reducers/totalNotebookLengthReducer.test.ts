import updateTotalNotebookLengthReducer from "./totalNotebookLengthReducer";

describe("Reducers: totalNotebookLengthReducer", () => {
  test("Should return the intial state", () => {
    const initialState = undefined;
    const action = { type: "NOT_AN_ACTUAL_ACTION" };
    const expectedState = 0;
    expect(updateTotalNotebookLengthReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  test("Should handle UPDATE_TOTAL_NOTEBOOK_LENGTH", () => {
    const initialState = 4;
    const action = { amount: 3, type: "UPDATE_TOTAL_NOTEBOOK_LENGTH" };
    const expectedState = 3;
    expect(updateTotalNotebookLengthReducer(initialState, action)).toEqual(
      expectedState
    );
  });

  test("Should handle TOTAL_NOTEBOOK_LENGTH_ADD", () => {
    const initialState = 4;
    const action = { amount: 3, type: "TOTAL_NOTEBOOK_LENGTH_ADD" };
    const expectedState = 7;
    expect(updateTotalNotebookLengthReducer(initialState, action)).toEqual(
      expectedState
    );
  });
});

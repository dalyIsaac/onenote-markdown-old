import notebookOrderReducer from "./notebookOrderReducer";

describe("Reducers: notebookOrderReducer", () => {
  const notebookId1 = "genericstring1";
  const notebookId2 = "genericstring2";

  test("Should return the initial state", () => {
    const initialState = undefined;
    const action = { type: "NOT_AN_ACTUAL_ACTION" };
    const expectedState: string[] = [];
    expect(notebookOrderReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle ADD_NOTEBOOK_TO_ORDER with empty initial state", () => {
    const initialState: string[] = [];
    const action = {
      notebookId: notebookId1,
      type: "ADD_NOTEBOOK_TO_ORDER"
    };
    const expectedState: string[] = [notebookId1];
    expect(notebookOrderReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle ADD_NOTEBOOK_TO_ORDER with populated initial state", () => {
    const initialState: string[] = [notebookId1];
    const action = {
      notebookId: notebookId2,
      type: "ADD_NOTEBOOK_TO_ORDER"
    };
    const expectedState: string[] = [notebookId1, notebookId2];
    expect(notebookOrderReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle LOAD_NOTEBOOK_ORDER with empty initial state", () => {
    const notebookOrder = [notebookId2, notebookId1];
    const initialState: string[] = [];
    const action = {
      notebookOrder,
      type: "LOAD_NOTEBOOK_ORDER"
    };
    expect(notebookOrderReducer(initialState, action)).toEqual(notebookOrder);
  });

  test("Should handle LOAD_NOTEBOOK_ORDER with populated initial state", () => {
    const notebookOrder = [notebookId2, notebookId1];
    const initialState: string[] = [notebookId1];
    const action = {
      notebookOrder,
      type: "LOAD_NOTEBOOK_ORDER"
    };
    expect(notebookOrderReducer(initialState, action)).toEqual(notebookOrder);
  });
});

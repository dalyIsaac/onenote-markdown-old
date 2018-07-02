import { graphNotebookInstance, graphNotebookInstance1 } from "../testObjects";
import notebooksReducer from "./allNotebooksReducer";
import { IStateUserNotebooks } from "./index";

describe("Reducers: allNotebooksReducer", () => {
  test("Should return the initial state", () => {
    const initialState = undefined;
    const action = { type: "NOT_AN_ACTUAL_ACTION" };
    const expectedState: IStateUserNotebooks[] = [];
    expect(notebooksReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle PUT_ALL_NOTEBOOKS with empty initial state", () => {
    const initialState: IStateUserNotebooks[] = [];
    const newState = [
      {
        displayableId: "jane.doe@email.com",
        notebooks: [graphNotebookInstance, graphNotebookInstance1],
        userId: "genericstring1"
      },
      {
        displayableId: "john.smith@email.com",
        notebooks: [graphNotebookInstance, graphNotebookInstance1],
        userId: "genericstring1"
      }
    ];
    const action = { type: "PUT_ALL_NOTEBOOKS", newState };
    expect(notebooksReducer(initialState, action)).toEqual(newState);
  });

  test("Should handle PUT_ALL_NOTEBOOKS with a populated initial state", () => {
    const initialState: IStateUserNotebooks[] = [
      {
        displayableId: "john.doe@email.com",
        notebooks: [graphNotebookInstance],
        userId: "genericstring2"
      }
    ];
    const newState = [
      {
        displayableId: "jane.doe@email.com",
        notebooks: [graphNotebookInstance, graphNotebookInstance1],
        userId: "genericstring1"
      },
      {
        displayableId: "john.smith@email.com",
        notebooks: [graphNotebookInstance, graphNotebookInstance1],
        userId: "genericstring1"
      }
    ];
    const action = { type: "PUT_ALL_NOTEBOOKS", newState };
    expect(notebooksReducer(initialState, action)).toEqual(newState);
  });
});

import { graphNotebookInstance, graphNotebookInstance1 } from "../testObjects";
import { getAllNotebooks, putAllNotebooks } from "./allNotebooks";

describe("Actions: allNotebooks", () => {
  test("Should create an action which starts the process of getting all of the notebooks of all the logged in users", () => {
    const type = "GET_ALL_NOTEBOOKS";
    const expectedAction = { type };
    expect(getAllNotebooks()).toEqual(expectedAction);
  });

  test("Should create an action which puts freshly fetched notebooks into the store", () => {
    const type = "PUT_ALL_NOTEBOOKS";
    const userId = "genericstring1";
    const displayableId = "jane.doe@email.com";
    const notebooks = [graphNotebookInstance, graphNotebookInstance1];
    const newState = [
      {
        displayableId,
        notebooks,
        userId
      }
    ];
    const expectedAction = { newState, type };
    expect(putAllNotebooks(newState)).toEqual(expectedAction);
  });
});

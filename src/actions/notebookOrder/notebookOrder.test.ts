import { addNotebookToOrder, loadNotebookOrder } from "./index";

describe("Actions: notebookOrder", () => {
  test("Should create an action which adds the notebook to the notebookOrder array", () => {
    const type = "ADD_NOTEBOOK_TO_ORDER";
    const notebookId = "genericstring1";
    const expectedAction = { notebookId, type };
    expect(addNotebookToOrder(notebookId)).toEqual(expectedAction);
  });

  test("Should create an action which loads a new notebookOrder into the Redux store and localForage", () => {
    const type = "LOAD_NOTEBOOK_ORDER";
    const notebookOrder = [
      "genericstring1",
      "genericstring2",
      "genericstring3"
    ];
    const expectedAction = { notebookOrder, type };
    expect(loadNotebookOrder(notebookOrder)).toEqual(expectedAction);
  });
});

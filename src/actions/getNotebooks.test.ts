import { Notebook } from "../types/Notebook";
import {
  clearAllNotebooks,
  getAllNotebooks,
  putAllNotebooks
} from "./getNotebooks";

describe("Actions: getNotebooks", () => {
  test("Should create an action which starts the process of getting all of the notebooks of all the logged in users", () => {
    const type = "GET_ALL_NOTEBOOKS";
    const expectedAction = { type };
    expect(getAllNotebooks()).toEqual(expectedAction);
  });

  test("Should create an action which puts freshly fetched notebooks into the store", () => {
    const type = "PUT_ALL_NOTEBOOKS";
    const userId = "genericstring1";
    const displayableId = "jane.doe@email.com";
    const notebooks = [
      new Notebook(
        {
          isDefault: true,
          isShared: false,
          sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl",
          sectionsUrl: "https://www.example.com/sections",
          userRole: "Owner"
        },
        "jane.doe@email.com"
      )
    ];
    const expectedAction = { displayableId, notebooks, type, userId };
    expect(putAllNotebooks(userId, displayableId, notebooks)).toEqual(
      expectedAction
    );
  });

  test("Should create an action which clears all the notebook data from the localForage stores", () => {
    const type = "CLEAR_ALL_NOTEBOOKS";
    const expectedAction = { type };
    expect(clearAllNotebooks()).toEqual(expectedAction);
  });
});

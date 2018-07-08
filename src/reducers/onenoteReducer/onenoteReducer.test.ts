import {
  content1,
  notebook,
  notebook1,
  page,
  page1,
  section,
  section1,
  sectionGroup,
  sectionGroup1
} from "../../testObjects";
import { IStateOneNote } from "../index";
import onenoteReducer from "./index";

describe("Reducers: onenoteReducer", () => {
  test("Should return the initial state", () => {
    const initialState = undefined;
    const action = { type: "NOT_AN_ACTUAL_ACTION" };
    const expectedState: IStateOneNote = {};
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_NOTEBOOK with an empty initial state", () => {
    const initialState: IStateOneNote = {};
    const action = {
      notebook,
      type: "SAVE_NOTEBOOK"
    };
    const expectedState: IStateOneNote = {};
    expectedState[notebook.id] = notebook;
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_NOTEBOOK with a populated initial state", () => {
    const initialState: IStateOneNote = {};
    initialState[notebook.id] = notebook;
    const action = {
      notebook: notebook1,
      type: "SAVE_NOTEBOOK"
    };
    const expectedState: IStateOneNote = {};
    expectedState[notebook.id] = notebook;
    expectedState[notebook1.id] = notebook1;
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_SECTION_GROUP with an empty initial state", () => {
    const initialState: IStateOneNote = {};
    const action = {
      sectionGroup,
      type: "SAVE_SECTION_GROUP"
    };
    const expectedState: IStateOneNote = {};
    expectedState[sectionGroup.id] = sectionGroup;
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_SECTION_GROUP with a populated initial state", () => {
    const initialState: IStateOneNote = {};
    initialState[sectionGroup.id] = sectionGroup;
    const action = {
      sectionGroup: sectionGroup1,
      type: "SAVE_SECTION_GROUP"
    };
    const expectedState: IStateOneNote = {};
    expectedState[sectionGroup.id] = sectionGroup;
    expectedState[sectionGroup1.id] = sectionGroup1;
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_SECTION with an empty initial state", () => {
    const initialState: IStateOneNote = {};
    const action = {
      section,
      type: "SAVE_SECTION"
    };
    const expectedState: IStateOneNote = {};
    expectedState[section.id] = section;
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_SECTION with a populated initial state", () => {
    const initialState: IStateOneNote = {};
    initialState[section.id] = section;
    const action = {
      section: section1,
      type: "SAVE_SECTION"
    };
    const expectedState: IStateOneNote = {};
    expectedState[section.id] = section;
    expectedState[section1.id] = section1;
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_PAGE with an empty initial state", () => {
    const initialState: IStateOneNote = {};
    const action = {
      page,
      type: "SAVE_PAGE"
    };
    const expectedState: IStateOneNote = {};
    expectedState[page.id] = page;
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_PAGE with a populated initial state", () => {
    const initialState: IStateOneNote = {};
    initialState[page.id] = page;
    const action = {
      page: page1,
      type: "SAVE_PAGE"
    };
    const expectedState: IStateOneNote = {};
    expectedState[page.id] = page;
    expectedState[page1.id] = page1;
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle LOAD_ONENOTE", () => {
    const initialState: IStateOneNote = {};
    const items = [notebook, notebook1, sectionGroup, section, page];
    const onenote: IStateOneNote = {};
    items.forEach(x => {
      onenote[x.id] = x;
    });
    const action = {
      onenote,
      type: "LOAD_ONENOTE"
    };
    expect(onenoteReducer(initialState, action)).toEqual(onenote);
  });

  test("Should handle UPDATE_IS_EXPANDED", () => {
    const initialState: IStateOneNote = {};
    initialState[sectionGroup.id] = sectionGroup;
    const action = {
      id: sectionGroup.id,
      isExpanded: !sectionGroup.isExpanded,
      type: "UPDATE_IS_EXPANDED"
    };
    const expectedState: IStateOneNote = {};
    expectedState[sectionGroup.id] = {
      ...sectionGroup,
      isExpanded: !sectionGroup.isExpanded
    };
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });

  test("Should handle SAVE_PAGE_CONTENT", () => {
    const initialState: IStateOneNote = {};
    initialState[page.id] = page;
    const action = {
      content: content1,
      pageId: page.id,
      type: "SAVE_PAGE_CONTENT"
    };
    const expectedState: IStateOneNote = {};
    expectedState[page.id] = { ...page, content: content1 };
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });
  // GET_PAGE_CONTENT_ERROR

  test("Should handle GET_PAGE_CONTENT_ERROR", () => {
    const initialState: IStateOneNote = {};
    initialState[page.id] = page;
    const error = { errorType: "A very bad error" };
    const action = {
      error,
      pageId: page.id,
      type: "GET_PAGE_CONTENT_ERROR"
    };
    const expectedState: IStateOneNote = {};
    expectedState[page.id] = { ...page, error };
    expect(onenoteReducer(initialState, action)).toEqual(expectedState);
  });
});

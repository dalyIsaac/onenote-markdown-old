/**
 * This module contains objects which are to be used in the Jest tests
 */

export * from "./users";
export * from "./graphNotebookInstances";
export * from "./notebooks";
export * from "./graphSectionGroupInstances";
export * from "./sectionGroups";
export * from "./graphPageInstances";
export * from "./pages";
export * from "./personas";
import { OnenoteSection as ISection } from "@microsoft/microsoft-graph-types";
import { IStateOneNote, IStateUserNotebooks } from "../reducers";
import { Section } from "../types/Section";
import {
  graphNotebookInstance,
  graphNotebookInstance1,
  graphNotebookInstance2
} from "./graphNotebookInstances";
import { graphPageInstance, graphPageInstance1 } from "./graphPageInstances";
import {
  graphSectionGroupInstance,
  graphSectionGroupInstance1
} from "./graphSectionGroupInstances";
import { notebook, notebook1 } from "./notebooks";
import { page, page1 } from "./pages";
import { sectionGroup, sectionGroup1 } from "./sectionGroups";
import { userId, userId1 } from "./users";

export const notebookOrder = ["notebookid", "notebookid1"];

export const graphSectionInstance: ISection = {
  displayName: "section",
  id: "section",
  isDefault: true,
  pages: [graphPageInstance],
  pagesUrl: "https://www.example.com/pages",
  parentNotebook: graphNotebookInstance,
  parentSectionGroup: graphSectionGroupInstance
};

export const graphSectionInstance1: ISection = {
  id: "graphSection",
  isDefault: false,
  pages: [graphPageInstance1],
  pagesUrl: "https://www.example.com/pages1",
  parentNotebook: graphNotebookInstance1,
  parentSectionGroup: graphSectionGroupInstance1
};

export const section = new Section(
  graphSectionInstance,
  [[graphPageInstance, graphPageInstance1]],
  userId
);

export const section1 = new Section(
  graphSectionInstance1,
  [[graphPageInstance1]],
  userId1
);

export const parentSelfUser = "jane.doe@email.com";

export const allNotebooks: IStateUserNotebooks[] = [
  {
    displayableId: "genericstring",
    notebooks: [graphNotebookInstance, graphNotebookInstance2],
    userId
  },
  {
    displayableId: "genericstring1",
    notebooks: [graphNotebookInstance1],
    userId: userId1
  }
];

export const openedNotebooks: IStateOneNote = {};
openedNotebooks[notebook.id] = notebook;

export const onenote: IStateOneNote = {};
onenote[notebook.id] = notebook;
onenote[notebook1.id] = notebook1;
onenote[sectionGroup.id] = sectionGroup;
onenote[sectionGroup1.id] = sectionGroup1;
onenote[section.id] = section;
onenote[section1.id] = section1;
onenote[page.id] = page;
onenote[page1.id] = page1;

export const selectedNav: string[] = [
  notebook1.id,
  sectionGroup1.id,
  section1.id,
  page1.id
];

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
export * from "./allNotebooks";
export * from "./notebookOrder";
export * from "./openedNotebooks";
export * from "./graphSectionInstances";
export * from "./sections";
import { IStateOneNote } from "../reducers";
import { notebook, notebook1 } from "./notebooks";
import { page, page1 } from "./pages";
import { sectionGroup, sectionGroup1 } from "./sectionGroups";
import { section, section1 } from "./sections";

export const parentSelfUser = "jane.doe@email.com";

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

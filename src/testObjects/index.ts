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
export * from "./onenote";
import { notebook1 } from "./notebooks";
import { page1 } from "./pages";
import { sectionGroup1 } from "./sectionGroups";
import { section1 } from "./sections";

export const parentSelfUser = "jane.doe@email.com";

export const selectedNav: string[] = [
  notebook1.id,
  sectionGroup1.id,
  section1.id,
  page1.id
];

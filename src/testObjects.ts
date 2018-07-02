/**
 * This module contains objects which are to be used in the Jest tests
 */

import {
  Notebook as INotebook,
  OnenotePage as IPage,
  OnenoteSection as ISection,
  SectionGroup as ISectionGroup
} from "@microsoft/microsoft-graph-types";
import { Notebook } from "./types/Notebook";
import { Page } from "./types/Page";
import { Section } from "./types/Section";
import { SectionGroup } from "./types/SectionGroup";

export const userId = "jane.doe@email.com";
export const userId1 = "john.smith@email.com";

export const graphNotebookInstance: INotebook = {
  isDefault: true,
  isShared: false,
  sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl",
  sectionsUrl: "https://www.example.com/sections",
  userRole: "Owner"
};

export const graphNotebookInstance1: INotebook = {
  isDefault: false,
  isShared: true,
  sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl1",
  sectionsUrl: "https://www.example.com/sections1",
  userRole: "Owner"
};

export const notebook = new Notebook(graphNotebookInstance, userId);
export const notebook1 = new Notebook(graphNotebookInstance1, userId1);

export const graphSectionGroupInstance: ISectionGroup = {
  parentNotebook: graphNotebookInstance,
  sectionGroups: [],
  sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl",
  sections: [],
  sectionsUrl: "https://www.example.com/sections"
};

export const graphSectionGroupInstance1: ISectionGroup = {
  parentNotebook: graphNotebookInstance,
  parentSectionGroup: graphSectionGroupInstance,
  sectionGroups: [],
  sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl1",
  sections: [],
  sectionsUrl: "https://www.example.com/sections"
};

export const sectionGroup = new SectionGroup(graphSectionGroupInstance, userId);
export const sectionGroup1 = new SectionGroup(
  graphSectionGroupInstance1,
  userId1
);

export const content = "<h1>Hello Page 1</h1>";
export const content1 = "<h1>Hello Page 2</h1>";

export const graphPageInstance: IPage = {
  content,
  contentUrl: "https://www.example.com/Hello%20Page%201/content",
  createdByAppId: "genericstring1",
  lastModifiedDateTime: "2014-01-01T00:00:00Z",
  level: 0,
  order: 0,
  parentNotebook: graphNotebookInstance,
  title: "Hello Page 1",
  userTags: ["tag1", "tag2"]
};

export const graphSectionInstance: ISection = {
  isDefault: true,
  pages: [graphPageInstance],
  pagesUrl: "https://www.example.com/pages",
  parentNotebook: graphNotebookInstance,
  parentSectionGroup: graphSectionGroupInstance
};

export const graphPageInstance1: IPage = {
  content: content1,
  contentUrl: "https://www.example.com/Hello%20Page%202/content",
  createdByAppId: "genericstring2",
  lastModifiedDateTime: "2014-01-01T00:00:00Z",
  level: 0,
  order: 0,
  parentNotebook: graphNotebookInstance,
  parentSection: graphSectionInstance,
  title: "Hello Page 2",
  userTags: ["tag1", "tag2"]
};

export const graphSectionInstance1: ISection = {
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

export const page = new Page(graphPageInstance, userId);
export const page1 = new Page(graphPageInstance1, userId);

export const pageId = "genericstring1";

export const parentSelfUser = "jane.doe@email.com";

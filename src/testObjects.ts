/**
 * This module contains objects which are to be used in the Jest tests
 */

import {
  Notebook as INotebook,
  OnenotePage as IPage,
  OnenoteSection as ISection,
  SectionGroup as ISectionGroup
} from "@microsoft/microsoft-graph-types";
import { User } from "msal";
import { IStateOneNote, IStateUserNotebooks } from "./reducers";
import { Notebook } from "./types/Notebook";
import { Page } from "./types/Page";
import { Section } from "./types/Section";
import { SectionGroup } from "./types/SectionGroup";
import { UserData } from "./types/UserData";

export const userId = "jane.doe@email.com";
export const userId1 = "john.smith@email.com";

export const graphNotebookInstance: INotebook = {
  displayName: "notebook",
  id: "notebookid",
  isDefault: true,
  isShared: false,
  lastModifiedDateTime: "datetime",
  sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl",
  sectionsUrl: "https://www.example.com/sections",
  userRole: "Owner"
};

export const graphNotebookInstance1: INotebook = {
  displayName: "notebookid1",
  id: "notebookid1",
  isDefault: false,
  isShared: true,
  lastModifiedDateTime: "datetime1",
  sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl1",
  sectionsUrl: "https://www.example.com/sections1",
  userRole: "Owner"
};

export const graphNotebookInstance2: INotebook = {
  displayName: "notebookid2",
  id: "notebookid2",
  isDefault: false,
  isShared: false,
  lastModifiedDateTime: "datetime2",
  sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl2",
  sectionsUrl: "https://www.example.com/sections2",
  userRole: "Reader"
};

export const notebook = new Notebook(
  graphNotebookInstance,
  userId,
  "genericstring"
);
export const notebook1 = new Notebook(
  graphNotebookInstance1,
  userId1,
  "genericstring1"
);
export const notebook2 = new Notebook(
  graphNotebookInstance2,
  userId,
  "genericstring"
);

export const graphSectionGroupInstance: ISectionGroup = {
  displayName: "sectionGroup",
  id: "sectionGroup",
  parentNotebook: graphNotebookInstance,
  sectionGroups: [],
  sectionGroupsUrl: "https://www.example.com/sectionGroupsUrl",
  sections: [],
  sectionsUrl: "https://www.example.com/sections"
};

export const graphSectionGroupInstance1: ISectionGroup = {
  id: "sectionGroup1",
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
  id: "page",
  lastModifiedDateTime: "2014-01-01T00:00:00Z",
  level: 0,
  order: 0,
  parentNotebook: graphNotebookInstance,
  title: "Hello Page 1",
  userTags: ["tag1", "tag2"]
};

export const graphSectionInstance: ISection = {
  displayName: "section",
  id: "section",
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
  id: "page1",
  lastModifiedDateTime: "2014-01-01T00:00:00Z",
  level: 0,
  order: 0,
  parentNotebook: graphNotebookInstance,
  parentSection: graphSectionInstance,
  title: "Hello Page 2",
  userTags: ["tag1", "tag2"]
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

export const page = new Page(graphPageInstance, userId);
export const page1 = new Page(graphPageInstance1, userId);

export const pageId = "genericstring1";

export const parentSelfUser = "jane.doe@email.com";

export const user = new UserData(
  new User(
    "john.smith@email.com",
    "John Smith",
    "identityProvider1",
    "genericstring1",
    {}
  ),
  "photoString1"
);

export const user1 = new UserData(
  new User(
    "jane.doe@email.com",
    "Jane Doe",
    "identityProvider2",
    "genericstring2",
    {}
  ),
  "photoString2"
);

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

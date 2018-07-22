import { Notebook as INotebook } from "@microsoft/microsoft-graph-types";

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

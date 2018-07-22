import { SectionGroup as ISectionGroup } from "@microsoft/microsoft-graph-types";
import { graphNotebookInstance } from "./graphNotebookInstances";

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

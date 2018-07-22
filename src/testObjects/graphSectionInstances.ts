import { OnenoteSection as ISection } from "@microsoft/microsoft-graph-types";
import {
  graphNotebookInstance,
  graphNotebookInstance1
} from "./graphNotebookInstances";
import { graphPageInstance, graphPageInstance1 } from "./graphPageInstances";
import {
  graphSectionGroupInstance,
  graphSectionGroupInstance1
} from "./graphSectionGroupInstances";

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

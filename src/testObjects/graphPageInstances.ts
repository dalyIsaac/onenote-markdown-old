import { OnenotePage as IPage } from "@microsoft/microsoft-graph-types";
import { graphNotebookInstance } from "./graphNotebookInstances";
import { graphSectionInstance } from "./index";

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

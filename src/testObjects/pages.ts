import { Page } from "../types/Page";
import { graphPageInstance, graphPageInstance1 } from "./graphPageInstances";
import { userId } from "./users";

export const page = new Page(
  graphPageInstance,
  userId,
  undefined,
  undefined,
  true
);
export const page1 = new Page(graphPageInstance1, userId);

export const pageId = "genericstring1";

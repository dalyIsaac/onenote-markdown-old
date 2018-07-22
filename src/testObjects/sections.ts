import { Section } from "../types/Section";
import { graphPageInstance, graphPageInstance1 } from "./graphPageInstances";
import {
  graphSectionInstance,
  graphSectionInstance1
} from "./graphSectionInstances";
import { userId, userId1 } from "./users";

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

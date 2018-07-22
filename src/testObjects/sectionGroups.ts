import { SectionGroup } from "../types/SectionGroup";
import {
  graphSectionGroupInstance,
  graphSectionGroupInstance1
} from "./graphSectionGroupInstances";
import { userId, userId1 } from "./users";

export const sectionGroup = new SectionGroup(graphSectionGroupInstance, userId);
export const sectionGroup1 = new SectionGroup(
  graphSectionGroupInstance1,
  userId1
);

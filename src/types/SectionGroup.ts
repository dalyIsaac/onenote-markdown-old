import { SectionGroup as ISectionGroup } from "@microsoft/microsoft-graph-types";
import { deflateObject } from "src/types";
import { OneNoteBase } from "./OneNoteBase";

/**
 * Deflated section group from Microsoft Graph with some custom attributes
 * @export
 * @class SectionGroup
 */
export class SectionGroup extends OneNoteBase {
  public sectionGroups: string[];
  public sections: string[];
  public isExpanded = false;

  constructor(sectionGroup: ISectionGroup, userId?: string) {
    super();
    this.sectionGroups = [];
    this.sections = [];
    this.userId = userId;
    deflateObject(this, sectionGroup);
  }
}

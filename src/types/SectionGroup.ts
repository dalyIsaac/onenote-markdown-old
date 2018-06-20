import { SectionGroup as ISectionGroup } from "@microsoft/microsoft-graph-types";
import { deflateObject } from "src/types";
import { OneNoteBase } from "./OneNoteBase";
import { Section } from "./Section";

/**
 * Deflated section group from Microsoft Graph with some custom attributes
 * @export
 * @class SectionGroup
 */
export class SectionGroup extends OneNoteBase {
  public userId: string | undefined;
  public sectionGroups: SectionGroup[];
  public sections: Section[];
  public isExpanded = false;

  constructor(sectionGroup: ISectionGroup, userId: undefined) {
    super();
    this.sectionGroups = [];
    this.sections = [];
    this.userId = userId;
    deflateObject(this, sectionGroup);
  }
}

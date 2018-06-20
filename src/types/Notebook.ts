import { Notebook as Graph_Notebook } from "@microsoft/microsoft-graph-types/microsoft-graph";
import { deflateObject } from "src/types";
import { OneNoteBase } from "./OneNoteBase";
import { Section } from "./Section";
import { SectionGroup } from "./SectionGroup";

/**
 * Deflated notebook from Microsoft Graph with some custom attributes
 * @class Notebook
 */
export class Notebook extends OneNoteBase {
  public sectionGroups: SectionGroup[];
  public sections: Section[];
  public userId: string | undefined;

  /**
   * @param {Object} notebook JSON response from the Microsoft Graph for a notebook
   * @param {string} userId
   */
  constructor(notebook: Graph_Notebook, userId: undefined) {
    super();
    this.userId = userId;
    deflateObject(this, notebook);
  }
}

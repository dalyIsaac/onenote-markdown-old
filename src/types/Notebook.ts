import { Notebook as INotebook } from "@microsoft/microsoft-graph-types";
import { deflateObject } from "./index";
import { OneNoteBase } from "./OneNoteBase";

/**
 * Deflated notebook from Microsoft Graph with some custom attributes
 * @class Notebook
 */
export class Notebook extends OneNoteBase {
  public sectionGroups: string[] = [];
  public sections: string[] = [];

  /**
   * @param {Object} notebook JSON response from the Microsoft Graph for a notebook
   * @param {string} userId
   */
  constructor(notebook: INotebook, userId?: string) {
    super();
    this.userId = userId;
    deflateObject(this, notebook);
  }
}

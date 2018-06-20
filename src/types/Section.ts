import {
  OnenotePage as IPage,
  OnenoteSection as ISection
} from "@microsoft/microsoft-graph-types";
import { deflateObject } from "src/types";
import { IOneNoteBase } from "./IOneNoteBase";

/**
 * Deflated section group from Microsoft Graph with some custom attributes
 * @export
 * @class Section
 */
export class Section implements IOneNoteBase {
  public pages: Array<string | undefined>;
  public userId: string | undefined;

  /**
   * @param section - Result from the Microsoft Graph query
   * @param pages - Result from the Microsoft Graph query on the /pages method
   * @param userId
   */
  constructor(section: ISection, pages: IPage[][], userId: undefined) {
    for (const group of pages) {
      for (const page of group) {
        this.pages.push(page.id);
      }
    }
    this.userId = userId;
    deflateObject(this, section);
  }
}

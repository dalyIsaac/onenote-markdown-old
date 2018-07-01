import { deflateObject } from "./index";
import { OneNoteBase } from "./OneNoteBase";

export class Page extends OneNoteBase {
  public error?: string;
  public content?: string;
  public level: number;
  public title: string;
  public order: number;
  public isExpanded?: boolean;

  /**
   * @param page - Result from the Microsoft Graph query
   * @param userId
   * @param content - Result from the Microsoft Graph query on the /content method
   */
  constructor(
    page: object,
    userId?: string,
    content?: string,
    error?: undefined,
    isExpanded?: boolean
  ) {
    super();
    this.error = error;
    this.content = content;
    this.userId = userId;
    this.isExpanded = isExpanded;
    deflateObject(this, page);
  }
}

import { deflateObject } from "src/types";
import { OneNoteBase } from "./OneNoteBase";

export class Page extends OneNoteBase {
  public error?: string;
  public content?: string;
  /**
   * @param page - Result from the Microsoft Graph query
   * @param userId
   * @param content - Result from the Microsoft Graph query on the /content method
   */
  constructor(
    page: object,
    userId?: string,
    content?: string,
    error?: undefined
  ) {
    super();
    this.error = error;
    this.content = content;
    this.userId = userId;
    deflateObject(this, page);
  }
}

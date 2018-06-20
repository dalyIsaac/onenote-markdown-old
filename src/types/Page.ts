import { deflateObject } from "src/types";
import { OneNoteBase } from "./OneNoteBase";

export class Page extends OneNoteBase {
  public userId: string;
  public error: string | undefined;
  public content: string | undefined;
  /**
   * @param page - Result from the Microsoft Graph query
   * @param userId
   * @param content - Result from the Microsoft Graph query on the /content method
   */
  constructor(
    page: object,
    userId: string,
    content: undefined,
    error: undefined
  ) {
    super();
    this.error = error;
    this.content = content;
    if (userId !== undefined) {
      this.userId = userId;
    }
    deflateObject(this, page);
  }
}

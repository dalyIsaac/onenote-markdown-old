import { deflateObject } from "src/types";
import { IOneNoteBase } from "./IOneNoteBase";

export class Page implements IOneNoteBase {
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
    this.error = error;
    this.content = content;
    if (userId !== undefined) {
      this.userId = userId;
    }
    deflateObject(this, page);
  }
}

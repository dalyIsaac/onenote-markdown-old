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
  public lastModifiedDateTime?: string;

  /**
   * Email address of the user. This is used to show in the NotebookPicker to
   * indicate which account has access to the notebook. The account which has access
   * is not the account which created the notebook or last modified the notebook.
   */
  public userDisplayableId?: string;

  /**
   * @param notebook JSON response from the MSGraph for a notebook
   * @param userId unique random string from MSGraph which represents a user
   * @param userDisplayableId email address of the user
   */
  constructor(
    notebook: INotebook,
    userId?: string,
    userDisplayableId?: string
  ) {
    super();
    this.userId = userId;
    this.userDisplayableId = userDisplayableId;
    deflateObject(this, notebook);
  }
}

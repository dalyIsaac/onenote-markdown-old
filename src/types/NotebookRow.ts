import { Notebook } from '@microsoft/microsoft-graph-types/microsoft-graph';

/**
 * Used in the DetailsList inside NotebookPicker
 * @export
 * @class NotebookRow
 */
export class NotebookRow {
    public fileName: string | undefined;
    public notebook: Notebook;
    public userId: string;
    public userDisplayableId: string;
    public lastModifiedDateTime: Date;

    constructor(notebook: Notebook, userId: string, displayableId: string) {
        this.fileName = notebook.displayName;
        this.lastModifiedDateTime = new Date(notebook.lastModifiedDateTime as string);
        this.userDisplayableId = displayableId;
        this.userId = userId;
        this.notebook = notebook;
    }
}
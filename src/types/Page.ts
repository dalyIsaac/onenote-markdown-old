import { deflateObject } from "src/types";

export class Page {
    public id: string | undefined;
    public userId: string;
    public error: string | undefined;
    public content: string | undefined;
    /**
     * @param page - Result from the Microsoft Graph query
     * @param userId 
     * @param content - Result from the Microsoft Graph query on the /content method
     */
    constructor(page: object, userId: string, content: undefined, error: undefined) {
        this.error = error;
        this.content = content;
        if (userId !== undefined) {
            this.userId = userId;
        }
        deflateObject(this, page);
    }
}
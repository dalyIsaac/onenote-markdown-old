import * as authentication from "./authentication";
import * as getNotebooks from "./getNotebooks";
import * as notebooks from "./notebooks";
import * as selectedNav from "./selectedNav";
import * as totalNotebookLength from "./totalNotebookLength";

// Essentially an instance variable
export let app = "";
// Updates app
export const updateApp = (newApp) => {
    app = newApp;
};

export { authentication };
export { getNotebooks };
export { notebooks };
export { selectedNav };
export { totalNotebookLength };

import { OPEN_NOTEBOOKS, LOAD_NOTEBOOK } from "../types";
import { app } from "./index";

export const openNotebooks = (notebooks) => ({
    type: OPEN_NOTEBOOKS,
    notebooks,
    app
})

export const loadNotebook = (notebook) => ({
    type: LOAD_NOTEBOOK,
    notebook
})
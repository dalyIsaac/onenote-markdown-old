// import { Notebook } from '@microsoft/microsoft-graph-types/microsoft-graph'; // eslint-disable-line

/**
 * Custom class which extends MSAL's User class.  
 * This class is not deflated in order to reduce boilerplate. 
 * @export
 * @class UserData
 */
export class UserData {
    constructor(msal, photo = "", acquireTokenError = null) {
        this.displayableId = undefined;
        Object.assign(this, msal);
        this.photo = photo;
        this.acquireTokenError = acquireTokenError;
    }
}

/**
 * Used in the DetailsList inside NotebookPicker
 * @export
 * @class NotebookRow
 */
export class NotebookRow {
    /**
     * Creates an instance of NotebookRow.
     * @param {Object} notebook 
     * @param {string} userId
     * @memberof NotebookRow
     */
    constructor(notebook, userId, displayableId) {
        this.fileName = notebook.displayName;
        this.lastModifiedDateTime = new Date(notebook.lastModifiedDateTime);
        this.userDisplayableId = displayableId;
        this.userId = userId;
        this.notebook = notebook;
    }
}

/**
 * Deflated notebook from Microsoft Graph with some custom attributes
 * @class Notebook
 */
export class Notebook {
    /**
     * @param {Object} notebook JSON response from the Microsoft Graph for a notebook
     * @param {string} userId
     */
    constructor(notebook, userId = undefined) {
        this.id = undefined; // the following explicitly defined properties are here purely for VSCode
        this.sectionGroups = [];
        this.sections = [];
        this.childrenDownloaded = false;
        if (userId !== undefined) {
            this.userId = userId;
        }
        deflateObject(this, notebook);
    }
}

/**
 * Deflated section group from Microsoft Graph with some custom attributes
 * @export
 * @class SectionGroup
 */
export class SectionGroup {
    constructor(sectionGroup, userId = undefined) {
        this.id = undefined; // the following explicitly defined properties are here purely for VSCode
        this.sectionGroups = [];
        this.sections = [];
        this.childrenDownloaded = false;
        if (userId !== undefined) {
            this.userId = userId;
        }
        deflateObject(this, sectionGroup);
    }
}

/**
 * Deflated section group from Microsoft Graph with some custom attributes
 * @export
 * @class Section
 */
export class Section {

    /**
     * @param {Object} section Result from the Microsoft Graph query
     * @param {*} pages Result from the Microsoft Graph query on the /pages method
     * @param {*} userId 
     */
    constructor(section, pages, userId = undefined) {
        this.id = undefined; // the following explicitly defined properties are here purely for VSCode
        this.pages = getIds(pages.value);
        this.childrenDownloaded = false;
        if (userId !== undefined) {
            this.userId = userId;
        }
        deflateObject(this, section);
    }
}

export class Page {
    /**
     * @param {Object} page Result from the Microsoft Graph query
     * @param {string} content Result from the Microsoft Graph query on the /content method
     * @param {string} userId 
     */
    constructor(page, content, userId = undefined) {
        this.id = undefined; // the following explicitly defined properties are here purely for VSCode
        this.content = content;
        if (userId !== undefined) {
            this.userId = userId;
        }
        deflateObject(this, page);
    }
}

/**
 * Deflates an object.  
 * For example: `{ "hello": { "world": "earth" } }` goes to `{ "hello.world": "earth" }`  
 * Note: a key which begins with `@` will not be deflated.
 * @param {Object} target 
 * @param {Object} source 
 * @param {string} [parentName='']
 */
export function deflateObject(target, source, parentName = '') {
    for (const key in source) {
        const prop = source[key];
        if (Array.isArray(prop)) {
            if (parentName !== '') {
                target[`${parentName}.${key}`] = getIds(prop);
            } else {
                target[key] = getIds(prop);
            }
        } else if (typeof prop === 'object') {
            if (parentName !== '') {
                deflateObject(target, prop, `${parentName}.${key}`);
            } else {
                deflateObject(target, prop, `${key}`);
            }
        } else {
            if (parentName !== '') {
                target[`${parentName}.${key}`] = prop;
            } else {
                target[key] = prop;
            }
        }
    }
}

/**
 * Gets the IDs from an array of objects
 * @param {array} element
 * @returns {array} idList List of IDs
 */
function getIds(element) {
    let idList = [];
    element.forEach(element => {
        idList.push(element.id);
    });
    return idList;
}

/**
 * Inflates an object.
 * For example: `{ "hello.world": "earth" }` goes to `{ "hello": { "world": "earth" } }` 
 * @param {any} target 
 * @param {any} source 
 * @param {any} key 
 */
function inflateObject(target, source, key) {
    if (typeof source === 'object') {
        for (const key in source) {
            _inflateObjectHelper(target, source[key], key)
        }
    } else {
        _inflateObjectHelper(target, source, key)
    }
}

function _inflateObjectHelper(target, source, key) {
    const dotIndex = key.includes('@odata') ? -1 : key.indexOf('.');

    if (dotIndex === -1) {
        target[key] = source;
    } else {
        const parentKey = key.slice(0, dotIndex);
        const childKey = key.slice(dotIndex + 1);
        if (target[parentKey] === undefined) {
            target[parentKey] = {};
        }
        inflateObject(target[parentKey], source, childKey)
    }
}
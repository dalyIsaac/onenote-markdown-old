/**
 * Deflates an object.  
 * For example: `{ "hello": { "world": "earth" } }` goes to `{ "hello.world": "earth" }`  
 * Note: a key which begins with `@` will not be deflated.
 */
export function deflateObject(target: object, source: object, parentName: string = '') {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
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
}

/**
 * Gets the IDs from an array of objects
 * @param {array} element
 * @returns {array} idList List of IDs
 */
function getIds(element: any[]): string[] {
    /* tslint:disable-next-line */
    let idList: string[] = [];
    element.forEach((el: any) => {
        idList.push(el.id);
    });
    return idList;
}

/**
 * Inflates an object.
 * For example: `{ "hello.world": "earth" }` goes to `{ "hello": { "world": "earth" } }` 
 */
function inflateObject(target: any, source: any, key: any) {
    if (typeof source === 'object') {
        for (const index in source) {
            if (source.hasOwnProperty(key)) {
                _inflateObjectHelper(target, source[index], key)
            }
        }
    } else {
        _inflateObjectHelper(target, source, key)
    }
}

function _inflateObjectHelper(target: any, source: any, key: any) {
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
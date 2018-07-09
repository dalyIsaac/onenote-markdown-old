/**
 * Deflates an object.
 * For example: `{ "hello": { "world": "earth" } }` goes to `{ "hello.world": "earth" }`
 * If there is an array, the deflated object will only contain the `id` property.
 * Note: a key which begins with `@odata` will not be deflated.
 */
export function deflateObject(
  target: object,
  source: object,
  parentName: string = ""
) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const prop = source[key];
      if (!key.includes("@odata")) {
        if (Array.isArray(prop)) {
          if (parentName !== "") {
            target[`${parentName}.${key}`] = getIds(prop);
          } else {
            target[key] = getIds(prop);
          }
        } else if (typeof prop === "object") {
          if (parentName !== "") {
            deflateObject(target, prop, `${parentName}.${key}`);
          } else {
            deflateObject(target, prop, `${key}`);
          }
        } else {
          if (parentName !== "") {
            target[`${parentName}.${key}`] = prop;
          } else {
            target[key] = prop;
          }
        }
      } else {
        if (typeof prop === "object") {
          target[key] = {};
          deflateObject(target[key], prop);
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
  const idList: string[] = [];
  element.forEach((el: any) => {
    idList.push(el.id);
  });
  return idList;
}

/**
 * Inflates an object.
 * For example: `{ "hello.world": "earth" }` goes to `{ "hello": { "world": "earth" } }`
 */
export function inflateObject(target: any, source: any, key: string = "") {
  if (typeof source === "object") {
    for (const currentKey in source) {
      if (source.hasOwnProperty(currentKey)) {
        _inflateObjectHelper(target, source[currentKey], currentKey);
      }
    }
  } else {
    _inflateObjectHelper(target, source, key);
  }
}

function _inflateObjectHelper(target: any, source: any, key: string) {
  const dotIndex = key.includes("@odata") ? -1 : key.indexOf(".");

  if (dotIndex === -1) {
    target[key] = source;
  } else {
    const parentKey = key.slice(0, dotIndex);
    const childKey = key.slice(dotIndex + 1);
    if (target[parentKey] === undefined) {
      target[parentKey] = {};
    }
    if (Array.isArray(source)) {
      target[parentKey][childKey] = [];
      assignArray(target[parentKey][childKey], source);
    } else {
      inflateObject(target[parentKey], source, childKey);
    }
  }
}

function assignArray(target: any, source: any) {
  for (const item of source) {
    target.push({ id: item });
  }
}

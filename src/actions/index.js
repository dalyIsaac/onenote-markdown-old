import * as authentication from './authentication';
import * as getNotebooks from './getNotebooks';
import * as notebooks from './notebooks';

// Essentially an instance variable
export let app = '';
// Updates app
export const updateApp = (newApp) => {
    app = newApp;
}

export { authentication };
export { getNotebooks };
export { notebooks };
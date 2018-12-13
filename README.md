# OneNoteMarkdown

**NOTE: A newer attempt is being built at https://github.com/dalyIsaac/onenote-markdown**.

|               |                                                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build status  | ![https://projkiwi.visualstudio.com/_apis/public/build/definitions/f360f67a-ad24-4bef-8761-31411c531bd4/2/badge](https://projkiwi.visualstudio.com/_apis/public/build/definitions/f360f67a-ad24-4bef-8761-31411c531bd4/2/badge) |
| Test status   | [![Build Status](https://travis-ci.com/dalyIsaac/onenote-markdown.svg?branch=master)](https://travis-ci.com/dalyIsaac/onenote-markdown)                                                                                         |
| Code coverage | [![Coverage Status](https://coveralls.io/repos/github/dalyIsaac/onenote-markdown/badge.svg?branch=master)](https://coveralls.io/github/dalyIsaac/onenote-markdown?branch=master)                                                |

The aim of this project is to build a web app which can be used to read and write OneNote notebooks as Markdown. The user interface is built using [React](https://reactjs.org/) and [Office UI Fabric React](https://developer.microsoft.com/en-us/fabric#/components). The state is managed using [Redux](https://redux.js.org/), with [Redux-Saga](https://redux-saga.js.org/) for handling application side effects. [localForage](https://localforage.github.io/localForage/) is used to store OneNote data such as notebooks, section groups, sections, notes, and contents in [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Currently, the source code is hosted on [GitHub](https://github.com/dalyIsaac/onenote-markdown). The master branch is built in Visual Studio Team Services using their GitHub integration, and deployed to Azure App Service via continuous integration. Testing occurs using [Travis CI](https://travis-ci.com/dalyIsaac/onenote-markdown/), running [Jest](http://jestjs.io/).

## Features

- [x] Signing in with multiple accounts
- [x] Opening and downloading notebooks, section groups, sections, and pages.
- [x] Persisting content across browser sessions
- [ ] Editing pages in Markdown

## Prerequisites

- [Node.js and npm](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)
- [git](https://git-scm.com/downloads)

## Getting the source

Clone the repo

``` shell
git clone https://github.com/dalyIsaac/onenote-markdown.git
```

## Install the dependencies

``` shell
cd onenote-markdown
yarn
```

## Run dev build

``` shell
yarn start
```

## Build production

``` shell
yarn build
```

## Jest testing

``` Shell
yarn test
```

## Debugging in VSCode

Install the [Chrome debugger](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

`/vscode/launch.json`

``` Javascript
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
        },
        {
            "type": "chrome",
            "request": "attach",
            "name": "Attach to Chrome against localhost",
            "port": 9222,
            "url": "localhost:3000",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

To attach to an existing Chrome instance, ensure that Chrome from the command line as:

Windows

``` shell
<path to chrome>/chrome.exe --remote-debugging-port=9222
```

macOS

``` shell
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

Linux

``` shell
google-chrome --remote-debugging-port=9222
```

## Redux state

``` Typescript
{
  allNotebooks,
  notebookOrder,
  onenote,
  router,
  selectedNav,
  totalNotebookLength,
  users
}
```

| State slice           | Type                    | Purpose                                                                                                                               |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `allNotebook`         | `IStateUserNotebooks[]` | Stores an array of all the notebooks which all the signed in users have access to.                                                    |
| `notebookOrder`       | `string[]`              | Stores an array of the `id`s of the notebooks in order.                                                                               |
| `onenote`             | `IStateOneNote`         | Stores `OneNote`, `SectionGroup`, `Section`, and `Page`s objects, by their `id`.                                                      |
| `router`              | `RouterState`           | Controlled by [`connected-react-router`](https://github.com/supasate/connected-react-router).                                         |
| `selectedNav`         | `string[]`              | Stores an array of the `id`s of the `onenote` objects which are currently selected.                                                   |
| `totalNotebookLength` | `number`                | Stores the total number of notebooks which are open. This is used for notifying the user of the number of notebooks yet to be loaded. |
| `users`               | `IStateUsers`           | Stores `UserData` by their `userId`,                                                                                                  |

Objects which occupy `onenote` have their Microsoft Graph structure flattened, or deflated.
For example:

``` Javascript
{
  "@Odata.context": "https://onenote.com",
  "Beethoven": {
    "nationality": "German",
    "yearBorn": 1770,
    "yearDied": 1827,
    "concertos": ["Violin Concerto in D Major","Piano Concerto No. 0", "Piano Concerto No. 1", "Piano Concerto No. 2", "Piano Concerto No. 3", "Piano Concerto No. 4", "Piano Concerto No. 5", "Triple Concerto"]
  }
}

```

would be "deflated" into

``` Javascript
{
  "@Odata.context": "https://onenote.com",
  "Beethoven.nationality": "German",
  "Beethoven.yearBorn": 1770,
  "Beethoven.yearDied": 1827,
  "Beethoven.concertos": ["Violin Concerto in D Major","Piano Concerto No. 0", "Piano Concerto No. 1", "Piano Concerto No. 2", "Piano Concerto No. 3", "Piano Concerto No. 4", "Piano Concerto No. 5", "Triple Concerto"]
}
```

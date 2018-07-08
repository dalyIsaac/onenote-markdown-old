import { DefaultButton } from "office-ui-fabric-react/lib-commonjs/Button";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  IObjectWithKey,
  Selection,
  SelectionMode
} from "office-ui-fabric-react/lib-commonjs/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib-commonjs/MarqueeSelection";
import { SearchBox } from "office-ui-fabric-react/lib-commonjs/SearchBox";
import * as React from "react";
import { IOpenNotebooks } from "../../../actions/onenote";
import { IStateOneNote, IStateUserNotebooks } from "../../../reducers";
import { Notebook } from "../../../types/Notebook";
import "./notebookPicker.css";

interface IStateNotebookPicker {
  columns: IColumn[];
  notebooks: Notebook[];
  isModalSelection: boolean;
}

interface IPropsNotebookPicker {
  allNotebooks: IStateUserNotebooks[];
  openedNotebooks: IStateOneNote;
  closeModal(): void;
  openNotebooks(notebookList: Notebook[]): IOpenNotebooks;
}

export default class NotebookPicker extends React.Component<
  IPropsNotebookPicker,
  IStateNotebookPicker
> {
  /**
   * Sorts the array by the specified property
   * @param items
   * @param sortBy Property by which the array is to be sorted by
   * @param descending Ascending by default
   */
  public static sortItems(
    items: Notebook[],
    sortBy: string,
    descending: boolean = false
  ) {
    if (descending) {
      return items.sort((a, b) => {
        const { x, y } = this.getSortValues(a, b, sortBy);
        if (x < y) {
          return 1;
        }
        if (x > y) {
          return -1;
        }
        return 0;
      });
    } else {
      return items.sort((a, b) => {
        const { x, y } = this.getSortValues(a, b, sortBy);
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    }
  }

  /**
   * Returns the key (in lowercase if it's a string)
   * @param {Object} a
   * @param {Object} b
   * @param {string} sortBy
   */
  public static getSortValues(a: object, b: object, sortBy: string) {
    let x;
    let y;
    try {
      x = a[sortBy].toLocaleLowerCase();
      y = b[sortBy].toLocaleLowerCase();
    } catch (error) {
      x = a[sortBy];
      y = b[sortBy];
    }
    return { x, y };
  }

  public selection: Selection;

  /**
   * Stores all the notebooks, unfiltered
   */
  private readonly constNotebooks: Notebook[];

  constructor(props: IPropsNotebookPicker) {
    super(props);

    this.onColumnClick = this.onColumnClick.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.openNotebooks = this.openNotebooks.bind(this);

    let notebooks = [];
    for (const account of this.props.allNotebooks) {
      for (const notebook of account.notebooks) {
        const newNotebook = new Notebook(
          notebook,
          account.userId,
          account.displayableId
        );
        if (
          this.props.openedNotebooks[newNotebook.id as string] === undefined
        ) {
          notebooks.push(newNotebook);
        }
      }
    }

    notebooks = NotebookPicker.sortItems(
      notebooks,
      "lastModifiedDateTime",
      true
    );
    const columns: IColumn[] = [
      {
        fieldName: "icon",
        iconName: "Page",
        isIconOnly: true,
        key: "iconColumn",
        maxWidth: 16,
        minWidth: 16,
        name: "Icons",
        onRender: () => {
          return (
            <img
              alt="OneNote icon"
              src={
                "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/one_16x1.svg"
              }
            />
          );
        }
      },
      {
        data: "string",
        fieldName: "displayName",
        isPadded: true,
        isResizable: true,
        isRowHeader: true,
        key: "displayNameColumn",
        maxWidth: 350,
        minWidth: 210,
        name: "Name",
        onColumnClick: this.onColumnClick
      },
      {
        data: "string",
        fieldName: "userDisplayableId",
        isPadded: true,
        isResizable: true,
        isRowHeader: true,
        key: "userDisplayableIdColumn",
        maxWidth: 350,
        minWidth: 210,
        name: "Account",
        onColumnClick: this.onColumnClick
      },
      {
        fieldName: "lastModifiedDateTime",
        isPadded: true,
        isResizable: true,
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: true,
        key: "lastModifiedDateTimeColumn",
        maxWidth: 350,
        minWidth: 210,
        name: "Last Modified Date Time",
        onColumnClick: this.onColumnClick,
        onRender: (notebook: Notebook) => {
          if (notebook.lastModifiedDateTime) {
            return <div>{new Date(notebook.lastModifiedDateTime).toLocaleString()}</div>
          } else {
            return <div>N/A</div>;
          }
        }
      }
    ];

    this.selection = new Selection();

    this.state = {
      columns,
      isModalSelection: false,
      notebooks
    };
    this.constNotebooks = notebooks;
  }

  public render() {
    const { columns, notebooks } = this.state;

    return (
      <div className="notebookPickerWrapper">
        <SearchBox
          className="filterDiv"
          placeholder="Filter"
          onChange={this.updateFilter}
        />
        <div className="detailsListDiv">
          <MarqueeSelection selection={this.selection}>
            <DetailsList
              items={notebooks}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this.selection}
              selectionPreservedOnEmptyClick={true}
              enterModalSelectionOnTouch={true}
            />
          </MarqueeSelection>
        </div>
        <DefaultButton
          className="footerDiv"
          primary={true}
          secondaryText="Starts opening the selected notebooks"
          onClick={this.openNotebooks}
          text="Open notebooks"
        />
      </div>
    );
  }

  public updateFilter(text: string) {
    text = text.toLowerCase();
    this.setState({
      notebooks: text
        ? this.constNotebooks.filter(
            (i: Notebook) =>
              (i.displayName as string).toLowerCase().indexOf(text) > -1
          )
        : this.constNotebooks
    });
  }

  public openNotebooks() {
    const selectionCount = this.selection.getSelectedCount();
    if (selectionCount > 0) {
      this.props.openNotebooks(
        this.selection
          .getSelection()
          .map((val: IObjectWithKey) => val as Notebook)
      );
    }
    this.props.closeModal();
  }

  public onColumnClick(ev: {}, column: IColumn): void; // purely for testing
  public onColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    const { columns, notebooks } = this.state;
    let newItems = notebooks.slice();
    const newColumns = columns.map(currColumn => {
      if (currColumn.key === column.key) {
        column = {
          ...column,
          isSorted: true,
          isSortedDescending: !column.isSortedDescending
        };
        return column;
      }
      return { ...currColumn, isSorted: false, isSortedDescending: true };
    });
    newItems = NotebookPicker.sortItems(
      newItems,
      column.fieldName as string,
      column.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      notebooks: newItems
    });
  }
}

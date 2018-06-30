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
import { IOpenNotebooks } from "../../actions/onenote";
import { IStateOneNote, IStateUserNotebooks } from "../../reducers";
import { NotebookRow } from "../../types/NotebookRow";
import "./notebookPicker.css";

interface IStateNotebookPicker {
  columns: IColumn[];
  notebooks: NotebookRow[];
  isModalSelection: boolean;
}

interface IPropsNotebookPicker {
  allNotebooks: IStateUserNotebooks[];
  openedNotebooks: IStateOneNote[];
  closeModal(): void;
  openNotebooks(notebookList: NotebookRow[]): IOpenNotebooks;
}

export default class NotebookPicker extends React.Component<
  IPropsNotebookPicker,
  IStateNotebookPicker
> {
  public selection: Selection;
  private constNotebooks: NotebookRow[];
  constructor(props: IPropsNotebookPicker) {
    super(props);

    this.onColumnClick = this.onColumnClick.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.openNotebooks = this.openNotebooks.bind(this);
    this.sortItems = this.sortItems.bind(this);

    let notebooks = [];
    for (const account of this.props.allNotebooks) {
      for (const notebook of account.notebooks) {
        const notebookRow = new NotebookRow(
          notebook,
          account.userId,
          account.displayableId
        );
        if (
          this.props.openedNotebooks[notebookRow.notebook.id as string] ===
          undefined
        ) {
          notebooks.push(notebookRow);
        }
      }
    }

    notebooks = this.sortItems(notebooks, "lastModifiedDateTime", true);
    const columns: IColumn[] = [
      {
        fieldName: "icon",
        iconName: "Page",
        isIconOnly: true,
        key: "column1",
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
        fieldName: "fileName",
        isPadded: true,
        isResizable: true,
        isRowHeader: true,
        key: "column2",
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
        key: "column3",
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
        key: "column4",
        maxWidth: 350,
        minWidth: 210,
        name: "Last Modified Date Time",
        onColumnClick: this.onColumnClick,
        onRender: (notebook: NotebookRow) => {
          return <div>{notebook.lastModifiedDateTime.toLocaleString()}</div>;
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

  public onChangeModalSelection(checked: boolean) {
    this.setState({ isModalSelection: checked });
  }

  public updateFilter(text: string) {
    text = text.toLowerCase();
    this.setState({
      notebooks: text
        ? this.constNotebooks.filter(
            (i: NotebookRow) =>
              (i.fileName as string).toLowerCase().indexOf(text) > -1
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
          .map((val: IObjectWithKey) => val as NotebookRow)
      );
    }
    this.props.closeModal();
  }

  public onColumnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn) {
    const { columns, notebooks } = this.state;
    let newItems = notebooks.slice();
    const newColumns = columns.slice();
    const currColumn = newColumns.filter((currCol, idx) => {
      return column.key === currCol.key;
    })[0];
    newColumns.forEach(newCol => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    newItems = this.sortItems(
      newItems,
      currColumn.fieldName as string,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      notebooks: newItems
    });
  }

  /**
   * Sorts the array by the specified property
   * @param items
   * @param sortBy Property by which the array is to be sorted by
   * @param descending
   */
  public sortItems(
    items: NotebookRow[],
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
  public getSortValues(a: object, b: object, sortBy: string) {
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
}

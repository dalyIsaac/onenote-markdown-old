import React from "react";
import PropTypes from 'prop-types';
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import "./notebookPicker.css";
import { NotebookRow } from "../../types";

export default class NotebookPicker extends React.Component {
  constructor(props) {
    super(props);

    this.onColumnClick = this.onColumnClick.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.openNotebooks = this.openNotebooks.bind(this);
    this.sortItems = this.sortItems.bind(this);

    let notebooks = [];
    for (let i = 0; i < this.props.allNotebooks.length; i++) {
      const account = this.props.allNotebooks[i];
      for (let j = 0; j < account.notebooks.length; j++) {
        const notebook = new NotebookRow(account.notebooks[j], account.userId, account.displayableId)
        if (this.props.openedNotebooks[notebook.notebook.id] === undefined) {
          notebooks.push(notebook);
        }
      }
    }

    notebooks = this.sortItems(notebooks, "lastModifiedDateTime", true);
    const columns = [
      {
        key: "column1",
        name: "Icons",
        iconName: "Page",
        isIconOnly: true,
        fieldName: "icon",
        minWidth: 16,
        maxWidth: 16,
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
        key: "column2",
        name: "Name",
        fieldName: "fileName",
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        onColumnClick: this.onColumnClick,
        data: "string",
        isPadded: true
      },
      {
        key: "column3",
        name: "Account",
        fieldName: "userDisplayableId",
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        onColumnClick: this.onColumnClick,
        data: "string",
        isPadded: true
      },
      {
        key: "column4",
        name: "Last Modified Date Time",
        fieldName: "lastModifiedDateTime",
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: true,
        onColumnClick: this.onColumnClick,
        isPadded: true,
        onRender: (notebook) => {
          return (
            <div>{notebook.lastModifiedDateTime.toLocaleString()}</div>
          );
        }
      }
    ];

    this.selection = new Selection();

    this.state = {
      notebooks,
      columns
    };
    this.constNotebooks = notebooks;
  }

  render() {
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
          description="Starts opening the selected notebooks"
          onClick={this.openNotebooks}
          text="Open notebooks"
        />
      </div>
    );
  }

  onChangeModalSelection(checked) {
    this.setState({ isModalSelection: checked });
  }

  updateFilter(text) {
    text = text.toLowerCase();
    this.setState({
      notebooks: text
        ? this.constNotebooks.filter(
          i => i.fileName.toLowerCase().indexOf(text) > -1
        )
        : this.constNotebooks
    });
  }

  openNotebooks() {
    const selectionCount = this.selection.getSelectedCount();
    if (selectionCount > 0) {
      this.props.openNotebooks(this.selection.getSelection());
    }
    this.props.closeModal();
  }

  onColumnClick(ev, column) {
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
      currColumn.fieldName,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      notebooks: newItems
    });
  }

  /**
   * Sorts the array by the specified property
   * @param {Array<NotebookRow>} items 
   * @param {string} sortBy Property by which the array is to be sorted by
   * @param {boolean} descending 
   */
  sortItems(items, sortBy, descending = false) {
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
  getSortValues(a, b, sortBy) {
    let x, y;
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


NotebookPicker.propTypes = {
  allNotebooks: PropTypes.array.isRequired,
  openNotebooks: PropTypes.func.isRequired,
  openedNotebooks: PropTypes.object
}

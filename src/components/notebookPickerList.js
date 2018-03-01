import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";

export class NotebookPickerList extends React.Component {
  constructor(props) {
    super(props);

    this._onColumnClick = this._onColumnClick.bind(this);
    this._onChangeText = this._onChangeText.bind(this);
    this._onItemInvoked = this._onItemInvoked.bind(this);
    this._getSelectionDetails = this._getSelectionDetails.bind(this);
    this._sortItems = this._sortItems.bind(this);

    let notebooks = [];
    for (let i = 0; i < this.props.notebooks.length; i++) {
      const account = this.props.notebooks[i];
      for (let j = 0; j < account.notebooks.length; j++) {
        const notebook = account.notebooks[j];
        notebooks.push({
          fileName: notebook.displayName,
          lastModifiedDateTime: notebook.lastModifiedDateTime
            .replace("T", " ")
            .replace("Z", "")
            .split(".")[0],
          userDisplayableId: account.user.displayableId,
          user: account.user
        });
      }
    }

    notebooks = this._sortItems(notebooks, "lastModifiedDateTime", true);
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
        onColumnClick: this._onColumnClick,
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
        onColumnClick: this._onColumnClick,
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
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true
      }
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails()
        });
      }
    });

    this.state = {
      notebooks,
      columns,
      selectionDetails: this._getSelectionDetails()
    };
    this.constNotebooks = notebooks;
  }

  render() {
    const { columns, notebooks } = this.state;

    return (
      <div>
        <TextField label="Filter by name:" onChanged={this._onChangeText} />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={notebooks}
            columns={columns}
            selectionMode={SelectionMode.multiple}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            enterModalSelectionOnTouch={true}
          />
        </MarqueeSelection>
      </div>
    );
  }

  _onChangeModalSelection(checked) {
    this.setState({ isModalSelection: checked });
  }

  _onChangeText(text) {
    text = text.toLowerCase();
    this.setState({
      notebooks: text
        ? this.constNotebooks.filter(
            i => i.fileName.toLowerCase().indexOf(text) > -1
          )
        : this.constNotebooks
    });
  }

  _onItemInvoked(item) {
    alert(`Item invoked: ${item.name}`);
  }

  _getSelectionDetails() {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return "1 item selected: " + this._selection.getSelection()[0].name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  _onColumnClick(ev, column) {
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
    newItems = this._sortItems(
      newItems,
      currColumn.fieldName,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      notebooks: newItems
    });
  }

  _sortItems(items, sortBy, descending = false) {
    if (descending) {
      return items.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        return 0;
      });
    } else {
      return items.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }
  }
}

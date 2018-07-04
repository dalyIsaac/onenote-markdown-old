import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {
  DefaultButton,
  DetailsList,
  IColumn,
  SelectionMode
} from "office-ui-fabric-react";
import { MarqueeSelection } from "office-ui-fabric-react/lib-commonjs/MarqueeSelection";
import {
  ISearchBoxProps,
  SearchBox
} from "office-ui-fabric-react/lib-commonjs/SearchBox";
import * as React from "react";
import { IStateOneNote, IStateUserNotebooks } from "../../../reducers";
import {
  graphNotebookInstance,
  graphNotebookInstance1,
  graphNotebookInstance2,
  notebook,
  notebook1,
  notebook2,
  userId,
  userId1
} from "../../../testObjects";
import { Notebook } from "../../../types/Notebook";
import NotebookPicker from "./index";

enzyme.configure({ adapter: new Adapter() });

function setUp() {
  const allNotebooks: IStateUserNotebooks[] = [
    {
      displayableId: "genericstring",
      notebooks: [graphNotebookInstance, graphNotebookInstance2],
      userId
    },
    {
      displayableId: "genericstring1",
      notebooks: [graphNotebookInstance1],
      userId: userId1
    }
  ];
  const openedNotebooks: IStateOneNote = {};
  openedNotebooks[notebook.id] = notebook;
  const props = {
    allNotebooks,
    closeModal: jest.fn(),
    openNotebooks: jest.fn((notebookList: Notebook[]) => undefined),
    openedNotebooks
  };

  const wrapper = enzyme.mount(<NotebookPicker {...props} />);

  return {
    props,
    wrapper
  };
}

describe("Component: notebookPicker", () => {
  test("It should render self and subcomponents", () => {
    const { wrapper } = setUp();

    // notebookPickerWrapper
    expect(
      wrapper
        .find("div")
        .first()
        .hasClass("notebookPickerWrapper")
    ).toBe(true);

    // SearchBox
    const searchBox = wrapper.find(SearchBox);
    expect(searchBox.parent().is("div.notebookPickerWrapper")).toEqual(true);
    const searchBoxProps: ISearchBoxProps = searchBox.props();
    expect(searchBoxProps.className).toBe("filterDiv");
    expect(searchBoxProps.placeholder).toBe("Filter");

    // detailsListDiv
    expect(
      wrapper
        .find("div.detailsListDiv")
        .parent()
        .is("div.notebookPickerWrapper")
    ).toEqual(true);

    // MarqueeSelection
    const marqueeSelection = wrapper.find(MarqueeSelection);
    expect(marqueeSelection.parent().is("div.detailsListDiv")).toEqual(true);
    expect(
      marqueeSelection
        .children()
        .find(DetailsList)
        .exists()
    ).toBe(true);

    // DetailsList
    const detailsList = wrapper.find(DetailsList);
    expect(detailsList.props().items).toEqual([notebook2, notebook1]);
    expect(detailsList.props().isHeaderVisible).toBe(true);
    expect(detailsList.props().selectionMode).toBe(SelectionMode.multiple);

    // DefaultButton
    const defaultButton = wrapper.find(DefaultButton);
    expect(defaultButton.parent().is("div.notebookPickerWrapper")).toBe(true);
    expect(defaultButton.props().className).toBe("footerDiv");
    expect(defaultButton.props().primary).toBe(true);
    expect(defaultButton.props().secondaryText).toBe(
      "Starts opening the selected notebooks"
    );
    expect(defaultButton.props().text).toBe("Open notebooks");
  });

  test("It should sort the notebooks by the column clicked", () => {
    const displayNameColumn: IColumn = {
      data: "string",
      fieldName: "displayName",
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSortedDescending: true,
      key: "displayNameColumn",
      maxWidth: 350,
      minWidth: 210,
      name: "Name"
    };

    testColumn(displayNameColumn);

    const lastModifiedDateTimeColumn: IColumn = {
      fieldName: "lastModifiedDateTime",
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: true,
      key: "lastModifiedDateTimeColumn",
      maxWidth: 350,
      minWidth: 210,
      name: "Last Modified Date Time"
    };

    testColumn(lastModifiedDateTimeColumn);

    const userDisplayableIdColumn: IColumn = {
      data: "string",
      fieldName: "userDisplayableId",
      isPadded: true,
      isResizable: true,
      isRowHeader: true,
      isSortedDescending: false,
      key: "userDisplayableIdColumn",
      maxWidth: 350,
      minWidth: 210,
      name: "Account"
    };

    testColumn(userDisplayableIdColumn);

    function testColumn(column: IColumn) {
      const { wrapper } = setUp();
      const notebookPicker = wrapper.instance() as NotebookPicker;
      const detailsList = wrapper.find(DetailsList).instance() as DetailsList;

      notebookPicker.onColumnClick({}, column);
      expect(notebookPicker.state.notebooks).toEqual([notebook1, notebook2]);
      expect(detailsList.props.items).toEqual([notebook1, notebook2]);

      notebookPicker.onColumnClick(
        {},
        { ...column, isSortedDescending: !column.isSortedDescending }
      );
      expect(notebookPicker.state.notebooks).toEqual([notebook2, notebook1]);
      expect(detailsList.props.items).toEqual([notebook2, notebook1]);
    }
  });
});

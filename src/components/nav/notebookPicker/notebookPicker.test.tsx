import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {
  DefaultButton,
  DetailsList,
  IColumn,
  IObjectWithKey,
  SelectionMode
} from "office-ui-fabric-react";
import { ISearchBoxProps, SearchBox } from "office-ui-fabric-react";
import { MarqueeSelection } from "office-ui-fabric-react/lib-commonjs/MarqueeSelection";
import * as React from "react";
import * as renderer from "react-test-renderer";
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

function columnTestSetUp(): IColumn[] {
  const { wrapper } = setUp();
  return (wrapper.instance() as NotebookPicker).state.columns;
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

  describe("It should sort the notebooks by the column clicked", () => {
    const testColumn = (column: IColumn) => {
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
    };

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

    test("It should sort the notebooks by the displayName column", () => {
      testColumn(displayNameColumn);
    });

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

    test("It should sort the notebooks by the lastModifiedDateTime column", () => {
      testColumn(lastModifiedDateTimeColumn);
    });

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

    test("It should sort the notebooks by the userDisplayableId column", () => {
      testColumn(userDisplayableIdColumn);
    });

    const iconColumn: IColumn = {
      fieldName: "icon",
      iconName: "Page",
      isIconOnly: true,
      key: "iconColumn",
      maxWidth: 16,
      minWidth: 16,
      name: "Icons"
    };

    test("It should attempt to sort the notebooks by the icon column (in reality, no sorting actually happens)", () => {
      testColumn(iconColumn);
    });
  });

  test("Each column should have this.onColumnClick bound to onColumnClick", () => {
    const { wrapper } = setUp();
    const notebookPicker = wrapper.instance() as NotebookPicker;
    const columns = notebookPicker.state.columns;
    for (let i = 1; i < columns.length; i++) {
      const column = columns[i];
      expect(column.onColumnClick).toBe(notebookPicker.onColumnClick);
    }
  });

  test("It should filter based on the search box input", () => {
    const { wrapper } = setUp();
    const notebookPicker = wrapper.instance() as NotebookPicker;
    notebookPicker.updateFilter("id1");
    expect(notebookPicker.state.notebooks).toEqual([notebook1]);
    notebookPicker.updateFilter("");
    expect(notebookPicker.state.notebooks).toEqual([notebook2, notebook1]);
    notebookPicker.updateFilter("id2");
    expect(notebookPicker.state.notebooks).toEqual([notebook2]);
    notebookPicker.updateFilter("notebook");
    expect(notebookPicker.state.notebooks).toEqual([notebook2, notebook1]);
  });

  test("Checks detailsList can select multiple objects", () => {
    const { wrapper } = setUp();
    const detailsList = wrapper.find(DetailsList).instance() as DetailsList;
    expect(detailsList.props.selectionMode).toBe(SelectionMode.multiple);
  });

  test("Checks that openNotebooks calls the action creator to open the selected notebooks", () => {
    const { wrapper } = setUp();
    const notebookPicker = wrapper.instance() as NotebookPicker;
    notebookPicker.openNotebooks();
    expect(
      (notebookPicker.props.openNotebooks as jest.Mock).mock.calls.length
    ).toBe(0);

    notebookPicker.selection.getSelectedCount = jest.fn().mockReturnValue(1);
    notebookPicker.selection.getSelection = jest
      .fn()
      .mockReturnValue([notebook1] as IObjectWithKey[]);
    notebookPicker.openNotebooks();
    expect(
      (notebookPicker.props.openNotebooks as jest.Mock).mock.calls.length
    ).toBe(1);
    expect(
      (notebookPicker.props.openNotebooks as jest.Mock).mock.calls[0]
    ).toEqual([[notebook1]]);
  });

  test("Checks that the images column renders an image", () => {
    const column = columnTestSetUp()[0];
    if (column.onRender !== undefined) {
      const renderedColumn = enzyme.shallow(column.onRender());
      expect(renderedColumn.find("img").exists()).toBe(true);

      const component = renderer.create(column.onRender());
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    }
  });

  test("Checks that the last date modified is correct", () => {
    const column = columnTestSetUp()[3];
    if (column.onRender !== undefined) {
      const component = renderer.create(column.onRender(notebook));
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();

      const notebookWithNoDate = notebook1;
      notebookWithNoDate.lastModifiedDateTime = undefined;
      const component1 = renderer.create(column.onRender(notebookWithNoDate));
      const tree1 = component1.toJSON();
      expect(tree1).toMatchSnapshot();
    }
  });
});

import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {
  DefaultButton,
  DetailsList,
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

  const enzymeWrapper = enzyme.mount(<NotebookPicker {...props} />);

  return {
    enzymeWrapper,
    props
  };
}

describe("Component: notebookPicker", () => {
  test("It should render self and subcomponents", () => {
    const { enzymeWrapper } = setUp();

    // notebookPickerWrapper
    expect(
      enzymeWrapper
        .find("div")
        .first()
        .hasClass("notebookPickerWrapper")
    ).toBe(true);

    // SearchBox
    const searchBox = enzymeWrapper.find(SearchBox);
    expect(searchBox.parent().is("div.notebookPickerWrapper")).toEqual(true);
    const searchBoxProps: ISearchBoxProps = searchBox.props();
    expect(searchBoxProps.className).toBe("filterDiv");
    expect(searchBoxProps.placeholder).toBe("Filter");

    // detailsListDiv
    expect(
      enzymeWrapper
        .find("div.detailsListDiv")
        .parent()
        .is("div.notebookPickerWrapper")
    ).toEqual(true);

    // MarqueeSelection
    const marqueeSelection = enzymeWrapper.find(MarqueeSelection);
    expect(marqueeSelection.parent().is("div.detailsListDiv")).toEqual(true);
    expect(
      marqueeSelection
        .children()
        .find(DetailsList)
        .exists()
    ).toBe(true);

    // DetailsList
    const detailsList = enzymeWrapper.find(DetailsList);
    const notebooks: Notebook[] = [notebook2, notebook1];
    expect(detailsList.props().items).toEqual(notebooks);
    expect(detailsList.props().isHeaderVisible).toBe(true);
    expect(detailsList.props().selectionMode).toBe(SelectionMode.multiple);

    // DefaultButton
    const defaultButton = enzymeWrapper.find(DefaultButton);
    expect(defaultButton.parent().is("div.notebookPickerWrapper")).toBe(true);
    expect(defaultButton.props().className).toBe("footerDiv");
    expect(defaultButton.props().primary).toBe(true);
    expect(defaultButton.props().secondaryText).toBe(
      "Starts opening the selected notebooks"
    );
    expect(defaultButton.props().text).toBe("Open notebooks");
  });

  //   test("It should sort the columns by the ")
});

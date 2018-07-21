import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Icon, setIconOptions } from "office-ui-fabric-react";
import * as React from "react";
import { IPropsNotebookNav } from "../../../containers/notebookNav";
import {
  notebook2,
  notebookOrder,
  onenote,
  selectedNav
} from "../../../testObjects";
import LoadingNavItem from "../loadingNavItem";
import NavItem from "../navItem";
import NotebookNav, { IPropsNotebookNavExternal } from "./notebookNav";

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true
});

enzyme.configure({ adapter: new Adapter() });

function getProps() {
  const props: IPropsNotebookNav & IPropsNotebookNavExternal = {
    addNotebook: jest.fn(),
    notebookOrder,
    onenote,
    selectedNav,
    totalNotebookLength: 2,
    updateSelected: jest.fn()
  };
  return props;
}

describe("Components: NotebookNav", () => {
  test("It should render self and subcomponents", () => {
    const props = getProps();
    const wrapper = enzyme.mount(<NotebookNav {...props} />);

    const nav = wrapper.find("nav");
    expect(nav.hasClass("notebookNav")).toBe(true);

    const navitems = wrapper.find(NavItem);
    for (let i = 0; i < props.notebookOrder.length; i++) {
      const id = props.notebookOrder[i];
      const currentNotebook = props.onenote[id];
      const navitem = navitems.at(i);
      expect(navitem.key()).toBe(currentNotebook.id);
      expect(navitem.key()).toBe(id);
      expect(navitem.parent().is("nav.notebookNav")).toBe(true);

      expect({
        ...navitem.props(),
        updateSelected: undefined
      }).toEqual({
        icon: <Icon iconName="Dictionary" className="icon" />,
        indentation: 0,
        isSelectable: true,
        isSelected: selectedNav[0] === currentNotebook.id,
        item: currentNotebook,
        navItemContexts: [],
        updateSelected: undefined
      });
    }
  });

  test("totalNotebookLength is not the same as notebookOrder length", () => {
    const props = {
      ...getProps(),
      totalNotebookLength: 4
    };
    const wrapper = enzyme.mount(<NotebookNav {...props} />);

    const addnavitem = wrapper.find(LoadingNavItem);
    expect(addnavitem.props().value).toBe(2);
    expect(addnavitem.props().type).toBe("notebook");
    expect(addnavitem.key()).toBe("notebookLoadingNumber");
    expect(addnavitem.parent().is("nav.notebookNav")).toBe(true);
  });

  test("There's a notebook id which doesn't correspond to a notebook in onenote", () => {
    const props = {
      ...getProps(),
      noteookOrder: [...notebookOrder, notebook2.id],
      totalNotebookLength: 3
    };
    const wrapper = enzyme.mount(<NotebookNav {...props} />);

    const navitems = wrapper.find(NavItem);
    expect(navitems.length).toBe(2);
  });
});

import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Callout, Icon, setIconOptions } from "office-ui-fabric-react";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { section, sectionGroup } from "../../../testObjects";
import NavItem, { IPropsNavItem } from "./navItem";

setIconOptions({
  disableWarnings: true
});

enzyme.configure({ adapter: new Adapter() });

function setUpSectionGroup() {
  const props: IPropsNavItem = {
    icon: <Icon iconName="Sections" />,
    indentation: 0,
    isSelected: false,
    item: sectionGroup,
    key: "SectionGroupKey",
    navItemContexts: [
      <p key="p">Hello world</p>,
      <p key="p1">Hello world 1</p>
    ],
    updateIsExpanded: jest.fn(),
    updateSelected: jest.fn()
  };
  const wrapper = enzyme.mount(<NavItem {...props} />);
  return { props, wrapper };
}

function setUpSection() {
  const props: IPropsNavItem = {
    icon: <Icon iconName="Section" />,
    indentation: 0,
    isSelected: false,
    item: section,
    key: "SectionKey",
    navItemContexts: [
      <p key="p">Hello world</p>,
      <p key="p1">Hello world 1</p>
    ],
    updateSelected: jest.fn()
  };
  const wrapper = enzyme.mount(<NavItem {...props} />);
  return { props, wrapper };
}

describe("Components: NavItem", () => {
  function renderCallout(
    wrapper: enzyme.ReactWrapper<
      any,
      Readonly<{}>,
      React.Component<{}, {}, any>
    >
  ) {
    // Callout should be rendered
    const callout = wrapper.find(Callout);
    expect(callout.parent().is("div"));
    expect(
      renderer.create((wrapper.instance() as NavItem).callout).toJSON()
    ).toMatchSnapshot();
  }

  test("It should render itself and subcomponents", () => {
    const { props, wrapper } = setUpSectionGroup();

    const parentDiv = wrapper.find("div").first();
    expect(parentDiv.props().style).toEqual({ marginLeft: 0 });

    const button = wrapper.find("button").first();
    expect(button.hasClass("navItem")).toBe(true);
    expect(button.parent().is("div")).toBe(true);

    const divNavItemWrapper = wrapper.find("div").at(1);
    expect(divNavItemWrapper.hasClass("navItemWrapper")).toBe(true);
    expect(divNavItemWrapper.parent().is("button.navItem")).toBe(true);

    const icon = wrapper.find(Icon);
    expect(icon.props().iconName).toBe("Sections");
    expect(icon.parent().is("div.navItemWrapper")).toBe(true);

    const label = wrapper.find("label");
    expect(label.text()).toBe(props.item.displayName);
    expect(label.parent().is("div.navItemWrapper")).toBe(true);
  });

  describe("Section group", () => {
    test("Right click on button, and the item is not already selected", () => {
      const { wrapper, props } = setUpSectionGroup();
      const button = wrapper.find("button").first();
      button.simulate("contextmenu");
      const instance = wrapper.instance() as NavItem;

      // item is not selected
      // section groups are expandable
      // the section group is not expanded
      // calls updateSelected
      const updateSelected = instance.props.updateSelected as jest.Mock;
      expect(updateSelected.mock.calls.length).toBe(1);
      expect(updateSelected.mock.calls[0]).toEqual([props.item.id]);

      // calls updateIsExpanded
      const updateIsExpanded = instance.props.updateIsExpanded as jest.Mock;
      expect(updateIsExpanded.mock.calls.length).toBe(1);
      expect(updateIsExpanded.mock.calls[0]).toEqual([props.item.id, true]);

      expect(instance.state.rightClick).toBe(true);

      renderCallout(wrapper);
    });

    test("Right click on button, and the item is already selected", () => {
      const { wrapper } = setUpSectionGroup();
      wrapper.setProps({ isSelected: true });
      const button = wrapper.find("button").first();
      button.simulate("contextmenu");
      const instance = wrapper.instance() as NavItem;

      // item is selected
      const updateSelected = instance.props.updateSelected as jest.Mock;
      expect(updateSelected.mock.calls.length).toBe(1);
      expect(updateSelected.mock.calls[0]).toEqual(["notebookid"]);

      // item is expandable
      const updateIsExpanded = instance.props.updateIsExpanded as jest.Mock;
      expect(updateIsExpanded.mock.calls.length).toBe(1);
      expect(updateIsExpanded.mock.calls[0]).toEqual(["sectionGroup", false]);

      expect(instance.state.rightClick).toBe(true);

      renderCallout(wrapper);
    });
  });

  describe("Section", () => {
    test("Right click on button, and the item is not already selected", () => {
      const { wrapper, props } = setUpSection();
      const button = wrapper.find("button").first();
      button.simulate("contextmenu");
      const instance = wrapper.instance() as NavItem;

      // item is not selected
      // sections are not expandable

      // calls updateSelected
      const updateSelected = instance.props.updateSelected as jest.Mock;
      expect(updateSelected.mock.calls.length).toBe(1);
      expect(updateSelected.mock.calls[0]).toEqual([props.item.id]);

      expect(instance.state.rightClick).toBe(true);

      renderCallout(wrapper);
    });

    test("Right click on button, and the item is already selected", () => {
      const { wrapper } = setUpSection();
      wrapper.setProps({ isSelected: true });
      const button = wrapper.find("button").first();
      button.simulate("contextmenu");
      const instance = wrapper.instance() as NavItem;

      // item is selected
      const updateSelected = instance.props.updateSelected as jest.Mock;
      expect(updateSelected.mock.calls.length).toBe(1);
      expect(updateSelected.mock.calls[0]).toEqual(["sectionGroup"]);

      // item is not expandable

      expect(instance.state.rightClick).toBe(true);

      renderCallout(wrapper);
    });
  });

  // displayName slice 40

  // page, because title

  // item which is selected
});

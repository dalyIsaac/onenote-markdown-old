import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Icon, setIconOptions } from "office-ui-fabric-react";
import * as React from "react";
import * as renderer from "react-test-renderer";
import AddNavItem, { IPropsAddNavItem } from "./addNavItem";

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true
});

enzyme.configure({ adapter: new Adapter() });

function setUp() {
  const props: IPropsAddNavItem = {
    iconName: "Add",
    onClick: jest.fn(),
    text: "Open notebooks"
  };
  const wrapper = enzyme.mount(<AddNavItem {...props} />);
  return { props, wrapper };
}

describe("Components: AddNavItem", () => {
  test("It should render self and subcomponents", () => {
    const { wrapper, props } = setUp();

    const button = wrapper.find("button").first();
    expect(button.hasClass("addNavItemButton")).toBe(true);

    const divAddNavItemWrapper = wrapper.find("div").first();
    expect(divAddNavItemWrapper.hasClass("addNavItemWrapper")).toBe(true);
    expect(divAddNavItemWrapper.parent().is("button.addNavItemButton")).toBe(
      true
    );

    const icon = wrapper.find(Icon).first();
    expect(icon.hasClass("icon addIcon")).toBe(true);
    expect(icon.parent().is("div.addNavItemWrapper")).toBe(true);

    const label = wrapper.find("label").first();
    expect(label.hasClass("addNavItemLabel")).toBe(true);
    expect(label.text()).toBe(props.text);
    expect(label.parent().is("div.addNavItemWrapper")).toBe(true);

    expect(
      renderer.create(<AddNavItem {...props} />).toJSON()
    ).toMatchSnapshot();
  });
});

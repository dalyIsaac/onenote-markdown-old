import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Icon, setIconOptions } from "office-ui-fabric-react";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { IPropsNavItemContext } from "./navItemContext";
import NavItemContext from "./navItemContext";

setIconOptions({
  disableWarnings: true
});

enzyme.configure({ adapter: new Adapter() });

function setUp() {
  const props: IPropsNavItemContext = {
    calloutDismiss: jest.fn(),
    iconName: "ChromeClose",
    onClick: jest.fn(),
    text: "Hello world"
  };
  const wrapper = enzyme.mount(<NavItemContext {...props} />);
  return { props, wrapper };
}

describe("Components: NavItemContext", () => {
  test("It should render self and subcomponents", () => {
    const { props, wrapper } = setUp();

    const button = wrapper.find("button").first();
    expect(button.hasClass("navItemContextWrapper")).toBe(true);

    const div = wrapper.find("div").first();
    expect(div.parent().is("button.navItemContextWrapper")).toBe(true);

    const icon = wrapper.find(Icon).first();
    expect(icon.hasClass("icon")).toBe(true);
    expect(icon.props().iconName).toBe(props.iconName);
    expect(icon.parent().is("div")).toBe(true);

    const label = wrapper.find("label").first();
    expect(label.text()).toBe(props.text);
    expect(label.parent().is("div")).toBe(true);

    expect(
      renderer.create(<NavItemContext {...props} />).toJSON()
    ).toMatchSnapshot();
  });

  test("Ensures that onClick fires the correct methods", () => {
    const { wrapper } = setUp();
    const navItemContext = wrapper.instance() as NavItemContext;
    navItemContext.onClick();
    expect((navItemContext.props.onClick as jest.Mock).mock.calls.length).toBe(
      1
    );
    expect(
      (navItemContext.props.calloutDismiss as jest.Mock).mock.calls.length
    ).toBe(1);
  });
});

import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { ActionButton, setIconOptions } from "office-ui-fabric-react";
import * as React from "react";
import { IPropsAbout } from "../../containers/about";
import About from "./about";

setIconOptions({
  disableWarnings: true
});

enzyme.configure({ adapter: new Adapter() });

describe("Components: About", () => {
  test("It should render itself and subcomponents", () => {
    const props: IPropsAbout = {
      signIn: jest.fn()
    };
    const wrapper = enzyme.mount(<About {...props} />);

    const div = wrapper.find("div").first();
    expect(div.hasClass("hero")).toBe(true);

    const button = wrapper.find(ActionButton);
    expect(button.props().iconProps).toEqual({ iconName: "AddFriend" });
    expect(button.text()).toBe("Sign in");
    expect(button.parent().is("div.hero")).toBe(true);

    button.simulate("click");
    expect((button.props().onClick as jest.Mock).mock.calls.length).toBe(1);
  });
});

import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import * as React from "react";
import * as renderer from "react-test-renderer";
import LoadingNavItem, { IPropsLoadingNavItem } from "./loadingNavItem";

enzyme.configure({ adapter: new Adapter() });

function setUp() {
  const props: IPropsLoadingNavItem = {
    type: "Generic item",
    value: 0
  };
  const wrapper = enzyme.mount(<LoadingNavItem {...props} />);
  return { props, wrapper };
}

describe("Components: LoadingNavItem", () => {
  test("It should render self and subcomponents", () => {
    const { wrapper, props } = setUp();

    const divLoadingItemWrapper = wrapper.find("div").first();
    expect(divLoadingItemWrapper.hasClass("loadingItemWrapper")).toBe(true);

    const spinner = wrapper.find(Spinner).first();
    expect(spinner.hasClass("loadingNavItemSpinner")).toBe(true);
    expect(spinner.props().size).toBe(SpinnerSize.xSmall);
    expect(spinner.parent().is("div.loadingItemWrapper")).toBe(true);

    const label = wrapper.find("label").first();
    expect(label.hasClass("loadingNavItemSpinnerLabel")).toBe(true);
    expect(label.parent().is("div.loadingItemWrapper")).toBe(true);
    expect(label.text()).toBe(`Loading 0 ${props.type}s`);

    expect(
      renderer.create(<LoadingNavItem {...props} />).toJSON()
    ).toMatchSnapshot();
  });

  test("Ensures that the grammar of the label changes as the value updates", () => {
    const { wrapper, props } = setUp();

    const label = wrapper.find("label").first();
    expect(label.text()).toBe(`Loading 0 ${props.type}s`);

    wrapper.setProps({ value: 1 });
    expect(label.text()).toBe(`Loading 1 ${props.type}`);

    wrapper.setProps({ value: 2 });
    expect(label.text()).toBe(`Loading 2 ${props.type}s`);
  });
});

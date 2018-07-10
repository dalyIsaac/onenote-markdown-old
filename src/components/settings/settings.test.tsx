import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { SettingsComponent } from "./settings";

enzyme.configure({ adapter: new Adapter() });

describe("Components: Settings", () => {
  test("Renders", () => {
    const wrapper = enzyme.mount(<SettingsComponent />);
    expect(wrapper.find("p").exists()).toBe(true);
    expect(wrapper.text()).toBe("Welcome to settings");
  });
});

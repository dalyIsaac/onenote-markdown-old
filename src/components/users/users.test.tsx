import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import { setIconOptions } from "office-ui-fabric-react";
import * as React from "react";
import { IPropsUsers } from "../../containers/users";
import { users } from "../../testObjects";
import UsersComponent from "../usersComponent";
import UsersContainer from "./users";

setIconOptions({
  disableWarnings: true
});

enzyme.configure({ adapter: new Adapter() });

describe("Component: Users", () => {
  test("It should render itself and subcomponents", () => {
    const props: IPropsUsers = {
      redirectToAbout: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      users
    };
    const wrapper = enzyme.mount(<UsersContainer {...props} />);

    const usersComponent = wrapper.find(UsersComponent);
    const usersComponentProps = usersComponent.props();

    const personas = [
      {
        imageInitials: "JS",
        imageUrl: "photoString1",
        initialsColor: 0,
        personaName: "john.smith@email.com",
        userName: "John Smith"
      },
      {
        imageInitials: "JD",
        imageUrl: "photoString2",
        initialsColor: 1,
        personaName: "jane.doe@email.com",
        userName: "Jane Doe"
      }
    ];
    expect(usersComponentProps.users).toEqual(personas);
  });

  test("It should redirect when there's no users", () => {
    const props: IPropsUsers = {
      redirectToAbout: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      users: {}
    };
    const wrapper = enzyme.mount(<UsersContainer {...props} />);

    const redirectToAbout = (wrapper.props() as IPropsUsers)
      .redirectToAbout as jest.Mock;
    expect(redirectToAbout.mock.calls.length).toBe(1);
  });
});

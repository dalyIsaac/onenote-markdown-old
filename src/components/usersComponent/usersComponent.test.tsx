import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {
  Facepile,
  Panel,
  Persona,
  PersonaSize,
  setIconOptions
} from "office-ui-fabric-react";
import * as React from "react";
import { ReactElement } from "react";
import { persona, persona1 } from "../../testObjects";
import UsersComponent, {
  IPropsUsersComponent,
  IStateUsersComponent
} from "./usersComponent";

setIconOptions({
  disableWarnings: true
});

enzyme.configure({ adapter: new Adapter() });

function setupTwoUsers() {
  const props: IPropsUsersComponent = {
    signIn: jest.fn(),
    signOut: jest.fn(),
    users: [persona, persona1]
  };
  const wrapper = enzyme.mount(<UsersComponent {...props} />);
  return { props, wrapper };
}

function setupNoUsers() {
  const props: IPropsUsersComponent = {
    signIn: jest.fn(),
    signOut: jest.fn(),
    users: []
  };
  const wrapper = enzyme.mount(<UsersComponent {...props} />);
  return { props, wrapper };
}

function setupOneUser() {
  const props: IPropsUsersComponent = {
    signIn: jest.fn(),
    signOut: jest.fn(),
    users: [persona]
  };
  const wrapper = enzyme.mount(<UsersComponent {...props} />);
  return { props, wrapper };
}

describe("Components: UsersComponent", () => {
  test("It should render itself and subcomponents when  there are two users", () => {
    const { props, wrapper } = setupTwoUsers();

    const topDiv = wrapper.find("div").first();
    expect(topDiv.exists()).toBe(true);

    // templates
    const templatesButton = wrapper.find("button").first();
    expect(templatesButton.parent().is("div")).toBe(true);
    expect(templatesButton.key()).toBe("usersButton");
    expect(templatesButton.hasClass("facepileContainer")).toBe(true);
    // FacePile
    const facepile = wrapper.find(Facepile);
    expect(facepile.key()).toBe("personaFacepile");
    expect(facepile.props().personaSize).toBe(PersonaSize.size32);
    expect(facepile.props().personas).toEqual(props.users);
    expect(facepile.props().showAddButton).toBe(false);
    expect(facepile.parent().is("button.facepileContainer"));

    // Panel
    const panel = wrapper.find(Panel);
    expect(panel.key()).toBe("usersPanel");
    expect(panel.props().isLightDismiss).toBe(true);
    expect(panel.props().hasCloseButton).toBe(true);
    expect(panel.props().headerText).toBe("User accounts");
    expect(panel.parent().is("div")).toBe(true);

    // personas
    const personasDivs = wrapper.find("div.PersonaContainer");
    for (let i = 0; i < personasDivs.length; i++) {
      const element = personasDivs[i];
      const expectedPersona = props.users[i];
      expect(element.key()).toBe(
        expectedPersona.personaName + "PanelContainer"
      );
      expect(element.parent().is(Panel)).toBe(true);

      const personaComponent = element.find(Persona);
      expect(personaComponent.props().imageInitials).toBe(
        expectedPersona.imageInitials
      );
      expect(personaComponent.props().initialsColor).toBe(
        expectedPersona.initialsColor
      );
      expect(personaComponent.props().imageUrl).toBe(expectedPersona.imageUrl);
      expect(personaComponent.props().text).toBe(expectedPersona.userName);
      expect(personaComponent.props().secondaryText).toBe(
        expectedPersona.personaName
      );
      expect(personaComponent.props().size).toBe(PersonaSize.size40);
      expect(personaComponent.key()).toBe(
        expectedPersona.personaName + "Panel"
      );
    }
  });

  test("Clicking showUserPanelClicked when there are accounts logged in", () => {
    const { wrapper } = setupTwoUsers();
    const button = wrapper.find("button").first();
    button.simulate("click");

    const showUserPanelState = (wrapper.state() as IStateUsersComponent)
      .showUserPanel;
    expect(showUserPanelState).toBe(true);
    expect(wrapper.find(Panel).props().isOpen).toBe(showUserPanelState);
  });

  test("Checks what's inside a panel when there's two personas", () => {
    const { wrapper } = setupTwoUsers();
    const panel = wrapper.find(Panel);
    const panelChildren = panel.props().children as Array<
      ReactElement<any> | Array<ReactElement<any>>
    >;

    // personas
    const personas = panelChildren[0];
    const johnSmithContainer = personas[0];
    expect(johnSmithContainer.key).toBe("john.smith@outlook.comPanelContainer");
    expect(johnSmithContainer.props.className).toBe("PersonaContainer");
    expect(johnSmithContainer.props.children.key).toBe(
      "john.smith@outlook.comPanel"
    );
    expect(johnSmithContainer.props.children.key).toBe(
      persona.personaName + "Panel"
    );
    expect(johnSmithContainer.props.children.props).toEqual({
      imageInitials: persona.imageInitials,
      imageUrl: persona.imageUrl,
      initialsColor: persona.initialsColor,
      secondaryText: persona.personaName,
      size: PersonaSize.size40,
      text: persona.userName
    });

    const janeDoePersona = personas[1];
    expect(janeDoePersona.key).toBe("jane.doe@outlook.comPanelContainer");
    expect(janeDoePersona.props.className).toBe("PersonaContainer");
    expect(janeDoePersona.props.children.key).toBe("jane.doe@outlook.comPanel");
    expect(janeDoePersona.props.children.key).toBe(
      persona1.personaName + "Panel"
    );
    expect(janeDoePersona.props.children.props).toEqual({
      imageInitials: persona1.imageInitials,
      imageUrl: persona1.imageUrl,
      initialsColor: persona1.initialsColor,
      secondaryText: persona1.personaName,
      size: PersonaSize.size40,
      text: persona1.userName
    });

    // signIn ActionButton
    const signInButton = panelChildren[1] as ReactElement<any>;
    expect(signInButton.props.iconProps).toEqual({ iconName: "AddFriend" });
    expect(signInButton.props.onClick).not.toBeUndefined();

    // signOut ActionButton
    const signOutButton = panelChildren[2] as ReactElement<any>;
    expect(signOutButton.props.iconProps).toEqual({ iconName: "PeopleBlock" });
    expect(signOutButton.props.onClick).not.toBeUndefined();
  });

  test("Clicking showUserPanelClicked when there are no accounts logged in", () => {
    const { wrapper } = setupNoUsers();
    const facepile = wrapper.find(Facepile);
    const addButton = facepile.children().find("button");
    addButton.simulate("click");
    expect((wrapper.state() as IStateUsersComponent).showUserPanel).toBe(true);
  });

  test("Checks what's inside a panel when there's no personas", () => {
    const { wrapper } = setupNoUsers();
    const templates = wrapper.find("div.addbuttonContainer");
    expect(templates.key()).toBe("addButtonContainer");
    const facepile = templates.find(Facepile);
    expect(facepile.key()).toBe("personaFacepile");
    // addButtonProps is tested in showUserPanelClicked
    expect({
      ...facepile.props(),
      addButtonProps: undefined
    }).toEqual({
      addButtonProps: undefined,
      personaSize: PersonaSize.size32,
      personas: [],
      showAddButton: true
    });
  });

  test("Checks what's inside a panel when there's a single persona", () => {
    const { wrapper } = setupOneUser();
    const button = wrapper.find("button").first();
    expect(
      button.hasClass("facepileContainer facepileContainerSingleUser")
    ).toBe(true);
  });

  test("Checks that onDismiss works", () => {
    const { wrapper } = setupNoUsers();

    const usersButton = wrapper.find("button");
    usersButton.simulate("click");

    const usersComponent = wrapper.find(UsersComponent);
    expect(
      (usersComponent.instance().state as IStateUsersComponent).showUserPanel
    ).toBe(true);

    const panel = wrapper.find(Panel);
    const props = panel.props();
    if (props.onDismiss) {
      props.onDismiss();
    } else {
      expect(props.onDismiss).toBeDefined();
    }
    expect(
      (usersComponent.instance().state as IStateUsersComponent).showUserPanel
    ).toBe(false);
  });
});

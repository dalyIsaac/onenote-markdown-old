import { ActionButton } from "office-ui-fabric-react";
import {
  Facepile,
  Panel,
  PanelType,
  Persona,
  PersonaSize
} from "office-ui-fabric-react";
import * as React from "react";
import { IAction } from "../../actions";
import { ICustomPersona } from "../users";
import "./usersComponent.css";

export interface IStateUsersComponent {
  showUserPanel: boolean;
}

export interface IPropsUsersComponent {
  users: ICustomPersona[];
  signIn(): IAction;
  signOut(): IAction;
}

export default class UsersComponent extends React.Component<
  IPropsUsersComponent,
  IStateUsersComponent
> {
  constructor(props: IPropsUsersComponent) {
    super(props);
    this.state = { showUserPanel: false };
    this.showUserPanelClicked = this.showUserPanelClicked.bind(this);
    this.hideUserPanel = this.hideUserPanel.bind(this);
  }

  public render() {
    const personas: JSX.Element[] = [];
    this.props.users.forEach(user => {
      personas.push(
        <div
          className="PersonaContainer"
          key={user.personaName + "PanelContainer"}
        >
          <Persona
            imageInitials={user.imageInitials}
            initialsColor={user.initialsColor}
            imageUrl={user.imageUrl}
            text={user.userName}
            secondaryText={user.personaName}
            size={PersonaSize.size40}
            key={user.personaName + "Panel"}
          />
        </div>
      );
    });

    const templates = [];
    if (this.props.users.length > 0) {
      templates.push(
        <button
          key="usersButton"
          className={
            "facepileContainer" +
            (this.props.users.length === 1
              ? " facepileContainerSingleUser"
              : "")
          }
          onClick={this.showUserPanelClicked}
        >
          <Facepile
            key="personaFacepile"
            personaSize={PersonaSize.size32}
            personas={this.props.users}
            showAddButton={false}
          />
        </button>
      );
    } else {
      templates.push(
        <div className="addbuttonContainer" key="addButtonContainer">
          <Facepile
            key="personaFacepile"
            personaSize={PersonaSize.size32}
            personas={this.props.users}
            showAddButton={true}
            addButtonProps={{ onClick: this.showUserPanelClicked }}
          />
        </div>
      );
    }
    return (
      <div>
        {templates}
        <Panel
          key="usersPanel"
          isOpen={this.state.showUserPanel}
          type={PanelType.smallFixedFar}
          onDismiss={this.hideUserPanel}
          isLightDismiss={true}
          hasCloseButton={true}
          headerText="User accounts"
        >
          {personas}
          <ActionButton
            iconProps={{ iconName: "AddFriend" }}
            onClick={this.props.signIn}
          >
            Add an account
          </ActionButton>
          <ActionButton
            iconProps={{ iconName: "PeopleBlock" }}
            onClick={this.props.signOut}
            disabled={this.props.users.length === 0 ? true : false}
          >
            Sign out of all accounts
          </ActionButton>
        </Panel>
      </div>
    );
  }

  private showUserPanelClicked() {
    this.setState({ showUserPanel: !this.state.showUserPanel });
  }

  private hideUserPanel() {
    this.setState({ showUserPanel: false });
  }
}

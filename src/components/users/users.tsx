import { PersonaInitialsColor } from "office-ui-fabric-react";
import * as React from "react";
import { IPropsUsers } from "../../containers/users";
import UsersComponent from "../usersComponent";

export interface ICustomPersona {
  imageInitials?: string;
  imageUrl?: string;
  personaName?: string;
  userName?: string;
  initialsColor?: PersonaInitialsColor;
}

export default class UsersContainer extends React.Component<IPropsUsers> {
  public componentWillMount() {
    if (Object.keys(this.props.users).length === 0) {
      this.props.redirectToAbout();
    }
  }

  public render() {
    const personas: ICustomPersona[] = [];
    for (const userId in this.props.users) {
      if (this.props.users.hasOwnProperty(userId)) {
        const user = this.props.users[userId];
        const persona: ICustomPersona = {
          imageUrl: user.photo,
          initialsColor:
            PersonaInitialsColor[PersonaInitialsColor[personas.length % 15]], // NOTE: Hard-coded value
          personaName: user.displayableId,
          userName: user.name
        };
        if (user.name) {
          persona.imageInitials = user.name
            .split(" ")
            .reduce((acc: string, val: string) => acc + val[0], "");
        } else if (user.displayableId) {
          persona.imageInitials = user.displayableId
            .slice(0, user.displayableId.indexOf("@"))
            .split(".")
            .reduce((acc: string, val: string) => acc + val[0], "");
        }
        personas.push(persona);
      }
    }
    return (
      <UsersComponent
        users={personas}
        signIn={this.props.signIn}
        signOut={this.props.signOut}
      />
    );
  }
}

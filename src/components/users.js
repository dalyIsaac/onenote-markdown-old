import * as React from 'react';
import UsersComponent from './usersComponent';
import { PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';

export default class UsersContainer extends React.Component {
    componentWillMount() {
        if (this.props.users.length === 0) {
            this.props.redirectToAbout();
        }
    }

    render() {
        let personas = [];
        this.props.users.forEach(user => {
            const persona = {
                imageInitials: user.msal.name.split(' ').reduce((acc, val) => acc + val[0], ''),
                imageUrl: user.photo,
                personaName: user.msal.displayableId,
                userName: user.msal.name,
                initialsColor: PersonaInitialsColor[personas.length % 13]
            };
            personas.push(persona);
        });
        return (
            <UsersComponent
                users={personas}
                signIn={this.props.signIn}
                signOut={this.props.signOut}
            />
        );
    }
}
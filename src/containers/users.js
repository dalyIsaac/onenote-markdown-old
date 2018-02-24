import * as React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { UsersComponent } from '../components/users';
import { PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';

class UsersContainer extends React.Component {
  render() {
    let personas = [];
    this.props.users.forEach(user => {
      const persona = {
        imageInitials: user.msal.name.split(' ').reduce((acc, val) => acc + val[0], ''),
        imageUrl: user.photo,
        personaName: user.msal.name,
        initialsColor: PersonaInitialsColor[personas.length % 13]
      };
      personas.push(persona);
    });
    return <UsersComponent users={personas}/>
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => {
      dispatch(signIn())
    },
    signOut: () => {
      dispatch(signOut())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

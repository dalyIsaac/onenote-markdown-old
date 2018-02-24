import * as React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

class Users extends React.Component {
  render() {
    var url = window.URL || window.webkitURL;
    let templates = [];
    this.props.users.forEach(
      (user) => {
        const names = user.msal.name.split(" ");
        const initials = names.reduce((acc, val) => acc + val[0], '');
        templates.push(
          <Persona
            imageInitials={initials}
            size={PersonaSize.size48}
            primaryText={user.msal.name}
            secondaryText={user.msal.displayableId}
            imageUrl={user.photo}
            key={user.msal.displayableId}
          />
        )
      }
    )
    templates.push(
      <DefaultButton
        key='LoginButton'
        text='Login'
        onClick={this.props.signIn}
      />
    );
    return templates;
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
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

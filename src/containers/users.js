import * as React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Callout} from 'office-ui-fabric-react/lib/Callout';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = { confirmSignout: false };
    this.onSignoutClicked = this.onSignoutClicked.bind(this);
    this.onSignoutDismiss = this.onSignoutDismiss.bind(this);
    this._signoutButtonElement = null;
  }

  onSignoutClicked() {
    this.setState({ confirmSignout: !this.state.confirmSignout });
  }

  onSignoutDismiss() {
    this.setState({ confirmSignout: false });
  }

  render() {
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
      <div key='msal'>
        <DefaultButton
          key='SignInButton'
          text='Sign in'
          onClick={this.props.signIn}
        />
      </div>
    );
    templates.push(
      <div>
        <div ref={ (signoutButton) => this._signoutButtonElement = signoutButton }>
          <DefaultButton
            onClick={ this.onSignoutClicked }
            text={ this.state.signOutButtonElement ? 'Cancel' : 'Sign out of all accounts' }
          />
        </div>
        { this.state.confirmSignout && (
          <Callout
            role={ 'alertdialog' }
            gapSpace={ 0 }
            target={ this._signoutButtonElement }
            onDismiss={ this.onSignoutDismiss }
            setInitialFocus={ true }
          >
            Hello world
          </Callout>
        ) }
      </div>
    )
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
    },
    signOut: () => {
      dispatch(signOut())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

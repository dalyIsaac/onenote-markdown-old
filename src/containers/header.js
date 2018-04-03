import { connect } from "react-redux";
import Header from "../components/header";
import { signOut, reauthorizeUser } from "../actions/authentication";
import { authentication } from "../actions";

const mapStateToProps = state => ({
  users: state.users,
  userWithError: findUserWithError(state.users)
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authentication.authenticate(dispatch)),
  reauthorizeUser: user => dispatch(reauthorizeUser(user)),
  signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

function findUserWithError(users) {
  for (const user in users) {
    if (users[user].acquireTokenError !== null) {
      return users[user];
    }
  }
  return undefined;
}
import { connect } from "react-redux";
import Header from "../components/header";
import { signOut, reauthorizeUser } from "../actions/authentication";
import { authentication } from "../actions";

const mapStateToProps = state => ({
  users: state.users,
  userWithError: state.users.find(user => user.acquireTokenError !== null)
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authentication.authenticate(dispatch)),
  reauthorizeUser: user => dispatch(reauthorizeUser(user)),
  signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

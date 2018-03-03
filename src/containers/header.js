import { connect } from "react-redux";
import { HeaderComponent } from "../components/header";
import { signOut, reauthorizeUser } from "../actions/authentication";

const mapStateToProps = state => ({
  users: state.users,
  userWithError: state.users.find(user => user.acquireTokenError !== null)
});

const mapDispatchToProps = dispatch => ({
  reauthorizeUser: user => dispatch(reauthorizeUser(user)),
  signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

import { connect } from "react-redux";
import { authentication } from "../actions";
import { push } from "connected-react-router";
import Users from "../components/users";

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: () => dispatch(authentication.signIn()),
    signOut: () => dispatch(authentication.signOut()),
    redirectToAbout: () => dispatch(push("/about"))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

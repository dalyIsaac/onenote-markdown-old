import { connect } from "react-redux";
import { authentication } from "../actions";
import About from "../components/about";

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(authentication.signIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(About);

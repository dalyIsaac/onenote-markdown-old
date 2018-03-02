import * as React from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { authentication } from "../actions";
import AboutComponent from "../components/about";

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(authentication.signIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutComponent);

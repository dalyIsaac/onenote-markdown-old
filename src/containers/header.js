import { connect } from "react-redux";
import { HeaderComponent } from "../components/header";

const mapStateToProps = state => ({
  users: state.users,
  userWithError: state.users.find(user => user.acquireTokenError !== null)
});

export default connect(mapStateToProps)(HeaderComponent);

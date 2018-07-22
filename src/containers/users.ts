import { push } from "connected-react-router";
import { connect, Dispatch } from "react-redux";
import { Action } from "redux";
import { authentication, IAction } from "../actions";
import Users from "../components/users";
import { IState, IStateUsers } from "../reducers";

export interface IPropsUsers {
  users: IStateUsers;
  redirectToAbout(): Action<any>;
  signIn(): IAction;
  signOut(): IAction;
}

const mapStateToProps = (state: IState): Partial<IPropsUsers> => ({
  users: state.users
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<IPropsUsers> => {
  return {
    redirectToAbout: () => dispatch(push("/about")),
    signIn: () => dispatch(authentication.signIn()),
    signOut: () => dispatch(authentication.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

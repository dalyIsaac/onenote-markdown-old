import { connect, Dispatch } from "react-redux";
import { authentication, IAction, IActionUser } from "../actions";
import {
  IAuthenticate,
  reauthorizeUser,
  signOut
} from "../actions/authentication";
import Header from "../components/header";
import { IState, IStateUsers } from "../reducers";
import { UserData } from "../types/UserData";

export interface IPropsHeader {
  userWithError?: UserData;
  users: IStateUsers;
  authenticate(): IAuthenticate;
  reauthorizeUser(user: UserData): IActionUser;
  signOut(): IAction;
}

const mapStateToProps = (state: IState): Partial<IPropsHeader> => ({
  userWithError: findUserWithError(state.users),
  users: state.users
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<IPropsHeader> => ({
  authenticate: () => dispatch(authentication.authenticate(dispatch)),
  reauthorizeUser: (user: UserData) => dispatch(reauthorizeUser(user)),
  signOut: () => dispatch(signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

function findUserWithError(users: IStateUsers) {
  for (const user in users) {
    if (users[user].acquireTokenError !== null) {
      return users[user];
    }
  }
  return undefined;
}

import { connect, Dispatch } from "react-redux";
import { IState, IStateUsers } from "src/reducers";
import { UserData } from "src/types/UserData";
import { authentication, IAction, IActionUser } from "../actions";
import {
  IAuthenticate,
  reauthorizeUser,
  signOut
} from "../actions/authentication";
import Header from "../components/header";

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

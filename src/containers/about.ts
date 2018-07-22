import { connect, Dispatch } from "react-redux";
import { authentication, IAction } from "../actions";
import About from "../components/about";
import { IState } from "../reducers";

export interface IPropsAbout {
  signIn(): IAction;
}

const mapStateToProps = (state: IState): Partial<IPropsAbout> => ({});

const mapDispatchToProps = (dispatch: Dispatch): Partial<IPropsAbout> => ({
  signIn: () => dispatch(authentication.signIn())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);

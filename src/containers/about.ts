import { connect, Dispatch } from "react-redux";
import { authentication, IAction } from "src/actions";
import { IState } from "src/reducers";
import About from "../components/about";

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

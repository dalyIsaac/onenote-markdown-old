import { Location } from "history";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { RouteComponentProps } from "react-router";
import { IState, IStateUsers } from "./reducers";

interface IPropsPrivateRoute {
  computedMatch?: object;
  exact?: boolean;
  location?: Location;
  path: string;
  users: IStateUsers;
  component: React.ComponentClass;
}

class PrivateRoute extends React.Component<IPropsPrivateRoute> {
  public static defaultProps: Partial<IPropsPrivateRoute> = {
    exact: false
  };

  public render() {
    const { component: Component, ...rest } = this.props;
    return (
      /* tslint:disable-next-line */
      <Route {...rest} render={props => this.redirect(props)} />
    );
  }

  private redirect(props: RouteComponentProps<{}>) {
    const { component: Component, ...rest } = this.props;
    return rest.users !== {} ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/about",
          state: { from: props.location }
        }}
      />
    );
  }
}

const mapStateToProps = (state: IState) => ({
  users: state.users
});

const mapDispatchToProps = () => ({
  // nothing here yet
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);

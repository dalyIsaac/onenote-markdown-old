// React
import * as React from "react";
import * as ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import rootSaga from "./sagas";

// react-router, connected-react-router
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from "connected-react-router";
import { createBrowserHistory } from "history";
import { Route, Switch } from "react-router";
import PrivateRoute from "./routing";

// office-ui-fabric
import { Fabric } from "office-ui-fabric-react/lib-commonjs/Fabric";
import { initializeIcons } from "office-ui-fabric-react/lib-commonjs/Icons";

// App components
import App from "./App";
import { SettingsComponent } from "./components/settings";
import AboutContainer from "./containers/about";
import HeaderContainer from "./containers/header";
import "./index.css";

initializeIcons();

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
    compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  )
);
sagaMiddleware.run(rootSaga);

const Container = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Fabric>
          <HeaderContainer />
          <Switch>
            <PrivateRoute path="/settings" component={SettingsComponent} />
            <PrivateRoute exact={true} path="/" component={App} />
            <Route path="/about" component={AboutContainer} />
          </Switch>
        </Fabric>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<Container />, document.getElementById("root"));
registerServiceWorker();

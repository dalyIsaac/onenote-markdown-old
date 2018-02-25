import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Route, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import PrivateRoute from './routing';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';

import './index.css';
import App from './App';
import { SettingsComponent } from './components/settings';
import AboutContainer from './containers/about';

import rootSaga from './sagas';
import registerServiceWorker from './registerServiceWorker';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'

import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons();
const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, historyMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Fabric>
                <App />
                <Switch>
                    <PrivateRoute path="/settings" component={SettingsComponent} />
                    <Route path="/about" component={AboutContainer} />
                </Switch>
            </Fabric>
        </ConnectedRouter>
    </Provider>,
 document.getElementById('root'));
registerServiceWorker();

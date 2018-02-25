import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Route, Redirect, Switch } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';

import './index.css';
import App from './App';
import { SettingsComponent } from './components/settings';
import AboutContainer from './containers/about';

import rootSaga from './sagas';
import registerServiceWorker from './registerServiceWorker';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'

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
                    <Route path='/about' component={AboutContainer} />
                    <Route path="/settings" component={SettingsComponent} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Fabric>
        </ConnectedRouter>
    </Provider>,
 document.getElementById('root'));
registerServiceWorker();

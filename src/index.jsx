import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createLogger from 'redux-logger';
import reducer from './reducers';
import App from './containers/App';
import Navigator from './components/Navigator';
import Modal from './components/Modal';
import FadeOut from './components/FadeOut';

const store = applyMiddleware(createLogger())(createStore)(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Navigator} />
        <Route path="modal" component={Modal} />
        <Route path="fadeOut" component={FadeOut} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

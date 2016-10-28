import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Router, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import Root from './components/root';
import Home from './components/home';
import Whiteboard from './components/whiteboard';
import WhiteboardHeader from './components/whiteboard-header';
import TitleBar from './components/titlebar';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

const myApp =
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={Root}>
          <IndexRoute component={Home}/>
          <Route path=':whiteboardId' component={Whiteboard}>
            <IndexRoute component={WhiteboardHeader}/>
            <IndexRoute component={TitleBar}/>
          </Route>
        </Route>
      </Router>
    </Provider>;

ReactDOM.render(
  myApp, document.querySelector('#container')
);

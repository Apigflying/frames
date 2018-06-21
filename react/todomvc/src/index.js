import React from 'react';
import ReactDOM from 'react-dom';
import 'style/reset/reset.scss';

// import { createStore, applyMiddleware, compose } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import reducers from 'store/index'

import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';

import App from './App';

React.Component.prototype.$moment = moment;
React.Component.prototype.$nextTick = process.nextTick;

// const store = createStore(reducers, compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : compose
// ))


ReactDOM.render(
  // <Provider store={store}>
    <Router>
      <App />
    </Router>
  // </Provider>
  ,
  document.getElementById('root')
);

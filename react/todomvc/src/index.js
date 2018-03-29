import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import moment from 'moment';
React.Component.prototype.$moment = moment;
React.Component.prototype.$nextTick = process.nextTick;
ReactDOM.render(
  <App/>, document.getElementById('root'));


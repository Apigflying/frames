import React from 'react';
import ReactDOM from 'react-dom';
import 'style/reset/reset.scss';
import App from './App';
import moment from 'moment';
import {BrowserRouter} from 'react-router-dom';

React.Component.prototype.$moment = moment;
React.Component.prototype.$nextTick = process.nextTick;
ReactDOM.render(
  <BrowserRouter>
  <App/>
</BrowserRouter>, document.getElementById('root'));

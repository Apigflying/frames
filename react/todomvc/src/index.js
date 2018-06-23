import React from 'react';
import ReactDOM from 'react-dom';
import 'style/reset/reset.scss';
import 'style/index.scss';
import moment from 'moment';
import {Provider} from 'react-redux';
import store from 'store';
import App from './App';

const rootEle = document.getElementById('root');
React.Component.prototype.$moment = moment;
React.Component.prototype.$nextTick = process.nextTick;
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootEle
)

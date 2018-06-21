import React from 'react';
import ReactDOM from 'react-dom';
import 'style/reset/reset.scss';
import 'style/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import store from 'store';
import App from './App';

const rootEle = document.getElementById('root');
React.Component.prototype.$moment = moment;
React.Component.prototype.$nextTick = process.nextTick;


const render = ()=>ReactDOM.render(
    <App
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />
  ,
  rootEle
);
render();
store.subscribe(render)

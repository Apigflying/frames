import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import Nav from '@/Components/Nav/Nav';
import Routes from './Route';

/*
  使用history模式,可能会与Api有冲突,所以需要在服务器的nginx上做限制
  让未知的请求都重定向到index.html
*/


export default class App extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <Routes/>
      </Router>
    );
  }
}

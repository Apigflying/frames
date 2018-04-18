import React, {Component} from 'react';
import RouterIndex from './router/index';
import MainHeader from './view/public/main-header';
import MainFooter from './view/public/main-footer';
import 'antd/dist/antd.css';
import './style/cssreset.scss';
class App extends Component {
  render() {
    return (
      <div className="pageWrap">
        <MainHeader />
        <RouterIndex/>
        <MainFooter />
      </div>
    );
  }
}

export default App;

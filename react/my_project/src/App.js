import React, {Component} from 'react';
import RouterIndex from './router/index';
import './view/index.css';
import MainHeader from './view/main-header';
import MainFooter from './view/main-footer';
class App extends Component {
  render() {
    return (
      <div className="pageWrap">
        <MainHeader />
        <MainFooter />
      </div>
    );
    // (<RouterIndex/>);
  }
}

export default App;

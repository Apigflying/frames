import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import 'style/public/index.scss';
import Nav from './main-nav';
// const {Header} = Layout;

class MainHeader extends Component {
  render() {
    return (
      <header id="header">
        <div id="header-outer" className="outer">
          <div className="container">
            <div className="container-inner">
              <div id="header-title" className="clear">
                <h1 className="logo-wrap fl">
                  <Link className="GitHub" to={"/"} alt="GitHub头像">
                    <img src="https://avatars0.githubusercontent.com/u/25586605?s=460&v=4"/>
                  </Link>
                </h1>
                <h2 className="subtitle-wrap fl">
                  <p>个人小站</p>
                  <p>test myself</p>
                </h2>
              </div>
              <Nav/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default MainHeader;
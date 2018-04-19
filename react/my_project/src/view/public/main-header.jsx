import React, { Component } from "react";
import { Link } from "react-router-dom";
import "style/public/index.scss";
import NavLeft from "./main-nav";
import NavRight from "components/search";
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
                    <img src="https://avatars0.githubusercontent.com/u/25586605?s=460&v=4" alt="logo"/>
                  </Link>
                </h1>
                <h2 className="subtitle-wrap fl">
                  <p>abcd</p>
                  <p>test myself</p>
                </h2>
              </div>
              <div id="header-navs" className="clear">
                <div className="nav-left fl">
                  <NavLeft />
                </div>
                <div className="nav-right fr">
                  <NavRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default MainHeader;

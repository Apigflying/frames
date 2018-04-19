import React, { Component } from "react";
import RouterIndex from "./router/index";
import MainHeader from "./view/public/main-header";
import MainFooter from "./view/public/main-footer";
import "element-theme-default";
import "./style/cssreset.scss";
class App extends Component {
  render() {
    return (
      <div className="pageWrap">
        <MainHeader />
        <div className="container">
          <div className="main-body container-inner">
            <section id="main">
              <div className="main-body-header">頭部</div>
              <div className="main-body-content">
                <RouterIndex />
              </div>
            </section>
            <aside id="sidebar"></aside>
          </div>
        </div>

        <MainFooter />
      </div>
    );
  }
}

export default App;

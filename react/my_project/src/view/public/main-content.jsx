import React, { Component } from "react";
import RouterIndex from "router/index";
import AsideBar from 'view/aside';
import "style/public/content.scss";

class Content extends Component {
  render() {
    return (
      <div className="container">
        <div className="main-body container-inner">
          <div className="main-body-inner clear">
            <section id="main" className="fr">
              <div className="main-body-header">
                <h3>主页</h3>
              </div>
              <div className="main-body-content">
                <RouterIndex />
              </div>
            </section>
            <AsideBar/>
          </div>
        </div>
      </div>
    );
  }
}
export default Content;

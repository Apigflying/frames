import React, { Component } from "react";
import RouterIndex from "router/index";
class Content extends Component {
  render() {
    return (
      <div className="container">
        <div className="main-body container-inner">
          <section id="main">
            <div className="main-body-header">頭部</div>
            <div className="main-body-content">
              <RouterIndex />
            </div>
          </section>
          <aside id="sidebar" />
        </div>
      </div>
    );
  }
}
export default Content;
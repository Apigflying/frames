import React, { Component } from "react";
class AsideBar extends Component {
  render() {
    return (
      <aside id="sidebar" className="fl">
        <div className="sidebar-top clear">
          <p className="fl">关注我</p>
        </div>
        <div className="widgets-container">最新文章等</div>
      </aside>
    );
  }
}
export default AsideBar;

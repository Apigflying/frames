import React, { Component } from "react";
import MainHeader from "view/public/main-header";
import MainFooter from "view/public/main-footer";
import MainContent from 'view/public/main-content';
import "element-theme-default";
import "./style/cssreset.scss";
class App extends Component {
  render() {
    return (
      <div className="pageWrap">
        <MainHeader />
        <MainContent />
        <MainFooter />
      </div>
    );
  }
}

export default App;

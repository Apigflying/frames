import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "element-react";
import routes from "router/routes.js";
const currentRoute = routes.find(item=>{
  return window.location.pathname.includes(item.path)
})
class Nav extends Component {
  state = {
    current: currentRoute.path
  };
  componentWillMount() {
    if (this.state.current === "/") {
      this.setState({
        current: "/home"
      });
    }
  }
  onSelect(e) {
    this.setState({ current: e });
  }
  render() {
    return (
      <Menu
        theme="dark"
        defaultActive={this.state.current}
        className="nav"
        mode="horizontal"
        onSelect={this.onSelect.bind(this)}
      >
        {routes.map((item, index) => {
          return (
            <Menu.Item index={item.path} key={index}>
              <NavLink className="navlink" to={item.path}>
                <i className={"icon iconfont " + item.icon} /> {item.name}
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
export default Nav;

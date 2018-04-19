import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu} from 'element-react';

const routes = [
  {
    path: '/index',
    name: '首页',
    icon: 'el-icon-document'
  }, {
    path: '/about',
    name: '关于',
    icon: 'el-icon-document'
  }, {
    path: '/details',
    name: '详情',
    icon: 'el-icon-document'
  }
]
class Nav extends Component {
  state = {
    current: window.location.pathname
  }
  componentWillMount() {
    console.log(this.state.current);
  }
  componentDidMount() {
    console.log('didMount');
  }
  onSelect(e) {
    console.log(this.props);
    this.setState({current: e})
  }
  render() {
    return (

      <Menu
        defaultActive={this.state.current}
        className="nav"
        mode="horizontal"
        onSelect={this
        .onSelect
        .bind(this)}>
        {routes.map((item, index) => {
          return (
            <Menu.Item index={item.path} key={index}>
              <NavLink to={item.path}>
                <i className={'el-icon ' + item.icon}/> {item.name}
              </NavLink>
            </Menu.Item>
          )
        })}
      </Menu>
    );
  }
}
export default Nav;
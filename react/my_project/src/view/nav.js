import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
class Nav extends Component {
  componentWillMount(){
    console.log('willMount');
  }
  componentDidMount(){
    console.log('didMount');
  }
  render() {
    let {mode,id} = this.props;
    return (
      <Menu mode={mode} id={id} theme="light">
        <Menu.Item>
          <Link to="/index"><Icon type="home"/>首页</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/book"><Icon type="book"/>教程</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/about"><Icon type="info-circle-o"/>关于</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
export default Nav;
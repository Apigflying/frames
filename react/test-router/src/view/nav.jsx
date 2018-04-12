import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render(){
    return (
      <div>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
        <Link to="/bar">bar</Link>
      </div>
    )
  }
}
export default Nav;
import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {NavLink} from 'react-router-dom';
/*
  二级路由组件
*/
class CustomMenu extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    
    this.state = {
      current: props.defaultSelect
    }
    this.handleClick = this
      .handleClick
      .bind(this);
  }
  createItem(item) {
    return (
      <Menu.Item key={item.key}>
        {item.icon
          ? <Icon type={item.icon}/>
          : ''}
        <NavLink to={item.to}>{item.name}</NavLink>
      </Menu.Item>
    )
  }
  handleClick = (e) => {
    this.setState({current: e.key});
  }

  //----------钩子函数----------
  componentWillMount(){
    
  }
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode={this.props.mode || 'horizontal'}>
        {this
          .props
          .navs
          .map(this.createItem)}
      </Menu>
    );
  }
}
export default CustomMenu;
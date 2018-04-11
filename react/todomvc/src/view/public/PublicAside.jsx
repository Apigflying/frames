import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import routes from 'router/routes'
const SubMenu = Menu.SubMenu;

//组件之间传递数据
class PublicAside extends Component {
  constructor(props){
    super(props);
    this.state={
      menuItem: [],
      subMenu:[],
    }
  }
  //----------事件函数----------
  onMenuItemClick(menuItem) {
    // console.log(openKeys);
    this.setState({
      menuItem:[menuItem.key]
    })
  }
  onSubMenuChange(subMenu) {
    let lastSubMenu = null;
    if(subMenu.length>1){
      lastSubMenu = subMenu.splice(subMenu.length-1,1);
    }else{
      lastSubMenu=subMenu;
    }
    // console.log('sub',lastSubMenu);
    // console.log('item',this.state.menuItem);
    this.setState({
      subMenu:lastSubMenu
    })
  }
  //----------钩子函数----------
  componentWillMount(){
    let pathname = window.location.pathname;
    // 展开的subMenu
    let lastSubMenu = []
    // 选中的MenuItem
    let lastMenuItem = []
    const mapFn = item=>{
      return pathname.includes(item.path);
    }
    let first = routes.filter(mapFn)[0];
    let second=null;
    if(!first)return;
    console.log(first);
    lastSubMenu.push(first.key)
    if(!!first.children){
      second = first.children.filter(mapFn)[0];
      lastMenuItem.push(second.key);
    }
    this.setState({
      subMenu:lastSubMenu,
      menuItem:lastMenuItem
    })
    // console.log(lastSubMenu,lastMenuItem);
  }
  render(match) {
    return (
      <Menu
        className="menu"
        openKeys={this.state.subMenu}
        onOpenChange={this.onSubMenuChange.bind(this)}
        selectedKeys={this.state.menuItem}
        onClick={this.onMenuItemClick.bind(this)}
        mode="inline">
        {routes.map(item=>{
          return (!item.children?(
            <Menu.Item key={item.key}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </Menu.Item>
          ):(
            <SubMenu
              key={item.key}
              title={<span> {item.icon?<Icon type={item.icon}/>:''} <span>{item.name}</span></span>}>
              {item.children.map(child=>
                <Menu.Item key={child.key}>
                  <NavLink to={`${item.path}/${child.path}`}>{child.name}</NavLink>
                </Menu.Item>
              )}
            </SubMenu>
          ))
        })}
      </Menu>
    )
  }
}
export default PublicAside;
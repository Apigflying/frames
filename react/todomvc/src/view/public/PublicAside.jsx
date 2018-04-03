import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import {Route} from 'react-router-dom'
const SubMenu = Menu.SubMenu;

//组件之间传递数据
class PublicAside extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      openKeys: []
    }
  }
  onOpenChange(openKeys) {
    console.log(openKeys);
    // let currentKeys = this.state.openKeys;
    // // 拿到上一个
    // let currentKeys = this.state.openKeys;
    // let latestOpenKey = currentKeys.length;
    // if(latestOpenKey){
    //   // 如果存在，说明是不是第一次添加
    //   openKeys.splice(openKeys.indexOf(latestOpenKey),1)
    // }
    this.setState({
      openKeys
    })
  }

  componentDidMount(){
    let pathname = window.location.pathname;
    if(pathname.includes('purchase/purchase-business')){
      this.setState({
        openKeys:['21','2']
      })
    }
  }
  render(match) {
    return (
      <Menu
        className="menu"
        openKeys={this.state.openKeys}
        selectedKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange.bind(this)}
        mode="inline">
        <Menu.Item key="0">
          <NavLink to="/home">首页</NavLink>
        </Menu.Item>
        <SubMenu
          key="1"
          title={<span> <Icon type="mail"/> <span> 资料 </span></span>}>
          <Menu.Item key="11">
            <NavLink to="/material/storage-material">仓库资料</NavLink>
          </Menu.Item>
          <Menu.Item key="12">
            <NavLink to="/material/brand-mag">品牌管理</NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="2"
          title={<span> <Icon type="menu-fold"/> <span> 采购 </span></span>}>
          <Menu.Item key="21">
            <NavLink to="/purchase/purchase-business">采购业务</NavLink>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="3"
          title={<span> <Icon type="menu-fold"/> <span> 仓储 </span></span>}>
          <Menu.Item key="31">
            <NavLink to="/storages/out-put">出入库业务</NavLink>
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
export default PublicAside;

// constructor(props){   super(props);   this.state = {     navSetting:{
// isHaveSubMenu:true,//是否有二级导航       navs:[{         icon:'mail',
// key:'zl',         name:'资料',         children:[{           key:'cczl',
//    name:'仓储资料',           to:'/material/ware-house',         },{
// key:'ppgl',           name:'品牌管理',           to:'/material/brand-mag'
// },{           key:'gysjxy',           name:'供应商及协议',
// to:'/material/supplier-agr'         }]       },{         icon:'appstore',
//     key:'cg',         name:'采购',         children:[{           key:'cgrw',
//        name:'采购任务',           to:'/purchase/buying-task'         },{
//  key:'cgbb',           name:'采购报表',           to:'/purchase/purchase-report'
//        }]       },{         key:'cc',         name:'仓储',         children:[]
//      }]     }   } }
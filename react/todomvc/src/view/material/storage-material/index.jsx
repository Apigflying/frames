import React, {Component} from 'react';
import 'style/index.scss';
import Menu from 'components/Menu/index';
import Route from './router'
//面包屑导航
class StorageMaterial extends Component {
  constructor(props){
    super(props);
    this.state = {
      navSetting:{
        default:'zzjg',
        navs:[{
          icon:'mail',
          key:'zzjg',
          to:'/material/storage-material/zzjg',
          name:'组织机构'
        },{
          icon:'appstore',
          key:'qygl',
          to:'/material/storage-material/qygl',
          name:'区域管理'
        },{
          key:'ckgl',
          to:'/material/storage-material/ckgl',
          name:'仓库管理'
        }]
      }
    }
  }
  render() {
    return (
      <div>
        <Menu {...this.state.navSetting}/>
        <Route/>
      </div>
    )
  }
}
export default StorageMaterial;

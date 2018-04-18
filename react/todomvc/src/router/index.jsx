import React, {Component} from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
/*
  @待处理：懒加载
*/
import Home from 'view/home/index';
// 资料-仓储资料
import StorageMaterial from 'view/material/storage-material/index';
// 资料-品牌管理
import BrandMag from 'view/material/brand-mag/index'
// 采购-采购业务
import PurchaseBs from 'view/purchase/purchase-business/index';
import OutPut from 'view/storages/out-put/index';

class RouterIndex extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => (<Redirect to= "/home" />)}/> 
        <Route path="/home" component={Home}/>
        {/* 资料-仓储资料 */}
        <Route path="/material/storage-material" component={StorageMaterial}/>
        {/* 资料-品牌管理 */}
        <Route path="/material/brand-mag" component={BrandMag}/>
        {/* 采购-采购业务 */}
        <Route path="/purchase/purchase-business" component={PurchaseBs} onEnter={(params,replace)=>{
          console.log(params);
          replace('/storages/out-put')
        }}/>
        <Route path="/storages/out-put" component={OutPut}/>
      </Switch>
    )
  }
}
export default RouterIndex;
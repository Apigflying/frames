import React, {Component} from 'react';
import 'style/index.scss';
import {Breadcrumb} from 'antd';
//面包屑导航
class BreadCrubs extends Component {
  render() {
    return (
      <Breadcrumb separator=">">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
        <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
        <Breadcrumb.Item>An Application</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}
export default BreadCrubs;

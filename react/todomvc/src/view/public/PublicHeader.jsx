import React, {Component} from 'react';
import {Divider} from 'antd';
//组件之间传递数据
class PublicHeader extends Component {
  render() {
    return (
      <header className="clear">
        <div className="head-left fl">
          <h1 className="fl">屏芯科技</h1>
          <Divider type="vertival"/>
          <span>ljh</span>
        </div>
        <div className="head-right fr">
          <span>
            欢迎您
          </span>
          <Divider type="vertival"/>
          <span>
            注销
          </span>
        </div>
      </header>
    )
  }
}
export default PublicHeader;
import React, {Component} from 'react';
import {Divider} from 'antd';
//组件之间传递数据
class PublicHeader extends Component {
  state={
    loading:true,
    err:'发生了错误',
    data:null
  }
  componentDidMount(){
    this.props.promise.then(res=>{
      this.setState({
        loading:false,
        data:res,
        err:null
      })
    },err=>{
      this.setState({
        loading:false,
        err:err,
        data:null
      })
    })
  }
  render() {
      if(this.state.loading){
        return <span>这里是loading</span>

      }else if(this.state.data){
        return <header className="clear">
        <div className="head-left fl">
          <h1 className="fl">屏芯科技</h1>
          <Divider type="vertival"/>
          <span>{this.state.data}</span>
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
      } else{
        return <span>Error:{this.state.err}</span>
      }
      
  }
}
export default PublicHeader;
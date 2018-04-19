import React,{Component} from 'react';
import 'style/common/index.scss';
class Search extends Component{
  render(){
    return (
      <form action="//google.com/search" method="get" acceptCharset="UTF-8" className="search-form">
        <i className="icon iconfont icon-search"></i>
        <input type="search" name="q" result="0" className="search-form-input" placeholder="搜索"/>
      </form>
    )
  }
}
export default Search;
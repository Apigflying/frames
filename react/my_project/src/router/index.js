//从react引入React和Component
import React, {Component} from 'react';
/*
* @params Switch 和js中的switch用法相同，在这里用来匹配路由，当匹配到一个路由的时候，不再继续向下走
* @params Route
*/
//引入react-router-dom的Route组件和Switch组件，他们都会被混入到react的Component组件中
import {Switch, Route, Redirect} from 'react-router-dom';

//引入组件
import Index from '../view/index/index';
import Book from '../view/book';
import About from '../view/about';
import User from '../view/user';
import Details from '../view/details';

class RouterIndex extends Component {
  mounted(props){
    console.log(props);
  }
  render() {
    return (
      <Switch>
        {/*
         当页面路由为‘/’的时候，重定向到/index目录 
          exact 是否严格匹配
            加上这个属性或者为true，则为严格匹配
            不加或为fasle，则为正常匹配
            
            当使用重定向的时候，需要加上exact，否则会报下面的错误：
            Warning: You tried to redirect to the same route you're currently on ：/index

        */}
        <Route path="/" exact render={() => (< Redirect to = "/index" />)}/> 
        {/* Route标签的 path 属性指定了路由的路径，component属性指定了这个路由对应的视图组件 */}
        <Route path="/index" component={Index}/>
        <Route path="/book" component={Book}/>
        <Route path="/about" component={About}/>
        <Route path="/user" component={User}/>
        <Route path="/details" component={Details}/>
      </Switch>
    )
  }
}
export default RouterIndex;
import React, {Component} from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
/*
  @待处理：懒加载
*/
import Home from 'view/home';
import About from 'view/about';
import Bar from 'view/bar';

class RouterIndex extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => (<Redirect to= "/home" />)}/> 
        <Route path="/home" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/bar" component={Bar}/>>
      </Switch>
    )
  }
}
export default RouterIndex;
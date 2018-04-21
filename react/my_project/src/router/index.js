//从react引入React和Component
import React, { Component } from "react";
/*
* @params Switch 和js中的switch用法相同，在这里用来匹配路由，当匹配到一个路由的时候，不再继续向下走
* @params Route
*/
//引入react-router-dom的Route组件和Switch组件，他们都会被混入到react的Component组件中
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes.js";
class RouterIndex extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to={routes[0].path} />} />
        {routes.map((item, index) => {
          return <Route path={item.path} render={
            e=>{
              return <item.component {...e}/>;
            }
          } key={index}/>;
        })}
      </Switch>
    );
  }
}
export default RouterIndex;

import React, { Component } from "react";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import Bar1 from "view/bar/bar1";
import Bar2 from "view/bar/bar2";
import Bar3 from "view/bar/bar3";
class Bar extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <Link to="/bar/bar1">bar1</Link>
        <Link to="/bar/bar2">bar2</Link>
        <Link to="/bar/bar3">bar3</Link>
        这里是bar页面
        <Switch>
          <Route path="/bar" exact render={() => <Redirect to="/bar/bar1" />} />
          <Route path="/bar/bar1" component={Bar1} />
          <Route path="/bar/bar2" component={Bar2} />
          <Route path="/bar/bar3" component={Bar3} />
        </Switch>
      </div>
    );
  }
}
export default Bar;

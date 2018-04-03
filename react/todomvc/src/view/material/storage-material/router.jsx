import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Zzjg from 'view/material/storage-material/page/zzjg';
import Qygl from 'view/material/storage-material/page/qygl';
import Ckgl from 'view/material/storage-material/page/ckgl';

class RouterIndex extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/material/storage-material"
          exact
          render={() => (<Redirect to="/material/storage-material/zzjg"/>)}/>
        <Route path="/material/storage-material/zzjg" component={Zzjg}/>
        <Route path="/material/storage-material/qygl" component={Qygl}/>
        <Route path="/material/storage-material/ckgl" component={Ckgl}/>
      </Switch>
    )
  }
}
export default RouterIndex;
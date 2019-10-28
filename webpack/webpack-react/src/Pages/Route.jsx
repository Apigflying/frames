import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import AsyncComponent from '@/Utils/AsyncComponent';

// import Home from '@/Pages/Home/Home';
// import NotFound from '@/Pages/NotFound/NotFound';
// import Login from '@/Pages/Login/Login';
// import Foo from '@/Pages/Foo/Foo';

const Home = AsyncComponent(()=> import('@/Pages/Home/Home'));
const Foo = AsyncComponent(()=> import('@/Pages/Foo/Foo'));
const Login = AsyncComponent(()=> import('@/Pages/Login/Login'));
const NotFound = AsyncComponent(()=> import('@/Pages/NotFound/NotFound'));

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/foo" component={Foo} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
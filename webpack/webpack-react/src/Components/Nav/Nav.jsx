import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class LayoutFull extends Component {
  render() {
    return (
      <ul>
        <nav>这里是导航</nav>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/foo">Foo</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/abc">NotFound</NavLink>
        </li>
      </ul>
    );
  }
}

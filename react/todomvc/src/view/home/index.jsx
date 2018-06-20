import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from 'store/models/login';
import 'style';
import 'style/base/base.scss';
import './home.scss';

connect(state => state.loginReducer, { userLogin })
//组件之间传递数据
class Home extends Component {
  componentDidMount () {

  }
  setNumState () {

  }
  render () {
    return (
      <main>
        <button onClick={this.userLogin}></button>
      </main>
    )
  }
}
export default Home;
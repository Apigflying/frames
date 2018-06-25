import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'style';
import 'style/base/base.scss';
import './home.scss';
import Count from './count'
import TodoList from './todoList'

//组件之间传递数据
class Home extends Component {
  // constructor(props){
  //   super(props);
  // }
  componentDidMount () {

  }
  render () {
    return (
      <main>
        <Count count={this.props.count}/>
        <hr/>
        <TodoList todos={this.props.todos}/>
      </main>
    )
  }
}
export default Home;
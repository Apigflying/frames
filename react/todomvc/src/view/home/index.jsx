import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'style';
import 'style/base/base.scss';
import './home.scss';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoVisibility from './TodoVisibility';

let todos = [{
  content:'默认内容',
  isFinish:true
}]

//组件之间传递数据
class Home extends Component {
  render () {
    return (
      <main className="TodoListWrp">
        <TodoForm className="TodoForm" />
        <TodoList className="TodoList" todos={todos} change={(index) => {
          console.log('change', index)
        }} delete={(index) => {
          console.log('delete', index)
        }} />
        <TodoVisibility className="TodoFooter" />
      </main>
    )
  }
}
export default Home;
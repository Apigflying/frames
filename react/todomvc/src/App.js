import React, {Component} from 'react';
import TodoHeader from './view/TodoHeader';
import TodoMain from './view/TodoMain';
class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [] //初始状态
    }
  }
  //----------------------EVENTS----------------------
  handlerKeyUp(e) {
    if (e.keyCode === 13) {
      let value = e.target.value;
      if (!value) 
        return;
      let newToDoItem = {
        text: value,
        isDone: false, //状态
      }
      e.target.value = '';
      this
        .state
        .todos
        .push(newToDoItem); //修改初始值
      this.setState({todos: this.state.todos}); //更新数据
    }
  }
  parentEvent(val) {
    this
      .state
      .todos
      .push(val);
    this.setState({todos: this.state.todos})
  }
  //----------------------RENDER----------------------
  render() {
    return (
      <div className="todo-input">
        <TodoHeader childCommit={this
          .parentEvent
          .bind(this)}/>
        <TodoMain getParentData={this.state.todos}/> {/* <input placeholder="请输入内容" onKeyUp={this.handlerKeyUp.bind(this)}/>
        <ul>
          {this.state.todos.map((item,index)=>{
            return <li key={index}>{item.text}</li>
          })}
        </ul> */}

      </div>
    );
  }
}

export default App;

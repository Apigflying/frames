import React, {Component} from 'react';
import TodoHeader from 'view/TodoHeader';
import TodoMain from 'view/TodoMain';
import Clock from 'view/Clock';
class App extends Component {
  constructor() {
    super();
    console.log(this.$moment().add(1, 'days').format('l'))
    this.state = {
      todos: [], //初始状态
      rootState:'初始状态',
      value: '传递给子组件'
    }
    this.asyncFn = this
      .asyncFn
      .bind(this);
    // this.parentEvent = this.parentEvent.bind(this);
    setTimeout(() => {
      console.log(2345)
    }, 0);
    this.$nextTick(() => {
      console.log(1234)
    })
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
    console.log(this);
    this.setState({
      rootState:val
    })
    // this
    //   .state
    //   .todos
    //   .push(val);
    //   console.log(this.state.todos);
    // this.setState({todos: this.state.todos,value:val.text})
  }
  sleep() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('这是传给子组件的数据')
      }, 2000);
    })
  }
  async asyncFn() {
    let text = await this.sleep();
    // this.setState((oldVal, val) => {
    //   console.log(oldVal, val);
    //   return {value: text}
    // })
    this.setState((oldval,newval)=>{
      console.log(oldval,newval);
      return {
        value:123
      }
    })
  }
  //----------------------RENDER----------------------
  render() {
    return (
      <div className="todo-input">
        <TodoHeader childCommit={this.parentEvent} {...this.state} className="abcd"/>
        <TodoMain getParentData={this.state.todos}/> {/* <input placeholder="请输入内容" onKeyUp={this.handlerKeyUp.bind(this)}/>
        <ul>
          {this.state.todos.map((item,index)=>{
            return <li key={index}>{item.text}</li>
          })}
        </ul> */}
        <Clock {...this.state} childCommit={this.parentEvent.bind(this)}/>
        <input type="button" onClick={this.asyncFn} value="点击"/>
      </div>
    );
  }
}

export default App;

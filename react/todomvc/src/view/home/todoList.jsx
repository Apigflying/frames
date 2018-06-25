import React from 'react';
import { Input, Button,Checkbox} from 'antd';
const Search = Input.Search;
export default class TodoList extends React.Component {
  constructor() {
    super();
    this.addTodos = this.addTodos.bind(this);
    this.valueChange = this.valueChange.bind(this)
    this.changeFinish = this.changeFinish.bind(this)
    this.state = {
      value: '',
      todoList: []
    }
  }
  addTodos (content) {
    let todoList = this.state.todoList;
    if (content.trim()) {
      todoList.push({
        id:+new Date(),
        content,
        isFinish:false
      })

      this.setState({
        value:'',
        todoList
      })
    }
  }
  valueChange(e){
    let value = e.target.value
    this.setState({
      value
    })
  }
  changeFinish(id){
    console.log(id);
    return (e)=>{
      let isFinish = e.target.checked;
      let todoList = this.state.todoList;
      todoList.find(item=>{
        return item.id === id;
      }).isFinish = isFinish;
      this.setState({
        todoList
      })
    }
  }
  render () {
    return (
      <div>
        <Search
          placeholder="请输入内容"
          enterButton="添加待办事项"
          size="large"
          value={this.state.value}
          onChange={this.valueChange}
          onSearch={this.addTodos}
        />
        <ul>
          {this.state.todoList.map(item => {
            return (
              <li key={item.id}>
                <Checkbox onChange={this.changeFinish(item.id)} checked={item.isFinish}>{item.content}</Checkbox>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
import React, {Component} from 'react';
//组件之间传递数据
class TodoHeader extends Component {
  handlerKeyUp(e) {
    if (e.keyCode === 13) {
      let value = e.target.value;
      if (!value) 
        return;
      let newTodoItem = {
        text: value,
        isDone: false
      };
      e.target.value = '';
      this.props.childCommit(newTodoItem);
    }
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <input onKeyUp={this.handlerKeyUp.bind(this)} placeholder="请输入内容"/>
      </div>
    )
  }
}
export default TodoHeader;
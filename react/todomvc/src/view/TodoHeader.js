import React, {Component} from 'react';
import './index.scss';

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
      console.log(this.props);
      this
        .props
        .childCommit(newTodoItem);
    }
  }
  render() {
    return (
      <div className={this.props.className}>
        <input
          onKeyUp={this
          .handlerKeyUp
          .bind(this)}
          placeholder="请输入内容"/>
      </div>
    )
  }
}
export default TodoHeader;
import React, {Component} from 'react';
//组件之间传递数据
class TodoMain extends Component {
  render() {
    let {getParentData} = this.props;
    return (
      <ul>
        {getParentData.map((item,idx)=>{
          return <li key={idx}>{item.text}</li>
        })}
      </ul>
    )
  }
}
export default TodoMain;
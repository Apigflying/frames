import React from 'react';
import { Checkbox,Button } from 'antd';
export default class TodoItem extends React.Component {
  render () {
    let { content, isFinish } = this.props;
    return (
      <li>
        <Checkbox onChange={this.props.change} defaultChecked={isFinish}/>
        {content}
        <Button onClick={this.props.delete}>删除</Button>
      </li>
    )
  }
}
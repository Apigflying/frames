import React from 'react';
import { Form, Input, Button, message, Col,Row } from 'antd';
import {addTodo} from 'store/actions/todoList.action';


export default class TodoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    }
  }
  //---事件函数
  handleSubmit = (e) => {
    e.preventDefault();
    let value = this.state.value;
    if (!value.trim()) {
      return message.warning('请填写内容后重试');
    }
    // 提交操作
    this.props.onAddClick(value)
  }
  changeValue = (e) => {
    let value = e.target.value;
    this.setState({
      value
    })
  }
  isInputValueEmpty = () => {
    return !this.state.value.trim()
  }
  render () {
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
          <Row >
          <Col span={12}>
            <Input
              placeholder="请填写待办事项"
              value={this.state.value}
              onChange={this.changeValue}
            />
          </Col>
          <Col span={8} offset={1}>
            <Button
              type="primary"
              htmlType="submit"

              disabled={this.isInputValueEmpty()}>
              添加
          </Button>
          </Col>
          </Row>
      </Form>
    )
  }
}
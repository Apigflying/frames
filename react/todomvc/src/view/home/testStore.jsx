import React, {Component} from 'react';

//组件之间传递数据
class TestStore extends Component {
  render() {
    let {value,add,reduce} = this.props;
    return (
      <main>
        {value}
        <button onClick={add}>+</button>
        <button onClick={reduce}>-</button>
      </main>
    )
  }
}
export default TestStore;
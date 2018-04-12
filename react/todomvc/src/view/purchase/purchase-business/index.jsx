import React, {Component} from 'react';
import 'style/index.scss';
import TodoList from 'components/TodoList';
//面包屑导航
class BrandMag extends Component {
  render() {
    return (
      <div>
        <TodoList />
      </div>
    )
  }
}
export default BrandMag;

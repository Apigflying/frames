import React from 'react';
import 'antd/dist/antd.css';
import 'view/public/public.scss';
import {getData} from 'api/getDatas';
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  async add () {
    let {data:{data}} = await getData();
    console.log(data);
  }
  render() {
    return (
      <div>
      <AddTodo />
    <VisibleTodoList /></div>
    )
  }
}
export default App;

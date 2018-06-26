import React from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
  render () {
    return (
      <ul>
        {
          this.props.todos.map((item, index) => {
            return (
              <TodoItem
                {...item}
                key={index}
                change={()=>{
                  this.props.change(index)
                }}
                delete={() => {
                  this.props.delete(index)
                }}
              />
            )
          })
        }
      </ul>
    )
  }
}
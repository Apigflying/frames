import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({onClick,complated,text})=>{
  return (
    <li onClick={onClick} style={{
      textDecoration:complated?'line-through':'none'
    }}>
      {text}
    </li>
  )
}
Todo.propTypes = {
  onClick:PropTypes.func.isRequired,
  complated:PropTypes.bool.isRequired,
  text:PropTypes.string.isRequired,
}
export default Todo;
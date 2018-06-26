// reudcer 负责返回初始值和更改后的
import { ADD_TODO } from '../actions/todoList.action';

var id = 1;
let init = {
  todoList: [{
    id,
    content: '',
    isFinish:false
  }]
}

export function todoListReducer (state = init, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: [...state.todoList, action.payload]
      }
    default:
      return state;
  }
}
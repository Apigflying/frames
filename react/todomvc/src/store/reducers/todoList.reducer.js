// reudcer 负责返回初始值和更改后的
import { ADD_TODOS } from '../actions/todoList.action';

let init = {
  todoList: [{
    id: 1,
    content: '',
    isFinish:false
  }]
}

export function todoListReducer (state = init, action) {
  switch (action.type) {
    case ADD_TODOS:
      return {
        ...state,
        todoList: [...state.todoList, action.payload]
      }
    default:
      return state;
  }
}
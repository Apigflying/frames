import { combineReducers } from 'redux';
import { countReducer } from './count.reducer';
import { todoListReducer } from './todoList.reducer';

const reducers = combineReducers({
  count: countReducer,
  todoList: todoListReducer
})

export default reducers;
// reudcer 负责返回初始值和更改后的
import { 
  ADD_COUNT,
  REDUCE_COUNT
} from '../actions/count.action';


export const countReducer = (state = 0, action) => {
  switch (action.type) {
    case ADD_COUNT:
      return ++state;
    case REDUCE_COUNT:
      return --state;
    default:
      return state;
  }
}
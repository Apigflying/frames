import { createStore } from 'redux';
// import reducers from './reducers/index.reducer';
const reducers = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const store = createStore(reducers);

export default store;


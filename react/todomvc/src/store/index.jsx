import {createStore} from 'redux';
const counter = (state = 0,action) => {
  switch(action.type){
    case 'add':
    return ++state;
    case 'reduce':
    return --state;
    default:
    return state;
  }
}
let store = createStore(counter);

store.subscribe(()=>{
  console.log(store.getState());
})

export default store;
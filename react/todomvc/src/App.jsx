import React from 'react';
// import PublicHeader from 'view/public/PublicHeader';
// import RouterIndex from 'router/index';
// import PublicAside from 'view/public/PublicAside';

import 'antd/dist/antd.css';
import 'view/public/public.scss';
import { createStore, combineReducers } from 'redux'

// 用于判断action的type
const ADD_CARD = 'ADD_CARD';

// 定义初始状态
const initCartList = {
  cards: [{
    product: 'bread 700g',
    quantity: 2,
    unitCost: 90
  },
  {
    product: 'milk 500ml',
    quantity: 1,
    unitCost: 47
  }]
}
// reducer纯函数,会返回默认的state(即初始状态)
const productReducer = (state = [], action) => {
  return state
}
const cartReducer = (state = initCartList, action) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload]
      };
    default:
      return state;
  }
}

// 整合多个reducer，store.getState() 返回的就是当前的(初始或者更新后的)state
const reducers = combineReducers({
  carts:cartReducer, productReducer
})

// action提交到reducer的数据，封装一层
const addToCart = (product,quantity,unitCost) => {
  return {
    type:ADD_CARD,
    payload:{
      product,quantity,unitCost
    }
  }
}
/*
  创建store实例，该实例有以下方法：
    dispatch - 通过store.dispatch(action) 来更新state数据
    getState - 获取更新后reducer数据
    subscribe - 监听数据变化，当数据变化时，触发该函数
    replaceReducer
*/ 


const store = createStore(reducers);

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
console.log("initial state: ", store);

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      a: 123
    }
  }
  add () {
    store.dispatch(addToCart('Coffee 500gm', 1, 250));
    unsubscribe();
  }
  reduce () {
    console.log('reduce');

  }
  //----------------------RENDER----------------------
  render () {
    return (
      <div className="App">
        <button onClick={this.add}>+</button>
        <button onClick={this.reduce}>-</button>
      </div>
    );
  }
}
export default App;

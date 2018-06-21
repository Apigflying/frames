import {combineReducers} from 'redux';
import {cardsReducer} from './cards.reducer';
import {shoppingReducer} from './shopping.reducer';

const reducers = combineReducers({
  cards:cardsReducer,
  shopping:shoppingReducer
})

export default reducers;
import { createStoe } from 'redux';
import reducers from './reducers/index.reducer';

const store = createStoe(reducers);
export default store;


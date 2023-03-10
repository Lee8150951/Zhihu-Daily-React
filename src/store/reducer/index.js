import { combineReducers } from 'redux';
import baseReducer from './base';
import storeReducer from './store';

// 合并Reducer
const reducer = combineReducers({
  base: baseReducer,
  store: storeReducer
});

export default reducer;
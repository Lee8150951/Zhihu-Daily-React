/* 该Reducer用于存储收藏信息 */
import * as TYPES from '../action-types';
import _ from '../../assets/utils';

// 配置初始信息
let initial = {
  info: null
};

export default function storeReducer(state = initial, action) {
  state = _.clone(state);
  switch (action.type) {
    // 获取收藏列表
    case TYPES.STORE_LIST:
      state.list = action.list;
      break;
    case TYPES.STORE_REMOVE:
      if (Array.isArray(state.list)) {
        state.list = state.list.filter(item => {
          return +item.id !== +action.id;
        });
      }
      break;
    default:
  }
  return state
};
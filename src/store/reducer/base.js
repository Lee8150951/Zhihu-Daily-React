/* 该Reducer用于存储用户登录信息 */
import * as TYPES from '../action-types';
import _ from '../../assets/utils';

// 配置初始信息
let initial = {
  info: null
};

export default function baseReducer(state = initial, action) {
  state = _.clone(state);
  switch (action.type) {
    default:
  }
  return state
};
/* 该Reducer用于存储收藏信息 */
import * as TYPES from '../action-types';
import _ from '../../assets/utils';

// 配置初始信息
let initial = {
    info: null
};

export default function storeReducer(state=initial, action) {
    state = _.clone(state);
    switch (action.type) {
        default:
    }
    return state
};
/* 配置登录信息相关action */
import * as TYPES from '../action-types';
import api from '../../api';

const baseAction = {
  // 异步获取登录这信息，完成派发
  async queryUserInfoAsync() {
    let info = null;
    try {
      let { code, data } = await api.queryUserInfo();
      if (+code === 0) {
        info = data;
      }
    } catch (_) {}
    return {
      type: TYPES.BASE_INFO,
      info: info
    };
  },

  // 清除登录者信息
  clearUserInfo() {
    return {
      type: TYPES.BASE_INFO,
      info: null
    };
  }
};

export default baseAction;
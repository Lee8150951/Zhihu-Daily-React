/* API处理 */
import http from './http';

// 获取今日新闻 & 轮播图信息
const queryNewsLatest = () => {
  return http.get('/api/news_latest');
};

// 获取往日新闻信息
const queryNewsBefore = (time) => {
  return http.get('/api/news_before', {
    params: {
      time
    }
  });
};

// 获取新闻详细信息
const queryNewsInfo = (id) => {
  return http.get('/api/news_info', {
    params: {
      id
    }
  });
};

// 获取新闻点赞信息
const queryStoryExtra = (id) => {
  return http.get('/api/story_extra', {
    params: {
      id
    }
  });
};

// 发送验证码
const sendPhoneCode = (phone) => {
  return http.post('/api/phone_code', {
    phone
  });
};

// 登录或注册
const login = (phone, code) => {
  return http.post('/api/login', {
    phone,
    code
  });
};

// 获取用户信息
const queryUserInfo = () => {
  return http.get('/api/user_info');
};

// 收藏
const store = (newsId) => {
  return http.post('/api/store', { newsId });
};

// 移除收藏
const storeRemove = (id) => {
  return http.get('/api/store_remove', {
    params: { id }
  });
};

// 获取收藏列表
const storeList = () => {
  return http.get('/api/store_list');
}

// 暴露API
const api = {
  queryNewsBefore,
  queryNewsLatest,
  queryStoryExtra,
  queryNewsInfo,
  sendPhoneCode,
  login,
  queryUserInfo,
  store,
  storeRemove,
  storeList
};

export default api
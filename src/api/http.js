import _ from '../assets/utils';
import qs from 'qs';
import { Toast } from 'antd-mobile';
import axios from 'axios';

// 配置默认请求路径
let baseURL;
if (process.env.NODE_ENV === 'development') {
  // 开发、测试环境
  baseURL = 'http://localhost:3000';
} else if (process.env.NODE_ENV === 'production') {
  // 正式环境
  baseURL = 'http://localhost:3000';
}
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// 创建axios实例
const Axios = axios.create({
  baseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
});

// 拦截器配置
Axios.interceptors.request.use(config => {
  let token = _.storage.get('tk'),
    safeList = ['/user_info', '/user_update', '/store', '/store_remove', '/store_list'],
    url = config.url;
  if (token) {
    let reg = /\/api(\/[^?#]+)/,
      [, $1] = reg.exec(url) || [];
    let isSafe = safeList.some(item => {
      return $1 === item;
    });
    if (isSafe) {
      config.headers.Authorization = token;
    }
  }
  return config;
}, err => {
  return Promise.reject(err);
});

// 请求方法
const request = function (url, config, method) {
  return new Promise((resolve, reject) => {
    if (method === 'get') {
      let { params } = { ...config };
      Axios.get(url, params)
        .then(
          res => {resolve(res.data)},
          err => {
            reject(err);
            Toast.show({
              icon: 'fail',
              content: '网络繁忙,请稍后再试!',
            });
          }
        )
        .catch((err) => {
          reject(err);
          Toast.show({
            icon: 'fail',
            content: '网络繁忙,请稍后再试!',
          });
        });
    } else if (method === 'post') {
      Axios.post(url, config)
        .then(
          res => {resolve(res.data)},
          err => {
            reject(err);
            Toast.show({
              icon: 'fail',
              content: '网络繁忙,请稍后再试!',
            });
          }
        )
        .catch((err) => {
          reject(err);
          Toast.show({
            icon: 'fail',
            content: '网络繁忙,请稍后再试!',
          });
        })
    }
  });
};

const http = {
  post: (url, params) => {
    params = qs.stringify(params);
    return request(url, params, 'post');
  },
  get: (url, params) => {
    return request(url, { params }, 'get');
  },
};
export default http;
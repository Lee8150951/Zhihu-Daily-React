import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import reducer from './reducer';

// 根据不同环境使用不同的中间件
let middleware = [reduxThunk, reduxPromise],
    env = process.env.NODE_ENV;

// 开发环境下需要使用reduxLogger进行日志分析
// 通过判断调用scripts/build.js或scripts/start.js获得当前的环境
if (env === "development") {
    middleware.push(reduxLogger)
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

export default store;
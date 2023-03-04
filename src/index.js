import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// REM配置
import 'lib-flexible';

// 样式
import './assets/reset.min.css'
import './index.less'

// 处理最大宽度
(function () {
    const handleMax = () => {
        let html = document.documentElement,
            root = document.getElementById('root'),
            deviceW = html.clientWidth;
        root.style.maxWidth = '750px';
        if (deviceW >= 750) {
            html.style.fontSize = '75px';
        }
    };
    handleMax();
    window.addEventListener('resize', handleMax);
})()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <div className="box">
          Hello World
      </div>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

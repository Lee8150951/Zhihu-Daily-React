import React from "react";
import './App.css';
import { HashRouter } from 'react-router-dom';
import RouterView from "./router";
import { KeepAliveProvider } from 'keepalive-react-component';

// 全局样式
import './index.less';

function App() {
  return (
    <HashRouter>
      <KeepAliveProvider>
        <RouterView/>
      </KeepAliveProvider>
    </HashRouter>
  );
};

export default App;
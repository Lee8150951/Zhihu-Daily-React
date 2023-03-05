import React from "react";
import './App.css';
import { HashRouter } from 'react-router-dom';
import RouterView from "./router";

// 全局样式
import './index.less';

function App() {
  return (
    <HashRouter>
      <RouterView/>
    </HashRouter>
  );
};

export default App;
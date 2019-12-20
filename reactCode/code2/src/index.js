import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.scss'
import axios from 'axios'
// 配置路由基
axios.defaults.baseURL = 'http://localhost:8765';
// 添加前置拦截器
axios.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token')
    if(token !== null){
        config.headers.Authorization='Bearer '+token
    }
    return config;
  })
ReactDOM.render(<App />, document.getElementById('root'));
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import axios from "axios";
import base from "./base"; //引入基础路径

const request = axios.create({
  baseURL: base.baseURL,
  timeout: 5000,
});

//请求拦截器
request.interceptors.request.use(
  (config) => {
    nprogress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
request.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
// export function request(config) {

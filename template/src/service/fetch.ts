import axios from 'axios';
import { message } from 'antd';
import intl from 'react-intl-universal';


const headers: any = {
  'Client-Type': 'PC',
};

const fetch = axios.create({
  baseURL: '/',
  headers,
  withCredentials: true,
});
// 添加请求拦截器
fetch.interceptors.request.use(
  (config: any) => {

    return config;
  },
  error =>
    // 对请求错误做些什么
    Promise.reject(error),
);

// 添加响应拦截器
fetch.interceptors.response.use(
  response => {
    let data: any = response.data;
    if (data.code) {
      if ([200].includes(data.code)) {
        // 正常请求返回
      } else {
        // 其它报错
        message.warning(
          intl.get(`${data.code}`) || data.msg || intl.get('newWorkError'),
        );
      }
    }
    return data;
  },
  error => {
    const { data } = error.response || {};
    if (data) {
      message.warning(intl.get('newWorkError'));
      // 为了不被阻断
      return Promise.resolve(data);
    }
    return Promise.reject(error);
  },
);

export default fetch;

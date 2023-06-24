import axios from 'axios';

// 创建axios实例对象，定义基础配置
const server = axios.create({
    baseURL: 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api',
    timeout: 5000,
});

// 请求拦截器
server.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token')
    }
    return config;
}, (err) => {
    console.log('请求失败');
    return Promise.reject(err);
});

// 响应拦截器
server.interceptors.response.use((res) => {
    const code: number = res.data.data.code || res.data.code;
    if(code!=200){
        return Promise.reject(res.data);
    }
    return res.data;
}, (err) => {
    console.log('响应失败');
    return Promise.reject(err);
});

export default server;
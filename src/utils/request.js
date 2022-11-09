/*
 * @Author: new-wang
 * @Date: 2022-11-09 16:33:30
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-09 18:12:08
 * @Description:  axios 封装网络请求 ts项目使用 axios-mapper
 */
import axios from 'axios';
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from 'vue-router';
const TOKEN_KEY = 'USER_TOKEN';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
    (config) => {
        // 指定请求令牌
        // if (store.getters.token) {
        // // 自定义令牌的字段名为X-Token，根据咱们后台再做修改
        // config.headers["X-Token"] = store.getters.token;
        // }
        const token = window.localStorage.getItem(TOKEN_KEY)
        // 设置url白名单
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
            // config.headers.common['Authorization'] = 'Bearer ' + token
        }
        return config;
    },
    (error) => {
        // 请求错误的统一处理
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// 响应拦截
service.interceptors.response.use(
    /**
     * 通过判断状态码统一处理响应，根据情况修改
     * 同时也可以通过HTTP状态码判断请求结果
     * token管理和路由跳转
     * 根据个人情况设置
     */
    (response) => {
        let { data, config } = response;
        // 也可以写在login的逻辑里
        if (data.code === 2000) {
            if (config.url === '/api/user/login') {
                localStorage.setItem(TOKEN_KEY, data.data.token)
            }
        }
        // 如果状态码不是20000则认为有错误
        if (data.code !== 20000) {
            ElMessage.error({
                message: res.msg || res.error || "Error",
                duration: 5 * 1000,
            });

            // 50008: 非法令牌; 50012: 其他客户端已登入; 50014: 令牌过期;
            if (data.code === 50008 || data.code === 50012 || data.code === 50014) {
                // 重新登录
                ElMessageBox.confirm("您已登出/登录过期, 请重新登录", "确认", {
                    confirmButtonText: "重新登录",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    localStorage.removeItem(TOKEN_KEY)
                    const router = useRouter()
                    router.replace({
                        path: '/redirect/login'
                    })
                });
            }
            // return Promise.reject(new Error(res.message || "Error"));
        }
        return data
    },
    (error) => {
        console.log("err" + error); // for debug
        ElMessage({
            message: error.message,
            type: "error",
            duration: 5 * 1000,
        });
        // return Promise.reject(error);
    }
);


export default service
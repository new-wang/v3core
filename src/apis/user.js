/*
 * @Author: new-wang
 * @Date: 2022-11-09 17:23:32
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-09 18:08:14
 * @Description: 用户相关接口
 */
import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
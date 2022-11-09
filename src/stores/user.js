/*
 * @Author: new-wang
 * @Date: 2022-11-09 17:26:51
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-09 18:12:40
 * @Description: 
 */
import { defineStore } from 'pinia'
import { login, logout, getInfo } from '@/apis/user'

export const userStore = defineStore('user', {
    state: () => ({
        token: ''
    }),
    actions: {
        login(userInfo) {
            return new Promise((resolve,reject) => {
                login(userInfo).then(()=>{
                    resolve();
                }).catch(error=>{
                    reject(error)
                })
            })
            // .catch(({ message })=>{
            //     console.log('err :>> ', message);
            // })
        },
    }
})
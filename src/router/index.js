import { createRouter, createWebHistory } from 'vue-router'
import Layout from "layouts/index.vue";

import attendance from './modules/attendance'

import HomeView from '../views/HomeView.vue'



/**
 * Note: 子菜单仅当路由的children.length >=1 才显示
 * 
 * hidden ：Boolear 
 */
export const routes = [
  {
    path: '/',
    redirect:'/home',
    component: Layout,
    meta:{
      title:'',
      icon:''
    },
    children:[
      {
        path:'home',
        component: ()=> import('views/HomeView.vue')
      }
    ]
  },
  attendance
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
  // : [
    
  //   // {
  //   //   path: '/about',
  //   //   name: 'about',
  //   //   // route level code-splitting
  //   //   // this generates a separate chunk (About.[hash].js) for this route
  //   //   // which is lazy-loaded when the route is visited.
  //   //   component: () => import('../views/AboutView.vue')
  //   // }
  // ]
})

export default router

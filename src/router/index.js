import { createRouter, createWebHistory } from 'vue-router'
import Layout from "layouts/index.vue";

import attendance from './modules/attendance'

import HomeView from '../views/HomeView.vue'



/**
 * Note: 子菜单仅当路由的children.length >=1 才显示
 * 
 * hidden ：false                  if set true, item will not show in the sidebar(default is false)     sidebar
 * redirect: noRedirect            if set noRedirect will no redirect in the breadcrumb                 breadcrumb
 * meta:{
 *    title: 'title'               the name show in sidebar and breadcrumb (recommend set)              breadcrumb sidebar
 *    icon: 'svg-name'             the icon show in the sidebar                                         sidebar
 *    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)    breadcrumb
 *    affix: true                  if set true, the tag will affix in the tags-view                     tags-view
 * }
 */
export const routes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    hidden: true
  },
  {
    path: '/',
    redirect:'/home',
    component: Layout,
    meta:{
      title:'首页',
      icon:''
    },
    children:[
      {
        path:'home',
        name:'home',
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

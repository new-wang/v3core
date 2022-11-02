import { defineStore } from 'pinia'

export const permissionStore = defineStore('permission', {
  state:()=>({
    routes:[],
    addRoutes: []
  }),
  actions:{
    
  },
})
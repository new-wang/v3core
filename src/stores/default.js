import { defineStore } from 'pinia'

export const defaultStore = defineStore('app', {
  state:()=>({
    device:'desktop',
    sidebar:{
      opened:true
    }
  }),
  actions:{
    toggleSideBar() {
        this.sidebar.opened = !this.sidebar.opened;
    },
  },
})
import { defineStore } from 'pinia'

export const tagsViewStore = defineStore('tagsView', {
  state:()=>({
    visitedViews:[],
    cachedViews:[]
  }),
  actions:{
    addVisitedView(view){
        if(this.visitedViews.some(v=>v.path === view.path)) return
        this.visitedViews.push(Object.assign({},view,{
            title:view.meta.title || 'no-name'
        }))
    },
    addCachedView(view){
        if (this.cachedViews.includes(view.name)) return
        if (!view.meta.noCache) {
            this.cachedViews.push(view.name)
        }
    },
    addView(view){
        this.addVisitedView(view)
        this.addCachedView(view)
    },
    delVisitedView(view){
        return new Promise(resolve=>{
            for (const [i,v] of this.visitedViews.entries()) {
                if(v.path === view.path){
                    this.visitedViews.splice(i,1)
                    break
                }
            }
            resolve([...this.visitedViews])
        })
    },
    delCachedView(view){
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
    },
    delView(view){
        return new Promise(async resolve=>{
            await this.delVisitedView(view)
            await this.delCachedView(view)
            resolve({
                visitedViews:[...this.visitedViews],
                cachedViews:[...this.cachedViews]
            })
        })
    },
    delOthersView(view){
        return new Promise(async resolve=>{
            await this.delOthersVisitedViews(view)
            await this.delOthersCachedViews(view)
            resolve({
                visitedViews:[...this.visitedViews],
                cachedViews:[...this.cachedViews]
            })
        })
    },
    delOthersVisitedViews(view){
        return new Promise(resolve=>{
            this.DEL_OTHERS_VISITED_VIEWS(view)
            resolve([...this.visitedViews])
        })
    },
    delOthersCachedViews(view){
        return new Promise(resolve=>{
            this.DEL_OTHERS_CACHED_VIEWS(view)
            resolve([...this.cachedViews])
        })
    },
    updateVisitedView(view){
        for (let v of this.visitedViews) {
            if (v.path === view.path) {
              v = Object.assign(v, view)
              break
            }
        }
    },
    DEL_OTHERS_VISITED_VIEWS(view){
        this.visitedViews = this.visitedViews.filter(v => {
          return v.meta.affix || v.path === view.path
        })
    },
    DEL_OTHERS_CACHED_VIEWS(view){
        const index = this.cachedViews.indexOf(view.name)
        if (index > -1) {
            this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
        // if index = -1, there is no cached tags
            this.cachedViews = []
        }
    }
  },
})
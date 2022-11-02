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
    }
  },
})
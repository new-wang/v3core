<template>
    <div id="tags-view-container" class="tags-view-container">
        <el-scrollbar class="tags-view-wrapper">
            <el-tag v-for="tag in visitedViews"
            :key="tag.name"
            :closable ="!isAffix(tag)?true:false"
            class="mx-1" 
            :class="isActive(tag)?'active':''"
            :type="isActive(tag)?'':'info'"
            @click="toRoute(tag)"
            @close="!isAffix(tag)?closeSelectedTag(tag):''"
            >
                {{ tag.title }}
            </el-tag>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { tagsViewStore } from 'stores/tagsView.js'
import { permissionStore } from 'stores/permission.js'
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import path from 'path';

const route = useRoute()
const router = useRouter()
const permitStore = permissionStore()
const tagsStore = tagsViewStore()
const visitedViews = computed(()=>tagsStore.visitedViews)
const permitRoutes = computed(()=>permitStore.routes)
const isActive = (croute) => croute.path === route.path
const isAffix = (tag) => tag.meta && tag.meta.affix

const toLastView = (visitedViews,view)=>{
    const latestView = visitedViews.slice(-1)[0]
    console.log('latestView :>> ', latestView);
    if(latestView){
        toRoute(latestView)
    }else{
        if(view.name === 'home'){
            // reload home page
            // router.replace({
            //     path:'/redirect' + view.fullPath
            // })
        }else{
            router.push('/')
        }
    }
}

const closeSelectedTag = (tagview)=>{
    tagsStore.delView(tagview).then(({ visitedViews })=>{
        if(isActive(tagview)){
            toLastView(visitedViews,tagview)
        }
    })
}
const addTags = ()=>{
    const { name }  = route
    if(name){
        tagsStore.addView(route)
    }
}
const handleTag = ()=>{
    addTags()
}
const filterAffixTags = (routes,basepath)=>{
    let tags = []
    routes.forEach(proute => {
        if(proute.meta && proute.meta.affix){
            const tagPath = path.resolve(basepath,proute.path)
            tags.push(
                {
                    fullPath:tagPath,
                    path:tagPath,
                    name:proute.name,
                    meta:{ ...proute.meta }
                }
            )
        }
        if(proute.children){
            const tempTags = filterAffixTags(proute.children,proute.path)
            if(tempTags.length >=1){
                tags = [...tags, ...tempTags]
            }
        }
    })
    return tags
}
const initTags = ()=>{
    const affixTags = filterAffixTags(permitRoutes.value)
    for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
            tagsStore.addVisitedView(tag)
        }
    }
}
const isCurrent = (tag)=>{
    const current = router.currentRoute.value
    return tag.path === current.path
}
const toRoute = (tag)=>{
    if(isCurrent(tag)) return
    router.push({
        fullpath:tag.fullPath,
        path:tag.path,
        name:tag.name,
        query: {
          ...tag.query,
        },
        params:{
            ...tag.params
        }
    })
}
initTags()
addTags()
watch(route,handleTag)
</script>

<style lang="scss" scoped>
.tags-view-container {
    .mx-1 {
        margin: 0 0.25rem;
    }
}
</style>
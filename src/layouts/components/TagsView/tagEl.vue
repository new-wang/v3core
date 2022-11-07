<!--
 * @Description: 使用el-tag 定义标签
 * @Author: WX
 * @Date: 2022-11-04 14:46
 * @LastEditors: WX
 * @LastEditTime: 2022-11-07 16:51
-->
<template>
    <div id="tags-view-container" class="tags-view-container" ref="tagContainerRef">
        <scroll-pane class="tags-view-wrapper" ref="scrollPaneRef">
            <el-tag v-for="tag in visitedViews" :key="tag.name" :closable="!isAffix(tag) ? true : false"
                class="mx-1 tags-view-item" :class="isActive(tag) ? 'active' : ''" :type="isActive(tag) ? '' : 'info'"
                @click="toRoute(tag)" @contextmenu.prevent.native="openMenu(tag, $event)"
                @close="!isAffix(tag) ? closeSelectedTag(tag) : ''" :ref="setTagRef" :to="tag">
               <!-- @click.right.native = "openMenu"  -->
                {{ tag.title }}
            </el-tag>
        </scroll-pane>
        <ul v-show="menu.visible" :style="{ left: menu.left + 'px', top: menu.top + 'px' }" class="contextmenu">
            <li @click="refreshSelectedTag(menu.selectedTag)">刷新</li>
            <li v-if="!isAffix(menu.selectedTag)" @click="closeSelectedTag(menu.selectedTag)">关闭当前</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li>全部关闭</li>
        </ul>
    </div>
</template>

<script setup>
import ScrollPane from './ScrollPaneForEl.vue'
import { tagsViewStore } from 'stores/tagsView.js'
import { permissionStore } from 'stores/permission.js'
import { computed, watch, reactive, ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import path from 'path';

// import { getCurrentInstance } from 'vue'; 
// let { proxy } = getCurrentInstance()
// 获取当前组件实例 tagContainerRef.value  proxy.$el

const route = useRoute()
const router = useRouter()
const permitStore = permissionStore()
const tagsStore = tagsViewStore()
const visitedViews = computed(() => tagsStore.visitedViews)
const permitRoutes = computed(() => permitStore.routes)
const isActive = (croute) => croute.path === route.path
const isAffix = (tag) => tag.meta && tag.meta.affix
const tagContainerRef = ref(null)
const tagRefs = []
const setTagRef = (el) => {
    if(!tagRefs.includes(el)){
        tagRefs.push(el)
    }
}
nextTick(()=>{
    console.log('tagRefs11 :>> ', tagRefs);
})
const scrollPaneRef = ref(null)

const menu = reactive({
    visible: false,
    left: 0,
    top: 0,
    selectedTag: {}
})

const openMenu = (tag, e) => {
    menu.visible = true
    const menuMinWidth = 105
    const offsetLeft = tagContainerRef.value.getBoundingClientRect().left // container margin left
    const offsetWidth = tagContainerRef.value.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right
    if (left > maxLeft) {
        menu.left = maxLeft
    } else {
        menu.left = left
    }
    menu.top = e.clientY
    menu.visible = true
    menu.selectedTag = tag
}
const closeMenu = () => {
    menu.visible = false
}

const refreshSelectedTag = async (view) => {
    await tagsStore.delCachedView(view)
    const { fullPath } = view
    nextTick(() => {
        router.replace({
            path: '/redirect' + fullPath
        }).catch(err => {
            console.warn(err)
        })
    })
}

const moveToCurrentTag = () => {
    nextTick(() => {
        if(tagRefs === null || tagRefs === undefined || !Array.isArray(tagRefs)){
            return;
        }
        for (const tag of tagRefs) {
            if(!tag) return
            const { to } = tag.$attrs
            if (to.path === route.path) {
                scrollPaneRef.value.moveToTarget(tag)
                // when query is different then update

                if (to.fullPath !== route.fullPath) {
                    tagsStore.updateVisitedView(route)
                }
                break
            }
        }
    })
}

const closeOthersTags = async () => {
    router.push(menu.selectedTag)
    await tagsStore.delOthersView(menu.selectedTag)
    moveToCurrentTag()
}

const toLastView = (visitedViews, view) => {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
        toRoute(latestView)
    } else {
        if (view.name === 'home') {
            // reload home page
            router.replace({
                path: '/redirect' + view.fullPath
            })
        } else {
            router.push('/')
        }
    }
}

const closeSelectedTag = (tagview) => {
    tagsStore.delView(tagview).then(({ visitedViews }) => {
        if (isActive(tagview)) {
            toLastView(visitedViews, tagview)
        }
    })
}
const addTags = () => {
    const { name } = route
    if (name) {
        tagsStore.addView(route)
    }
}
const handleTag = () => {
    addTags()
    moveToCurrentTag()
}
const filterAffixTags = (routes, basepath) => {
    let tags = []
    routes.forEach(proute => {
        if (proute.meta && proute.meta.affix) {
            const tagPath = path.resolve(basepath, proute.path)
            tags.push(
                {
                    fullPath: tagPath,
                    path: tagPath,
                    name: proute.name,
                    meta: { ...proute.meta }
                }
            )
        }
        if (proute.children) {
            const tempTags = filterAffixTags(proute.children, proute.path)
            if (tempTags.length >= 1) {
                tags = [...tags, ...tempTags]
            }
        }
    })
    return tags
}
const initTags = () => {
    const affixTags = filterAffixTags(permitRoutes.value)
    for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
            tagsStore.addVisitedView(tag)
        }
    }
}
const isCurrent = (tag) => {
    const current = router.currentRoute.value
    return tag.path === current.path
}
const toRoute = (tag) => {
    if (isCurrent(tag)) return
    router.push({
        fullpath: tag.fullPath,
        path: tag.path,
        name: tag.name,
        query: {
            ...tag.query,
        },
        params: {
            ...tag.params
        }
    })
}

defineExpose({
    tagRefs
})
initTags()
addTags()
watch(route, handleTag)

watch(() => menu.visible, (value) => {
    if (value) {
        document.body.addEventListener('click', closeMenu)
    } else {
        document.body.removeEventListener('click', closeMenu)
    }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
    height: 34px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            margin-top: 4px;

            &:first-of-type {
                margin-left: 15px;
            }

            &:last-of-type {
                margin-right: 15px;
            }
        }
    }

    .mx-1 {
        margin: 0 0.25rem;
    }

    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;

            &:hover {
                background: #eee;
            }
        }
    }
}
</style>
<!--
 * @Author: new-wang
 * @Date: 2022-11-07 15:45:03
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 10:42:22
 * @Description: 标签页
-->

<template>
    <div id="tags-view-container" class="tags-view-container" ref="tagContainerRef">
        <scroll-pane class="tags-view-wrapper" ref="scrollPaneRef">
            <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag) ? 'active' : ''"
                :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" class="tags-view-item mx-1"
                @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''" @contextmenu.prevent="openMenu(tag, $event)">
                {{ tag.meta.title }}
                <el-icon v-if="!isAffix(tag)" class="el-icon-close">
                    <Close @click.prevent.stop="closeSelectedTag(tag)" />
                </el-icon>
            </router-link>
        </scroll-pane>
        <ul v-show="menu.visible" :style="{ left: menu.left + 'px', top: menu.top + 'px' }" class="contextmenu">
            <li @click="refreshSelectedTag(menu.selectedTag)">刷新</li>
            <li v-if="!isAffix(menu.selectedTag)" @click="closeSelectedTag(menu.selectedTag)">关闭当前</li>
            <li @click="closeOthersTags">关闭其他</li>
            <li @click="closeAllTags(menu.selectedTag)">全部关闭</li>
        </ul>
    </div>
</template>

<script setup>
import ScrollPane from './ScrollPane.vue'
import { tagsViewStore } from 'stores/tagsView.js'
import { permissionStore } from 'stores/permission.js'
import { computed, watch, reactive, ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import path from 'path';

import { getCurrentInstance } from 'vue';
let { proxy } = getCurrentInstance()
// 获取当前组件实例 tagContainerRef.value  proxy.$el
console.log('proxy :>> ', proxy);
const route = useRoute()
const router = useRouter()
const permitStore = permissionStore()
const tagsStore = tagsViewStore()
const visitedViews = computed(() => tagsStore.visitedViews)
const permitRoutes = computed(() => permitStore.routes)
const isActive = (croute) => croute.path === route.path
const isAffix = (tag) => tag.meta && tag.meta.affix
const tagContainerRef = ref(null)
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
    const tags = proxy.$refs.tag
    nextTick(() => {
        if (tags === null || tags === undefined || !Array.isArray(tags)) {
            return;
        }
        for (const tag of tags) {
            const { to } = tag
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

const closeAllTags = async (view) => {
    const { visitedViews } = await tagsStore.delAllViews()
    const affixTags = filterAffixTags(permitRoutes.value)
    if (affixTags.some(tag => tag.path === view.path)) {
        return
    }
    toLastView(visitedViews, view)
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
            text-decoration: none;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            border-radius: 3px;
            color: #495060;
            background: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;

            &:first-of-type {
                margin-left: 15px;
            }

            &:last-of-type {
                margin-right: 15px;
            }

            &.active {
                background-color: #58c1e4f3;
                color: #fff;
                border-color: #58c1e4f3;

                &::before {
                    content: '';
                    background: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }

            .el-icon-close {
                width: 16px;
                height: 16px;
                vertical-align: -1px;
                border-radius: 50%;
                text-align: center;
                transition: all .3s cubic-bezier(.645, .045, .355, 1);
                transform-origin: 100% 50%;

                &:before {
                    transform: scale(.6);
                    display: inline-block;
                    vertical-align: -3px;
                }

                &:hover {
                    background-color: #b4bccc;
                    color: #fff;
                }
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
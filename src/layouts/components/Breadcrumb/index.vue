<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key = "index">
                <span
                    v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                    class = "no-redirect"
                > 
                    {{ item.meta.title }} 
                </span>
                <a v-else @click.prevent = "handleClick(item)">
                    {{ item.meta.title }}
                </a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup>
import { compile } from 'path-to-regexp'
import { ref,watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const levelList = ref(null);
const router = useRouter();
const route = useRoute();
const getBreadcrumb = ()=>{
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith('/redirect/')) {
        return
    }
    // only show routes with meta.title
    let matched = route.matched.filter((item) => item.meta && item.meta.title);
    const first = matched[0];
    if(!isFirst(first)){
        matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
    }

    levelList.value = matched.filter((item) => item.meta && item.meta.breadcrumb !== false );
}
const isFirst = ()=>{
    // 判断是否首页
    const name = route && route.name;
    if (!name) {
        return false
    }
    return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
}
const handleClick = (item) => {
    const { redirect,path } = item;
    if(redirect){
        router.push(redirect);
        return;
    }
    router.push(pathCompile(path));
}
const pathCompile = (path) => {
    let toPath = compile(path);
    return toPath(route.params)
}

getBreadcrumb()
watch(route,getBreadcrumb)
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
}
</style>
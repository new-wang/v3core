<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key = "index">
                <span> {{ item.meta.title }} </span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup>
import { ref,watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const levelList = ref(null);
const router = useRouter();
const route = useRoute();
const getBreadcrumb = ()=>{
    let matched = route.matched.filter((item) => item.meta && item.meta.title);
    // const first = matched[0];

    levelList.value = matched.filter((item) => item.meta && item.meta.breadcrumb !== false );
}
getBreadcrumb()
watch(route,getBreadcrumb)
console.log('router :>> ', router);
console.log('route :>> ', route);

</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
}
</style>
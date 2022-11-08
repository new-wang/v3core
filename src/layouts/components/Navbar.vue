<!--
 * @Author: new-wang
 * @Date: 2022-10-25 10:43:36
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 10:46:41
 * @Description: 顶部导航
-->

<template>
    <div class="navbar">
        <hamburger class="hamburger-container" :is-active="sidebar.opened" @toggleClick="toggleSideBar"></hamburger>

        <breadcrumb class="breadcrumb-container" />

        
    </div>
</template>

<script setup>
import Hamburger from './Hamburger/index.vue'
import Breadcrumb from './Breadcrumb/index.vue'
import { defaultStore } from 'stores/default.js'
const dstore = defaultStore();
const sidebar = dstore.sidebar;
// const device = dstore.device;
const toggleSideBar =() => {
    dstore.toggleSideBar()
}


</script>

<style lang="scss" scoped>
.navbar{
    height: 50px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    .hamburger-container{
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }
}
</style>
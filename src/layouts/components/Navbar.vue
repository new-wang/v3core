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
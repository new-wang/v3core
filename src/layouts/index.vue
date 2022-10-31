<template>
    <div class="app-wrapper">
        
        <!-- 侧边栏 -->
        <sidebar class="sidebar-container"></sidebar>

        <div class="main-container">
            <!-- 顶部导航栏 -->
            <navbar></navbar>

            <!-- 内容区 -->
            <app-main></app-main>
        </div>
    </div>
</template>

<script setup>
import AppMain from 'layouts/components/AppMain.vue'
import Navbar from 'layouts/components/Navbar.vue'
import Sidebar from 'layouts/components/Siderbar/index.vue'

</script>

<style lang="scss" scoped>

</style>
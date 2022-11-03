<template>
    <div class="app-wrapper" :class="classObj">
        
        <!-- 侧边栏 -->
        <sidebar class="sidebar-container"></sidebar>

            

        <div class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <!-- 顶部导航栏 -->
                <navbar></navbar>
                <tags-view></tags-view>
            </div>

            <!-- 内容区 -->
            <app-main></app-main>
        </div>
    </div>
</template>

<script setup>
import AppMain from 'layouts/components/AppMain.vue'
import Navbar from 'layouts/components/Navbar.vue'
import TagsView from 'layouts/components/TagsView/index.vue'
import Sidebar from 'layouts/components/Siderbar/index.vue'
import { reactive,computed } from 'vue';
import { defaultStore } from 'stores/default.js'
import { storeToRefs } from "pinia";
import { settingsStore } from 'stores/settings.js';
const dstore = defaultStore() 
const { sidebar } = storeToRefs(dstore)

const settings = settingsStore()
const fixedHeader = computed(()=> settings.fixedHeader )

const classObj = reactive({
    hideSidebar: computed(()=> !sidebar.value.opened),
    openSidebar: computed(()=> sidebar.value.opened),
    // withoutAnimation: this.sidebar.withoutAnimation,
    // mobile: this.device === 'mobile'
})
</script>

<style lang="scss" scoped>
.hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }
</style>
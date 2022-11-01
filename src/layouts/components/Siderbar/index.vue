<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu 
            :default-active="activeMenu"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :unique-opened="true"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            mode="vertical" 
            :collapse-transition="false"
            class="el-menu-vertical">
            <!-- :--active-color="variables.menuActiveText" -->
            <!-- :background-color="variables.menuBg" -->
            <sidebar-item
                v-for="route in routes"
                :key="route.path"
                :item="route"
                :base-path="route.path"
            />
        </el-menu>
    </el-scrollbar>
</template>

<script setup>
import variables from "styles/variables.module.scss";
import SidebarItem from "./SidebarItem.vue";
import { routes } from '@/router'
import { computed } from "@vue/reactivity";
import { useRoute } from "vue-router";

import { defaultStore } from 'stores/default.js'
import { storeToRefs } from "pinia";

// 当前激活菜单
const activeMenu = computed(() => {
  const route = useRoute();
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

const dstore = defaultStore() 
const { sidebar } = storeToRefs(dstore)

const isCollapse = computed(()=>!sidebar.value.opened);
</script>

<style lang="scss" scoped>

</style>
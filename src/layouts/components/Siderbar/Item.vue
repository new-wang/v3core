<!--
 * @Author: new-wang
 * @Date: 2022-10-26 11:41:11
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 10:39:19
 * @Description: 侧边栏title及icon
-->

<template>
    <el-icon v-if="icon" class="sub-el-icon" :class="icon">
        <component :is="icon">
        </component>
    </el-icon>

    <span v-if="title">{{ title }}</span>
</template>

<script setup>
    defineProps({
        icon: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        }
    })
</script>

<style lang="scss" scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
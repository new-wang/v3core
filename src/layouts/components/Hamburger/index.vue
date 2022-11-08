<!--
 * @Author: new-wang
 * @Date: 2022-10-31 14:29:46
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 10:43:12
 * @Description: 折叠侧栏图标
-->

<template>
    <div style="padding: 0 15px;" @click="toggleClick">
        <el-icon :size="20" style="vertical-align: middle" class="hamburger" :class="{'is-active':isActive}">
            <Expand />
            <!-- <Fold /> -->
        </el-icon>
    </div>
</template>

<script setup>
const emits = defineEmits(['toggleClick'])
const toggleClick = () => {
    emits('toggleClick')
}
const props = defineProps({
    isActive: {
      type: Boolean,
      default: true
    }
})
</script>

<style lang="scss" scoped>
.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
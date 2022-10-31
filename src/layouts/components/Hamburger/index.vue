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
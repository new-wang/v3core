<template>
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
        <slot />
    </el-scrollbar>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
const emits = defineEmits(['scroll'])

const tagAndTagSpacing = 4 // tagAndTagSpacing
const scrollContainer = ref(null)
const scrollWrapper = computed(() => {
    return scrollContainer.value.wrap$
})
const handleScroll = (e) => {
    const eventDelta = e.wheelDelta || -e.deltaY * 40
    scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollLeft + eventDelta / 4
}
const emitScroll = () => {
    emits('scroll')
}

const moveToTarget = (tag) => {
    console.log('moveToTarget :>> ');
    // const container = scrollContainer.$el
    // console.log('scrollContainer :>> ', scrollContainer);
}

onMounted(() => {
    console.log('scrollWrapper :>> ', scrollWrapper);
    scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
    scrollWrapper.value.removeEventListener('scroll', emitScroll)
})

</script>

<style lang="scss" scoped>
.scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;

    ::v-deep() {
        .el-scrollbar__bar {
            bottom: 0px;
        }

        .el-scrollbar__wrap {
            height: 49px;
        }
    }
}
</style>
<!--
 * @Author: new-wang
 * @Date: 2022-11-07 15:48:48
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 10:42:53
 * @Description: 
-->

<template>
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
        <slot />
    </el-scrollbar>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

import { getCurrentInstance } from 'vue';
let { proxy } = getCurrentInstance()

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

const moveToTarget = (currentTag) => {
    const container = proxy.$el;
    const containerWidth = container.offsetWidth;
    const tagList = proxy.$parent.$refs.tag;
    let firstTag = null
    let lastTag = null

    // find first tag and last tag
    if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
    }
    if (firstTag === currentTag) {
        scrollWrapper.value.scrollLeft = 0
    } else if (lastTag === currentTag) {
        scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollWidth - containerWidth
    } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing

        if (afterNextTagOffsetLeft > scrollWrapper.value.scrollLeft + containerWidth) {
            scrollWrapper.value.scrollLeft = afterNextTagOffsetLeft - containerWidth
        } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
            scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft
        }
    }
}

defineExpose({
    moveToTarget
})

onMounted(() => {
    // console.log('scrollWrapper :>> ', scrollWrapper);
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
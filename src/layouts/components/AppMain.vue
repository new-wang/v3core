<!--
 * @Author: new-wang
 * @Date: 2022-10-25 10:44:07
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 10:46:12
 * @Description: 主内容区
-->

<template>
    <section>
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </section>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>
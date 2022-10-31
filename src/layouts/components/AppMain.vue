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
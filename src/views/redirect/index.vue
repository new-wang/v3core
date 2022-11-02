<template>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router';

onMounted (()=>{
    const router = useRouter()
    const route = useRoute()
    const { params, query } = route
    const { path } = params
    router.replace({
        path:'/'+ path,
        query
    })
})
</script>
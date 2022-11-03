<!-- <script setup>
import { created,render, h } from 'vue'
import { useRoute,useRouter } from 'vue-router';
created (()=>{
    const router = useRouter()
    const route = useRoute()
    const { params, query } = route
    const { path } = params
    router.replace({
        path:'/'+ path,
        query
    })
})
render(()=>{
    return h('div')
})
</script> -->
<script>
import { useRoute,useRouter } from 'vue-router';
import { h } from 'vue'
export default {
    created(){
        const router = useRouter()
        const route = useRoute()
        const { params, query } = route
        const { path } = params
        router.replace({
            path:'/'+ path,
            query
        })
    },
    render(){
        return h('div')
    }
}
</script>
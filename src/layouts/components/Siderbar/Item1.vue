<!--
 * @Author: new-wang
 * @Date: 2022-11-07 09:43:12
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 10:41:01
 * @Description: 使用render
-->
<script>
import { h,resolveComponent } from 'vue'
export default {
    props:['icon','title'],
    render(){
        const icons = this.icon?resolveComponent(this.icon):'';
        return [
            h(
                'i',
                {
                    class:'sub-el-icon el-icon'
                },
                h(icons)
            ),
            this.title? h('span',this.title ): ''
        ]
    }
}
</script>

<style lang="scss" scoped>

</style>
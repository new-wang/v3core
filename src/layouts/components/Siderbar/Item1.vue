<!--
 * @Description: 使用render 
 * @Author: WX
 * @Date: 2022-11-07 11:25
 * @LastEditors: WX
 * @LastEditTime: 2022-11-07 11:28
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
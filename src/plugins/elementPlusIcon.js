// 全局引入
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }
import { Expand,Fold,Edit } from '@element-plus/icons-vue'

export default function(app){
    app.component('Expand',Expand)
    app.component('Fold',Fold)
    app.component('Edit',Edit)
}

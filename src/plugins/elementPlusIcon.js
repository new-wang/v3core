/*
 * @Author: new-wang
 * @Date: 2022-10-31 14:51:58
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 10:47:09
 * @Description: element 图标
 */

// 全局引入
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }
import { Expand,Fold,Edit,Close } from '@element-plus/icons-vue'

export default function(app){
    app.component('Expand',Expand)
    app.component('Fold',Fold)
    app.component('Edit',Edit)
    app.component('Close',Close)
}

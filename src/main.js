import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

// import './assets/main.css'

// 全局样式
import 'styles/index.scss'

// icon
import elementPlusIcon from './plugins/elementPlusIcon'

const app = createApp(App)
elementPlusIcon(app)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')

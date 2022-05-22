import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import installElementPlus from './plugins/element'

const app = createApp(App)
installElementPlus(app)
app.use(router).use(ElementPlus).mount('#app')
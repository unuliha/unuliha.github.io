import createApp from 'vue'
import createRouter from 'vue-router'

import App from './App.vue' 
import routerMap from './routers.js' 
 
// 动态路由注册函数 
const registerRoutes = (router) => {
  routerMap(router)
}
 
// 创建路由实例 
const router = createRouter({
  routes: [],
})
 
// 动态注册路由 
registerRoutes(router)
 
// 创建应用实例 
const app = createApp(App)
 
// 使用路由插件 
app.use(router) 
 
// 挂载应用 
app.mount('#app') 
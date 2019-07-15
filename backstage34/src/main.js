import Vue from 'vue'
import App from './App.vue'

// 导入路由
import VueRouter from 'vue-router'

// 导入组件
import login from './components/login.vue'
import index from './components/index.vue'

Vue.config.productionTip = false

// 设置use
Vue.use(VueRouter)

// 路由规则
const routes = [{
    path: '/login',
    component: login
  },
  {
    path: '/index',
    component: index
  }
]

// 路由对象
const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  // 挂载vue实例
  router
}).$mount('#app')
import Vue from 'vue'
import App from './App.vue'

// 导入css
import './assets/base.css'

// 导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 设置use
Vue.use(ElementUI)

// 导入抽取router
import router from './router/router'

// 注册面包屑组件
import mybread from './components/mybread.vue'
Vue.component("mybread", mybread)

new Vue({
  render: h => h(App),
  // 挂载vue实例
  router
}).$mount('#app')
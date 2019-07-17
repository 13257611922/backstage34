import Vue from 'vue'

// 导入路由
import VueRouter from 'vue-router'
// 设置use
Vue.use(VueRouter)

// 导入组件
import login from '../views/login.vue'
import index from '../views/index.vue'
import error from '../components/error.vue'

// 嵌套组件
import users from '../views/users.vue'
import roles from '../views/roles.vue'
import rights from '../views/rights.vue'
import goods from '../views/goods.vue'
import params from '../views/params.vue'
import categories from '../views/categories.vue'
import orders from '../views/orders.vue'
import reports from '../views/reports.vue'


// 路由规则
const routes = [{
        path: '/login',
        component: login,
        // 路由元信息
        meta: {
            needLogin: false
        }
    },
    // 路由重定向
    {
        path: '/',
        redirect: '/login'
    },

    {
        path: '/index',
        component: index,
        // 路由嵌套
        children: [{
                path: 'users',
                component: users
            },
            // 嵌套路由重定向
            {
                path: '',
                component: users
            },
            {
                path: 'roles',
                component: roles
            },
            {
                path: 'rights',
                component: rights
            },
            {
                path: 'goods',
                component: goods
            },
            {
                path: 'params',
                component: params
            },
            {
                path: 'categories',
                component: categories
            },
            {
                path: 'orders',
                component: orders
            },
            {
                path: 'reports',
                component: reports
            }
        ]
    },
    // 错误页
    {
        path: '/error',
        component: error
    },
    // 兜底规则
    {
        path:'*',
        redirect:'/error'
    }
]

// 路由对象
const router = new VueRouter({
    routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
    // console.log(to);
    // if (to.path.indexOf('/index') == 0) {
    if (to.meta.needLogin != false) {
        // 跳转index 判断
        if (window.sessionStorage.getItem('token') != undefined) {
            next()
        } else {
            // 提示框
            new Vue().$message({
                message: '未登录,请先登录!',
                type: 'warning'
            });
            // 跳转login
            router.push('/login')
        }
    } else {
        next()
    }
})

// 暴露router
export default router
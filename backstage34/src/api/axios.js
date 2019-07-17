// 导入axios
import axios from 'axios'
// 导入router
import router from '../router/router'
// 导入饿了么ui
import vue from 'vue'

// 创建副本
const managerAxios = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加axios拦截器 拦截请求和响应
// 添加请求拦截器
managerAxios.interceptors.request.use(function (config) {
    // 请求成功触发
    console.log('请求成功');
    // console.log(config);
    // 添加请求头
    // 添加token
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
}, function (error) {
    // 请求失败触发
    return Promise.reject(error);
});

// 添加响应拦截器
managerAxios.interceptors.response.use(function (response) {
    // 响应成功触发
    console.log('响应成功');
    // console.log(response);
    // 伪造token
    if (response.data.meta.status == 400 && response.data.meta.msg == '无效token') {
        // 清空
        window.sessionStorage.clear()
        // 跳转login
        router.push('/login')
        // 警告框
        new vue().$message({
            message: '警告!!! 不可自行设置token',
            type: 'warning'
        });
    }
    return response;
}, function (error) {
    // 响应失败触发
    return Promise.reject(error);
});


// 暴露接口 - 登录窗口
export const login = ({
    username,
    password
}) => {
    return managerAxios.post('/login', {
        username,
        password
    })
}

// 暴露接口 - 左侧菜单权限
export const menus = () => {
    return managerAxios.get('/menus', {
        // 设置请求头(已设置请求拦截器)
        // headers: {
        //     Authorization: window.sessionStorage.getItem('token')
        // }
    })
}
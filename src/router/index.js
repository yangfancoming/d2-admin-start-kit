import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index'
import util from '@/libs/util.js'
// 路由数据
import routes from './routes'
Vue.use(VueRouter)
// 导出路由 在 main.js 里使用
const router = new VueRouter({
    routes
})


// 自定义添加内容 ********************************************************************* 开始

import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'
import routerMapComponents from '@/routerMapComponents' //路由与组件映射关系
import { userPermissionInfo } from '@/mock/permissionMenuAndRouter' //模拟动态菜单与路由

let isFetchPermissionInfo = false //标记是否已经拉取权限信息
let whiteList = ['/auth/login','/demo/page2'] //免校验token白名单
let permission = {
    functions: [],
    roles: [],
    isAdmin: false
}
export const fetchPermissionInfo = function () {
    let permissionMenu = userPermissionInfo.data.accessMenus
    let permissionRouter = userPermissionInfo.data.accessRoutes
    permission.functions = userPermissionInfo.data.userPermissions
    permission.roles = userPermissionInfo.data.userRoles
    permission.isAdmin = userPermissionInfo.data.isAdmin == 1
    // permission.interfaces = util.formatInterfaces(userPermissionInfo.accessInterfaces)
    console.log(permission,'permission')
    console.log(permissionMenu,'permissionMenu')
    console.log(permissionRouter,'permissionRouter')
    console.log(userPermissionInfo,'userPermissionInfo')
    formatRoutes(permissionRouter)

    router.addRoutes(permissionRouter); //动态添加路由

    // 【设置菜单信息】 将固定菜单(/menu/header、/menu/aside)与后端返回的权限菜单(accessMenus)合并后，存入相应的vuex store模块中
    let allMenuAside = [...menuAside, ...permissionMenu]
    let allMenuHeader = [...menuHeader, ...permissionMenu]
    store.commit('d2admin/page/init', [...frameInRoutes, ...permissionRouter])  // 处理路由 得到每一级的路由设置
    store.commit('d2admin/menu/headerSet', allMenuHeader)  // 设置顶栏菜单
    store.commit('d2admin/menu/asideSet', allMenuAside)  // 设置侧边栏菜单
    store.commit('d2admin/search/init', allMenuHeader) // 初始化菜单搜索功能
    // 【设置权限信息】 将角色编码集合，功能编码集合，接口信息集合，以及是否系统管理员标识存入相应的vuex store模块中
    store.commit('d2admin/permission/set', permission)
}

//处理动态添加的路由
const formatRoutes = function (routes) {
    routes.forEach(route => {
        route.component = routerMapComponents[route.component]
        if (route.children) {
            formatRoutes(route.children)
        }
    })
}
// 自定义添加内容 ********************************************************************* 结束


router.beforeEach((to, from, next) => {
    NProgress.start() // 进度条
    store.commit('d2admin/search/set', false) // 关闭搜索面板
    console.log(to.path,'进入 请求前拦截。。。。。。。。。。。。。。。')
    // 验证当前路由所有的匹配中是否需要有登录验证的
    if (to.matched.some(r => r.meta.auth)) {
        console.log('进入 to.matched.some 。。。。。。。。。。。。。。。')
        // 这里暂时将cookie里是否存有token作为验证是否登录的条件
        const token = util.cookies.get('token')
        console.log(token,'进入 token 。。。。。。。。。。。。。。。')
        if (token && token !== 'undefined') {
            console.log(isFetchPermissionInfo,'进入 token && token !== \'undefined\' 。。。。。。。。。。。。。。。')
            if (!isFetchPermissionInfo) { // 如果没有拉取 则拉取权限信息
                fetchPermissionInfo(); //拉取权限信息
                console.log('进入 fetchPermissionInfo 。。。。。。。。。。。。。。。')
                isFetchPermissionInfo = true; // 标记为已拉取
                next(to.path, true)
            } else {  next() }
        } else { // 没有登录的时候跳转到登录界面, 携带上登陆成功之后需要跳转的页面完整路径
            console.log('进入 没有登录的时候跳转到登录界面 。。。。。。。。。。。。。。。')
            next({  name: 'login',query: { redirect: to.fullPath }  })
            NProgress.done()
        }
    } else {
        console.log('不需要身份校验 直接通过')
        next()
    }
})

router.afterEach(to => {
    console.log('进入 请求后拦截。。。。。。。。。。。。。。。')
    NProgress.done() // 进度条
    store.dispatch('d2admin/page/open', to) // 多页控制 打开新的页面
    util.title(to.meta.title)  // 更改标题
})




export default router

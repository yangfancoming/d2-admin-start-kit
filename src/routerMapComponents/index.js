// // 其实就是维护一个js文件，将组件按照key-value的规则导出
import layoutHeaderAside from '@/layout/header-aside'
// export default {
//     "layoutHeaderAside": layoutHeaderAside,
//     "menu": () => import('@/pages/sys/menu'),
//     "route": () => import('@/pages/sys/route'),
//     "role": () => import('@/pages/sys/role'),
//     "user": () => import('@/pages/sys/user'),
//     "interface": () => import('@/pages/sys/interface')
// }
export default {
    "layoutHeaderAside": layoutHeaderAside,
    dynamic: () => import("@/pages/test/dynamic.vue"),
    nouse: () => import("@/pages/test/nouse.vue")
};

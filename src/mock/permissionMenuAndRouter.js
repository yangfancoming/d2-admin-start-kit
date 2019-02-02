// 可以看到菜单最多达到三级，路由只有两级，通过菜单上的path与路由的path相对应，当点击菜单的时候就能正确的跳转。

// export const permissionMenu = [
//     {
//         title: "系统",
//         path: "/system",
//         icon: "folder-o",
//         children: [
//             {
//                 title: "系统设置",
//                 icon: "folder-o",
//                 children: [
//                     {
//                         title: "菜单管理",
//                         path: "/system/menu",
//                         icon: "folder-o"
//                     },
//                     {
//                         title: "路由管理",
//                         path: "/system/route",
//                         icon: "folder-o"
//                     },
//                     {
//                         title: "角色管理",
//                         path: "/system/role",
//                         icon: "folder-o"
//                     },
//                     {
//                         title: "用户管理",
//                         path: "/system/user",
//                         icon: "folder-o"
//                     },
//                     {
//                         title: "接口管理",
//                         path: "/system/interface",
//                         icon: "folder-o"
//                     }
//                 ]
//             },
//             {
//                 title: "组织架构",
//                 icon: "folder-o",
//                 children: [
//                     {
//                         title: "部门管理",
//                         path: "",
//                         icon: "folder-o"
//                     },
//                     {
//                         title: "职位管理",
//                         path: "",
//                         icon: "folder-o"
//                     }
//                 ]
//             }
//         ]
//     }
// ]
//
// export const permissionRouter = [
//     {
//         name: "系统设置",
//         path: "/system",
//         component: "layoutHeaderAside",
//         componentPath: 'layout/header-aside/layout',
//         meta: {
//             title: '系统设置'
//         },
//         children: [
//             {
//                 name: "MenuPage",
//                 path: "/system/menu",
//                 meta: {
//                     cache: true,
//                     title: '菜单管理'
//                 },
//                 component: "menu",
//                 componentPath: 'pages/sys/menu/index',
//             },
//             {
//                 name: "RoutePage",
//                 path: "/system/route",
//                 meta: {
//                     cache: true,
//                     title: '路由管理'
//                 },
//                 component: "route",
//                 componentPath: 'pages/sys/route/index',
//             },
//             {
//                 name: "RolePage",
//                 path: "/system/role",
//                 meta: {
//                     cache: true,
//                     title: '角色管理'
//                 },
//                 component: "role",
//                 componentPath: 'pages/sys/role/index',
//             },
//             {
//                 name: "UserPage",
//                 path: "/system/user",
//                 meta: {
//                     cache: true,
//                     title: '用户管理'
//                 },
//                 component: "user",
//                 componentPath: 'pages/sys/user/index',
//             }
//         ]
//     }
// ]
export const userPermissionInfo =
    {
        "statusCode": 200,
        "msg": "",
        "data": {
            "userName": "MenuManager",
            "userRoles": [
                "R_MENUADMIN"
            ],
            "userPermissions": [
                "p_menu_view",
                "p_menu_edit",
                "p_menu_menu"
            ],
            "accessMenus": [
                {
                    "title": "系统",
                    "path": "/system",
                    "icon": "cogs",
                    "children": [
                        {
                            "title": "系统设置",
                            "icon": "cogs",
                            "children": [
                                {
                                    "title": "菜单管理",
                                    "path": "/system/menu",
                                    "icon": "th-list"
                                }
                            ]
                        },
                        {
                            "title": "组织架构",
                            "icon": "pie-chart",
                            "children": [
                                {
                                    "title": "部门管理",
                                    "icon": "html5"
                                },
                                {
                                    "title": "职位管理",
                                    "icon": "opencart"
                                }
                            ]
                        }
                    ]
                }
            ],
            "accessRoutes": [
                {
                    "name": "System",
                    "path": "/system",
                    "component": "layoutHeaderAside",
                    "componentPath": "layout/header-aside/layout",
                    "meta": {
                        "title": "系统设置",
                        "cache": true
                    },
                    "children": [
                        {
                            "name": "MenuPage",
                            "path": "/system/menu",
                            "component": "menu",
                            "componentPath": "pages/sys/menu/index",
                            "meta": {
                                "title": "菜单管理",
                                "cache": true
                            }
                        },
                        {
                            "name": "RoutePage",
                            "path": "/system/route",
                            "component": "route",
                            "componentPath": "pages/sys/route/index",
                            "meta": {
                                "title": "路由管理",
                                "cache": true
                            }
                        },
                        {
                            "name": "RolePage",
                            "path": "/system/role",
                            "component": "role",
                            "componentPath": "pages/sys/role/index",
                            "meta": {
                                "title": "角色管理",
                                "cache": true
                            }
                        },
                        {
                            "name": "UserPage",
                            "path": "/system/user",
                            "component": "user",
                            "componentPath": "pages/sys/user/index",
                            "meta": {
                                "title": "用户管理",
                                "cache": true
                            }
                        },
                        {
                            "name": "InterfacePage",
                            "path": "/system/interface",
                            "component": "interface",
                            "meta": {
                                "title": "接口管理"
                            }
                        }
                    ]
                }
            ],
            "accessInterfaces": [
                {
                    "path": "/menu/:id",
                    "method": "get"
                },
                {
                    "path": "/menu",
                    "method": "get"
                },
                {
                    "path": "/menu/save",
                    "method": "post"
                },
                {
                    "path": "/interface/paged",
                    "method": "get"
                }
            ],
            "isAdmin": 0,
            "avatarUrl": "https://api.adorable.io/avatars/85/abott@adorable.png"
        }
    }

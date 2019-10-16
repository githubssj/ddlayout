//拆分路由,此处为示例模块路由
const samplerouter = {
    routers: [
        //------------------------------------------------------------------------------------------------------------
        {
            id: "100.010",
            path: '/mxgraphiodemo',
            name: 'mxgraphiodemo',
            component: () => import('./views/sample/mxgraph/MxGraphDemoIO.vue')//流程示例
        },
        {
            id: "100.011",
            path: '/draggable2demo',
            name: 'draggable2demo',
            component: () => import('./views/sample/draggable/Draggable2Demo.vue')//拖放示例并布局生成
        },
        {
            id: "100.012",
            path: '/resize2demo',
            name: 'resize2demo',
            component: () => import('./views/sample/resize/Resize2Demo.vue')//拖放及改变大小示例
        }, {
            id: "100.013",
            path: '/modelsimplelist',
            name: 'modelsimplelist',
            component: () => import('./views/sample/model/ModelSimpleList.vue')//列表界面示例
        }, {
            id: "100.014",
            path: '/modellist',
            name: 'modellist',
            component: () => import('./views/sample/model/ModelList.vue')//列表界面示例
        }, {
            id: "100.015",
            path: '/modelcreate',
            name: 'modelcreate',
            component: () => import('./views/sample/model/ModelCreate.vue')//编辑界面示例
        }, {
            id: "100.016",
            path: '/sampledesktop',
            name: 'sampledesktop',
            component: () => import('./views/sample/SampleDesktop.vue')//桌面功能示例
        }, {
            id: "100.017",
            path: '/samplehome',
            name: 'samplehome',
            component: () => import('./views/sample/SampleHome.vue')//侧边可折叠示例
        },{
            id: "100.018",
            path: '/mxgraphiodemowithsetting',
            name: 'mxgraphiodemowithsetting',
            component: () => import('./views/sample/mxgraph/MxGraphDemoIOWithSetting.vue')//流程示例
        }, {
            id: "100.400.001",
            path: '/thirdmenucontent',
            name: 'thirdmenucontent',
            component: () => import('./views/sample/ThirdMenuContent.vue')//三级可展示菜单
        }
        //------------------------------------------------------------------------------------------------------------
    ],
    menus: [{
        id: "100",
        name: "功能示例",
        icon: "ios-analytics",
        children: [
            {
                id: "100.010",
                name: "流程定义示例",
                caption:"",
            }, {
                id: "100.011",
                name: "拖放功能示例",
                caption:"",
            }, {
                id: "100.012",
                name: "缩放功能示例",
                caption:"",
            }, {
                id: "100.013",
                name: "简单列表示例",
                caption:"",
            }, {
                id: "100.014",
                name: "列表界面示例",
                caption:"",
            }, {
                id: "100.015",
                name: "编辑界面示例",
                caption:"",
            }, {
                id: "100.016",
                name: "桌面功能示例",
                caption:"",
            }, {
                id: "100.017",
                name: "可折叠侧边",
                caption:"",
            }, {
                id: "100.018",
                name: "流程定义带设置",
                caption:"",
            }, {
                id: "100.400",
                name: "二级菜单",
                caption:"",
                children: [
                    {
                        id: "100.400.zero", name: "三级菜单",caption:"",
                        children: [
                            {
                                id: "100.400.zero.zero", name: "四级菜单",caption:"",
                                children: [
                                    { id: "100.400.001", name: "五级菜单",caption:"", }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }]
}
export default samplerouter;
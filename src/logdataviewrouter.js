//拆分路由,此处为日志可视化部分路由
const logdataviewrouter = {
    routers: [
        //------------------------------------------------------------------------------------------------------------
        {
            id: "010.000",
            path: '/rdblist',
            name: 'rdblist',
            component: () => import('./views/logdataview/ds/rdb/List.vue')//数据源关系数据库列表
        },
        {
            id: "010.001",
            path: '/rdbedit',
            name: 'rdbedit',
            component: () => import('./views/logdataview/ds/rdb/Edit.vue')//数据源关系数据库编辑
        }
        ,
        {
            id: "010.010",
            path: '/mmlist',
            name: 'mmlist',
            component: () => import('./views/logdataview/ds/mm/List.vue')//数据源消息中间件列表
        },
        {
            id: "010.011",
            path: '/mmedit',
            name: 'mmedit',
            component: () => import('./views/logdataview/ds/mm/Edit.vue')//数据源消息中间件编辑
        },
        {
            id: "010.020",
            path: '/etllist',
            name: 'etllist',
            component: () => import('./views/logdataview/ds/etl/List.vue')//数据源融合ETL列表
        },
        {
            id: "010.021",
            path: '/etledit',
            name: 'etledit',
            component: () => import('./views/logdataview/ds/etl/Edit.vue')//数据源融合ETL编辑
        },
        {
            id: "010.030",
            path: '/logsyslist',
            name: 'logsyslist',
            component: () => import('./views/logdataview/ds/logsys/List.vue')//数据源分布式日志列表
        },
        {
            id: "010.031",
            path: '/logsysedit',
            name: 'logsysedit',
            component: () => import('./views/logdataview/ds/logsys/Edit.vue')//数据源分布式日志编辑
        }

        //------------------------------------------------------------------------------------------------------------
        , {
            id: "020.000",
            path: '/dispatchlist',
            name: 'dispatchlist',
            component: () => import('./views/logdataview/adapter/dispatch/List.vue')//适配器调度规则列表
        }
        , {
            id: "020.001",
            path: '/dispatchedit',
            name: 'dispatchedit',
            component: () => import('./views/logdataview/adapter/dispatch/Edit.vue')//适配器调度规则编辑
        }
        , {
            id: "020.010",
            path: '/fusionlist',
            name: 'fusionlist',
            component: () => import('./views/logdataview/adapter/fusion/List.vue')//适配器融合规则列表
        }
        , {
            id: "020.011",
            path: '/fusionedit',
            name: 'fusionedit',
            component: () => import('./views/logdataview/adapter/fusion/Edit.vue')//适配器融合规则编辑
        }
        , {
            id: "020.020",
            path: '/outlist',
            name: 'outlist',
            component: () => import('./views/logdataview/adapter/out/List.vue')//适配器输出规则列表
        }
        , {
            id: "020.021",
            path: '/outedit',
            name: 'outedit',
            component: () => import('./views/logdataview/adapter/out/Edit.vue')//适配器输出规则编辑
        }
        , {
            id: "020.030",
            path: '/adaptermanlist',
            name: 'adaptermanlist',
            component: () => import('./views/logdataview/adapter/adapterman/List.vue')//适配器列表
        }
        , {
            id: "020.031",
            path: '/adaptermanedit',
            name: 'adaptermanedit',
            component: () => import('./views/logdataview/adapter/adapterman/Edit.vue')//适配器编辑
        }

        //------------------------------------------------------------------------------------------------------------
        , {
            id: "030.000",
            path: '/chartctrllist',
            name: 'chartctrllist',
            component: () => import('./views/logdataview/chartctrl/List.vue')//图表组件列表
        }
        , {
            id: "030.001",
            path: '/chartctrledit',
            name: 'chartctrledit',
            component: () => import('./views/logdataview/chartctrl/Edit.vue')//图表组件编辑
        }
        //------------------------------------------------------------------------------------------------------------
        , {
            id: "040.000",
            path: '/datapanellist',
            name: 'datapanellist',
            component: () => import('./views/logdataview/datapanel/List.vue')//数据面板列表
        }
        , {
            id: "040.001",
            path: '/datapaneledit',
            name: 'datapaneledit',
            component: () => import('./views/logdataview/datapanel/Edit.vue')//数据面板编辑
        }
        //------------------------------------------------------------------------------------------------------------
        , {
            id: "050.000",
            path: '/flowdesignerlist',
            name: 'flowdesignerlist',
            component: () => import('./views/logdataview/flowdesigner/List.vue')//流程设计器列表
        }
        , {
            id: "050.001",
            path: '/flowdesigneredit',
            name: 'flowdesigneredit',
            component: () => import('./views/logdataview/flowdesigner/Edit.vue')//流程设计器编辑
        }
    ],
    menus: [{
        id: "010",
        name: "数据来源",
        icon: "logo-codepen",
        children: [
            {
                id: "010.000",
                name: "关系数据库",
                caption:"",
            }, {
                id: "010.010",
                name: "消息中间件",
                caption:"",
            }, {
                id: "010.020",
                name: "融合ETL",
                caption:"",
            }, {
                id: "010.030",
                name: "分布式日志",
                caption:"",
            }
        ]
    }, {
        id: "020",
        name: "数据适配器",
        icon: "ios-cloud-upload-outline",
        children: [
            {
                id: "020.000",
                name: "调度规则器",
                caption:"",
            }, {
                id: "020.010",
                name: "融合规则器",
                caption:"",
            }, {
                id: "020.020",
                name: "输出格式化器",
                caption:"",
            }, {
                id: "020.030",
                name: "适配器管理",
                caption:"",
            }
        ]
    },
    {
        id: "030.000",
        name: "图表组件",
        icon: "md-easel",
        caption:"",
    },
    {
        id: "040.000",
        name: "数据面板",
        icon: "ios-laptop",
        caption:"",
    },
    {
        id: "050.000",
        name: "流程设计",
        icon: "ios-cube-outline",
        caption:"",
    }
    ]
}
export default logdataviewrouter;
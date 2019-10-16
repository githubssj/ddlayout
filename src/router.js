import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import P404 from './views/404.vue'
import Login from './views/Login.vue'


import logdataviewrouter from './logdataviewrouter' //数据可视化路由
import samplerouter from './samplerouter' //样例工程路由

Vue.use(Router)


export default new Router({
	//mode: 'history',//hash
	//mode:'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			children: [{
				id: "000",
				path: '',
				name: 'desktop',
				component: () => import('./views/logdataview/LogDataViewDesktop.vue')
			},
			{
				id: "001.000",
				path: '/rolelist',
				name: 'rolelist',
				component: () => import('./views/logdataview/role/List.vue')//角色列表
			},
			{
				id: "001.001",
				path: '/roleedit',
				name: 'roleedit',
				component: () => import('./views/logdataview/role/Edit.vue')//角色编辑
			},
			{
				id: "001.010",
				path: '/userlist',
				name: 'userlist',
				component: () => import('./views/logdataview/user/List.vue')//用户列表
			},
			{
				id: "001.011",
				path: '/useredit',
				name: 'useredit',
				component: () => import('./views/logdataview/user/Edit.vue')//用户编辑
			},{
				id: "001.020",
				path: '/accesslog',
				name: 'accesslog',
				component: () => import('./views/logdataview/accesslog/List.vue')
			}
			//------------------------------------------------------------------------------------------------------------
			,...logdataviewrouter.routers//引入日志可视化部分的路由规则
			//------------------------------------------------------------------------------------------------------------
			,...samplerouter.routers//引入样例部分的路由规则
			//------------------------------------------------------------------------------------------------------------
			//------------------------------------------------------------------------------------------------------------
			//------------------------------------------------------------------------------------------------------------
			//------------------------------------------------------------------------------------------------------------
			//------------------------------------------------------------------------------------------------------------
			//------------------------------------------------------------------------------------------------------------
			
			]
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		},{
			path: '/404',
			name: '404',
			component: P404,
		},
		{
			path: '*',
			name: '404',
			component: P404,
		},
	],
	menus: [{
		id: "000",
		name: "系统桌面",
		icon: "ios-cube-outline",
	},
	{
		id: "001",
		name: "系统管理",
		icon: "ios-appstore-outline",
		children: [{
			id: "001.000",
			name: "角色管理",
			caption:"",
		}, {
			id: "001.010",
			name: "用户管理",
			caption:"",
		}, {
			id: "001.020",
			name: "访问日志",
			caption:"",
		}
		]
	}
	,...logdataviewrouter.menus//引入日志可视化部分的菜单规则
	,...samplerouter.menus//引入样例部分的菜单规则
	
	],
	findDefaultMenuId: function () {
		return '000'
	},
	findRouter: function (menu) {
		if (menu && menu != null) {
			let rs = this.queryRouterByMenuId('', menu.id, this.routes);
			if (rs != null && rs != '') {
				let s = rs.replace(/\/\//g, "/");
				return s;
			}
		}
		return '/404';
	},
	queryRouterByMenuId(parenturl, menuid, routes) {
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].id == menuid) {

				return parenturl + routes[i].path;
			} else {
				if (routes[i].children && routes[i].children != null && routes[i].children.length > 0) {
					let v = this.queryRouterByMenuId(parenturl + routes[i].path, menuid, routes[i].children);
					if (v && v != '') {
						return v;
					}
				}
			}
		}
		return '';
	}
})

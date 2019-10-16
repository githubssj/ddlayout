import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		sysTitle: '网络融合数据可视化平台',
		showheader: true,
		showleftmenu: true,

		loginUser: {
			loginName: '',
			loginPwd: '',
			userName: '周志明',
			loginDateTime: new Date().format("yyyy-MM-dd hh:mm")
		}
	},
	getters: {
		sysTitle(state) {
			return state.sysTitle;
		},
		showheader(state) {
			return state.showheader;
		},
		showleftmenu(state) {
			return state.showleftmenu;
		},
		loginUser(state) {
			return state.loginUser;
		}
	},
	mutations: {

		showheader(state, v) {
			state.showheader = v;
		},
		showleftmenu(state, v) {
			state.showleftmenu = v;
		}
	},
	actions: {
		showheader(context, data) {
			context.commit('showheader', data);
		},
		showleftmenu(context, data) {
			context.commit('showleftmenu', data);
		}
	}
})

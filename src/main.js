import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入 ivew
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

//整合 element ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

//整合echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//整合百度地图

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap,{
  ak:'3bVHdeo2ZZaZO4QczC63d0kMsbA55ZSD'
})

//注册resize组件
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)
import VueDragResize from 'vue-drag-resize'
Vue.component('vue-drag-resize', VueDragResize)

//注入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

//引入自定义http 服务
import nsneohttp from './assets/nsneohttp'
Vue.prototype.$nsneohttp = nsneohttp;

//全局的消息
import bus from './assets/bus'
Vue.prototype.$bus = bus;
RootBus = bus;

//引入函数库
import _ from 'lodash';
Vue.prototype._ = _;


Vue.config.productionTip = false

//设置窗口标题
try{
  document.title = store.getters.sysTitle;
}catch(e){
  alert(e);
}

RootVue = new Vue({
  router,
  store,
  render: h => h(App)
});

RootVue.$mount('#app')

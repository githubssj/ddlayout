import Vue from 'vue';

// 使用 Event Bus
const bus = new Vue();



export default bus;

/* 
bus 使用方式：

//在 bus 中订阅  collapse 事件，一般放在 created() 函数中
// 通过 Event Bus 进行组件间通信，来折叠侧边栏
bus.$on('collapse', msg => {
    this.collapse = msg;
})

//在触发函数中发布消息，消息
bus.$emit('collapse', this.collapse);


*/
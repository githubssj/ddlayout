//扩展axios
//axios的二次封装
//https://www.jianshu.com/p/62b5144fb32e
//二次封装axios，根据参数来实现多个请求多次拦截
//https://blog.csdn.net/qq_39197547/article/details/81909041
import axios from 'axios'
import { Message } from 'iview'

//显示普通信息 封装全局消息提示
const ShowInfoMessage = function(msg){
    Message.info(msg);
}

//显示错误信息 封装全局消息提示
const ShowErrorMessage = function(msg){
    Message.error(msg);
}

/*
//访问示例采用其他方式加载数据
    console.log('测试...,login,其他方式加载数据')
    this.$nsneohttp.get("/localmock/allwsfail.json").then(httpdata => {
        console.log(httpdata);
      }).catch(function(err){
        console.log('测试...,login,其他方式加载数据,错误输出...');
      });
*/
// 创建axios实例
const nsneohttp = axios.create();

//针对系统特定的数据类型进行设置
nsneohttp.interceptors.response.use(
    response => {
        //只有当数据类型为约定数据类型时才会调用特定数据
        //console.log('----------------1')
        if (response && response.data && response.data.pkgType && response.data.pkgType != null && response.data.pkgType != '') {
            if (response.data.pkgType == 'addons.common.web.springController.ControllerReturnJson') {
                if (response.data.status != 'succ') {
                    ShowErrorMessage(response.data.statusMsg);
                    return Promise.reject(response.data)
                } else {
                    return response.data;
                }
            } else {
                if (response.data.status != 'succ') {
					ShowErrorMessage(response.data.statusMsg);
                    return Promise.reject(response.data)
                } else {
                    return response.data;
                }
            }
        } else {
            return response;
        }
    },
    error => {
        console.log('err' + error) // for debug
		ShowErrorMessage('网络访问异常');
        return Promise.reject(error)
    }
)

export default nsneohttp

/*
// 创建axios实例
const service = axios.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        //code为非20000是抛错 可结合自己业务进行修改
        const res = response.data
        const codeReg = /^20\d+/
        if (!codeReg.test(response.status)) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })

            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm(
                    '你已被登出，可以取消继续留在该页面，或者重新登录',
                    '确定登出',
                    {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)


export default service
*/
import axios from 'axios'
import router from '@/router'
import store from '@/store'


axios.defaults.baseURL = 'http://localhost:3000/admin';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//添加请求拦截器
axios.interceptors.request.use(function (config){
    var userInfo = localStorage.getItem('userInfo');
    var token = null;
    if(userInfo){
        userInfo = JSON.parse(userInfo)
        token = userInfo.token;
        config.headers.token = token;
       
    }
    return config;
},function (error){
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response){
    let {code,message} = response.data;
    if(code == '200'){
        return response.data;
    }else if(code == '10119'){
        store.dispatch('exitAndUpdateInfo');
        router.push({name:'login',query:{Return:router.currentRoute.fullPath}});
        var tokenError = new Error('token过期')
        return Promise.reject(tokenError);
    }else{
        var err = new Error(message)
        return Promise.reject(err)
    }
},function(error){
    return Promise.reject(error)
})

export default axios
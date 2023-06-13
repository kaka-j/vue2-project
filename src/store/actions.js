
//处理异步方法
import { getLogin } from "@/api/api"
import { initUser } from "./typoes";


export default{
    getAndUpdateAuthorityInfo:function({commit}){
        let str =  localStorage.getItem('userInfo')
        if(str){
            let data = JSON.parse(str);
            commit('updateAndThorityInfo',data)
        }
      
    },

    loginAndUpdateInfo:function(context,payload){
        let {commit} = context;
        return getLogin(payload).then(res=>{
            localStorage.setItem('userInfo',JSON.stringify(res.data));
            commit("updateAndThorityInfo",res.data);
        })
    },
    exitAndUpdateInfo:function({commit}){
        let data = initUser();
        commit('updateAndThorityInfo',data);
        localStorage.removeItem('userInfo')
    }


}
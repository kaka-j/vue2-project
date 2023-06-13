//同步方法
export default{
        updateAndThorityInfo:function(state,payload){
            for(var key in payload){
                if(Object.keys(state.userInfo).includes(key)){
                    state.userInfo[key] = payload[key]
                }
            }
        }
}
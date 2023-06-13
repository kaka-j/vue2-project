
export default{
    isLogin(state){
        return !!(state.userInfo.adminname && state.userInfo.role && state.userInfo.token && state.userInfo.checkedkeys)
    }  
}
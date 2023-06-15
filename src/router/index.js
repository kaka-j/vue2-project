import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from "@/store";
import { Message } from 'element-ui';


Vue.use(VueRouter)



const router = new VueRouter({ 
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})



let whiteList = ["/login","/404"]; //白名单
let count = 0; //变量

// router.beforeEach(function(to,from,next){
//   store.dispatch("getAndUpdateAuthorityInfo"); //页面跳转时解析数据
//   next();
// })

router.beforeEach((to,from,next)=>{

  if(!whiteList.includes(to.path)){ //判断白名单
   if(count == 0){
    store.dispatch("getAndUpdateAuthorityInfo");
    count++;
   }
    next();
  }else{
    next();
  }
})
 
router.beforeEach(function(to,from,next){
  if(!whiteList.includes(to.path)){  //判断白名单
   if(store.getters.isLogin){  //判断登录状态
   let checkedkeys = store.state.userInfo.checkedkeys;
   let role = store.state.userInfo.role;
   if(role == 1){   //如果是超级管理员直接访问--admin里没有checkedkeys的值
    next();
   }else{
    if(checkedkeys.includes(to.path)){   //判断跳转的路由是否是当前用户权限菜单里所有的
      next();   //如果是就跳转
     }else{
      next(false);
      Message({message:'您的权限不够请先充值提高权限', type:'error'})
     }
   }
  
   }else{
    router.push({path:'/login',query:{ReturnUrl:router.currentRoute.fullPath}})
    Message({message:'您还没有登录，请先登录', type:'warning'})
    // next();
   }
   }else{
     next();
   }
})


export default router

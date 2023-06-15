import {menus} from '@/router/router'
export default{
    isLogin(state){
        return !!(state.userInfo.adminname && state.userInfo.role && state.userInfo.token && state.userInfo.checkedkeys)
    },
    authorityMenus(state, getters){
        let Menus = JSON.parse(JSON.stringify(menus)); //深拷贝
        if(getters.isLogin){  //已经登录
            let {role,checkedkeys} = state.userInfo;  //解构取出role和checkedkeys
            let list = []; //存储权限菜单
            if(role == 1){ //超级管理员
                return Menus;
            }else{ //如果不是超级管理员，按对应权限生成菜单
                Menus.forEach(item=> {
                    if(checkedkeys.includes(item.path)){ //判断一级菜单的路由地址
                        list.push(item)
                    }else{
                        var children = item.children;
                        if(children){   //判断是否有子菜单
                            var subList = [];
                            children.forEach(subItem=>{
                                if(checkedkeys.includes(subItem.path)){    //判断子菜单中是否有路由地址
                                    subList.push(subItem)
                                }
                            })
                            if(subList.length > 0){     //判断子菜单的长度，如果不为空就存入父菜单中
                                item.children = subList;
                                list.push(item)
                            }
                        }
                    }
                });
                return list;
            }

        }else{  //用户没登录直接返回空数组
            return [];
        }
    }
}
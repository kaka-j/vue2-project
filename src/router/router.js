import HomeView from '../views/Home'
import HomeContentView from '../views/Home/Content'

import LoginView from '../views/Login'
import NotFoundView from '../views/NotFound'

import ProductListView from '../views/Product/ProductList'
import ProductSeachView from '../views/Product/ProductSeach'

import BannerAddView from '../views/Banner/BannerAdd'
import BannerListView from '../views/Banner/BannerList'
import BannerShowView from '../views/Banner/BannerShow'

import EchatrsView from '../views/Plugins/Echarts'
import EditorView from '../views/Plugins/Editor'

import AdminListView from '@/views/Admin/AdminList'
import AdminAddView from '@/views/Admin/AdminAdd'

import SassView from "@/views/Sass";


const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {
          path:'',
          redirect:'/content'
        },
        {
          path: '/content',
          name: 'content',
          label:'首页',
          icon:'el-icon-s-home',
          component: HomeContentView
        },
        {
          path: '/sass',
          name: 'sass',
          label:'sass',
          icon:'el-icon-s-home',
          component: SassView
        },
        {
          path:'/admin/admin-list',
          name:'admin-list',
          label:'管理员列表',
          icon:'el-icon-place',
          parent:{path:'/admin',name:'admin',label:'人员管理',icon:'el-icon-s-custom'},
          component:AdminListView
        },
        {
          path:'/admin/admin-add',
          name:'admin-add',
          label:'管理员新增',
          icon:'el-icon-circle-plus-outline',
          parent:{path:'/admin',name:'admin',label:'人员管理',icon:'el-icon-s-custom'},
          component:AdminAddView
        },
        {
          path:'/product/productList',
          name:'productList',
          label:'商品列表',
          icon:'el-icon-s-grid',
          parent:{path:'/product',name:'product',label:'商品管理',icon:'el-icon-s-goods'},
          component:ProductListView
        },
        {
          path:'/product/productSeach',
          name:'productSeach',
          label:'商品搜索',
          icon:'el-icon-search',
          parent:{path:'/product',name:'product',label:'商品管理',icon:'el-icon-s-goods'},
          component:ProductSeachView
        },
        {
          path:'/banner/bannerAdd',
          name:'bannerAdd',
          label:'轮播新增',
          icon:'el-icon-upload',
          parent:{path:'/banner',name:'banner',label:'轮播管理',icon:'el-icon-picture'},
          component:BannerAddView
        },
        {
          path:'/banner/bannerList',
          name:'bannerList',
          label:'轮播列表',
          icon:'el-icon-s-operation',
          parent:{path:'/banner',name:'banner',label:'轮播管理',icon:'el-icon-picture'},
          component:BannerListView
        },
        {
          path:'/banner/bannerShow',
          name:'bannerShow',
          label:'轮播展示',
          icon:'el-icon-s-flag',
          parent:{path:'/banner',name:'banner',label:'轮播管理',icon:'el-icon-picture'},
          component:BannerShowView
        },
        {
          path:'/plugins/echarts',
          name:'echarts',
          label:'Eachatrs图表',
          icon:'el-icon-s-marketing',
          parent:{path:'/plugins',name:'plugins',label:'图表管理',icon:'el-icon-s-data'},
          component:EchatrsView
        },
        {
          path:'/plugins/editor',
          name:'editor',
          label:'Editor富文本',
          icon:'el-icon-tickets',
          parent:{path:'/plugins',name:'plugins',label:'图表管理',icon:'el-icon-s-data'},
          component:EditorView
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '*',
      redirect:'/404'
    },
  ]

  //生成菜单
  let transformRoutesToMenus = (routes) =>{
        let route = routes[0];
        let children = route.children;
        let menusMap = {

        }

        children.forEach(item => {
            if(item.path == '') return false;
            if(!item.parent){
                let {path,name,label,icon} = item;
                menusMap[name] = {path,name,label,icon};
            }else{
                let parent = item.parent;
                let {path,name,label,icon} = item;
                if(menusMap[parent.name]){
                    menusMap[parent.name].children.push({path,name,label,icon})
                }else{
                    menusMap[parent.name] = parent;
                    menusMap[parent.name].children = [{path,name,label,icon}]
                }
            }
        });
        return Object.values(menusMap)
        
  } 
 

  
  export let menus = transformRoutesToMenus(routes);

  export default routes
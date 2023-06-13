import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home'
import LoginView from '../views/Login'
import NotFoundView from '../views/NotFound'
import HomeContentView from '../views/Home/Content'
import ProductListView from '../views/Product/ProductList'
import ProductSeachView from '../views/Product/ProductSeach'
import BannerAddView from '../views/Banner/BannerAdd'
import BannerListView from '../views/Banner/BannerList'
import BannerShowView from '../views/Banner/BannerShow'

Vue.use(VueRouter)

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
        component: HomeContentView
      },
      {
        path:'/product/productList',
        name:'productList',
        component:ProductListView
      },
      {
        path:'/product/productSeach',
        name:'productSeach',
        component:ProductSeachView
      },
      {
        path:'/banner/bannerAdd',
        name:'bannerAdd',
        component:BannerAddView
      },
      {
        path:'/banner/bannerList',
        name:'bannerList',
        component:BannerListView
      },
      {
        path:'/banner/bannerShow',
        name:'bannerShow',
        component:BannerShowView
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
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

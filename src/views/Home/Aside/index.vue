<template>
        <div class="aside-menu">
          <el-menu router :default-active="$route.path" :unique-opened="true">
           <template v-for="menu in authorityMenus" >
            <el-menu-item :index="menu.path" :key="menu.name" v-if="!menu.children"><i :class="menu.icon"></i>{{menu.label}}</el-menu-item>
            <el-submenu  :index="menu.path" :key="menu.name" v-else>
              <template slot="title">
                <i :class="menu.icon"></i>{{menu.label}}</template>
              <el-menu-item v-for="child in menu.children" :key="child.name" :index="child.path"><i :class="child.icon"></i>{{child.label}}</el-menu-item>
            </el-submenu>
           </template>
          </el-menu>
    
        </div>
  
</template>

<script>
// import {menus} from '@/router/router'
import { mapGetters } from 'vuex';
export default {
    name:'AsideMenuView',
    data() {
        return {
            // menus,
        }
    },
   computed:{
    ...mapGetters(['authorityMenus'])
   },
    mounted(){
      
    }
   

}
</script>

<style>

</style>
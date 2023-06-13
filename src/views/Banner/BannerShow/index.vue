<template>
    <div class="bannershow">
        轮播展示  
    <span class="demonstration">默认 Hover 指示器触发</span>
    <el-carousel height="200px">
      <el-carousel-item v-for="(item,index) in ImgList" :key="index">
        <el-image  style="width:100%; height:100%" :src="item.img" fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>

    </div>
  
</template>

<script>
import {getBannerListAPI} from '@/api/banner'
export default {
    name:'BannerShowView',
    data() {
        return {
            ImgList:[],
        }
    },
    methods: {
        getALLbannerList(){
            getBannerListAPI().then(res=>{
                this.ImgList = res.data
                
            }).catch(err=>{
                this.$message.error(err.message)
            })
        }
        
    },
    mounted() {
        this.getALLbannerList();
    },
}
</script>

<style>
.el-carousel{
    width: 400px;
    margin: 20px auto;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>
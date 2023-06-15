<template>
    <div class="bannershow">
        <div class="swiper my-swiper" ref="mySwiper">
            <div class="swiper-wrapper">
                <template v-for="item in list">
                    <div class="swiper-slide" :key="item.bannerid" v-if="item.flag" >
                        <img :src="item.img" alt="">
                    </div>
                </template>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>

            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>

            <!-- 如果需要滚动条 -->
            <!-- <div class="swiper-scrollbar"></div> -->
        </div>
    
    </div>
  
</template>

<script>
import {getBannerListAPI} from '@/api/banner'
import Swiper,{Autoplay,Pagination,Navigation} from "swiper";
export default {
    name:'BannerShowView',
    data() {
        return {
            list:[],
            mySwiper: null,
        }
    },
    methods: {
        getALLbannerList(){
            getBannerListAPI().then(res=>{
                this.list = res.data  
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
        initSwiper(){
            this.mySwiper = new Swiper(this.$refs.mySwiper,{
                // direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                autoplay:true,//自动播放
                observer:true,
                observeParents:true,//动态检查器
                modules:[Autoplay,Pagination,Navigation],
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // 如果需要滚动条
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            })
        }     
    },
    watch:{
        list(newVal){
            console.log("list数据改变",newVal);
            this.$nextTick(()=>{
                this.initSwiper();
            })
        }
    },
    mounted() {
        this.getALLbannerList();
    },
}
</script>

<style scoped>
@import url("swiper/css/bundle");

.my-swiper {
    width: 1000px;
    height: 500px;
}

.my-swiper img{
    width: 100%;
    height: 100%;
}
</style>
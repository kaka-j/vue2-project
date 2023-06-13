<template>
    <div class="bannerlist">
        轮播列表
        <el-button type="primary" @click="deleteAll">删除全部轮播数据</el-button>
        <el-table :data="list"  height="600px"  border>
            <el-table-column label="轮播图片" prop="link" width="180" align="center">
                <template v-slot="{ row }">
                    <el-image class="showImg" :src="row.img" :alt="row.alt"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="alt" label="商品信息" width="180" align="center"></el-table-column>
            <el-table-column prop="bannerid" label="轮播ID" width="180" align="center"></el-table-column>
        </el-table> 
    </div>
  
</template>

<script>
import {getBannerListAPI,deleteAllBannerListAPI} from '@/api/banner'
export default {
    name:'BannerListView',
    data() {
        return {
            list:[],
        }
    },
    methods: {
        getbannerList(){
            getBannerListAPI('').then(res=>{
                
                this.list = res.data
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
        deleteAll(){
            deleteAllBannerListAPI().then(res=>{
                console.log(res);
            }).catch(err=>{
                this.$message.error(err.message)
            })
        }
    },
    mounted() {
        this. getbannerList();
    },
}
</script>

<style>

.showImg{
    width: 100%;
    height: 100%;
}
</style>
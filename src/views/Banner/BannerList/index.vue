<template>
    <div class="bannerlist">
        <el-button type="primary" @click="deleteAll">删除全部轮播数据</el-button>

        <el-table :data="list" v-if="list.length" height="600px"  border>
            <el-table-column prop="bannerid" label="轮播ID" width="180" align="center"></el-table-column>
            <el-table-column label="轮播图片" prop="link" width="180" align="center">
                <template v-slot="{ row }">
                    <el-image class="showImg" :src="row.img" alt="">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="alt" label="商品信息" width="180" align="center"></el-table-column>
            <el-table-column prop="link" label="图片链接" width="180" align="center"></el-table-column>
            <el-table-column align="center" label="是否公开" prop="flag">
                <template v-slot="{row}">
                   <el-switch
                        v-model="row.flag"
                        @change="flagChangeHandler($event,row.bannerid)">
                   </el-switch>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template v-slot="{row}">
                   <el-button type="primary" size="small" @click="deleteHandler(row.bannerid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table> 
    </div>
  
</template>

<script>
import {getBannerListAPI,deleteAllBannerListAPI,updateBannerFlagAPI,deleteSomeoneBannerListAPI} from '@/api/banner'
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
                console.log(res);
                this.list = res.data
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
        async flagChangeHandler(flag,bannerid){
            try{
                var res = await updateBannerFlagAPI({bannerid,flag});
                console.log('flag状态更新',res);
                this.$message.success('更新成功')
            }catch(err){
                this.$message.error(err.message);
            }
        },
        async deleteHandler(bannerid){
            this.$confirm('是否删除当前轮播数据','提示').then(async ()=>{
                try{
                    var res = await deleteSomeoneBannerListAPI({bannerid});
                    console.log("轮播删除成功",res);
                    this.$message.success('删除成功');
                    // var index = this.list.find(v=> v.bannerid == bannerid);
                    // this.list.splice(index,1);
                    await this.getbannerList();
                }catch(err){
                    this.$message.error(err.message);
                }
            }).catch(err=>{
                console.log("点击了取消",err);
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
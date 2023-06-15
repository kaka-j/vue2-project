<template>
    <div class="product-list">
        <span>商品列表</span>
        <el-table :data="list"  height="520px"  border>
            <el-table-column prop="proid" label="商品编号" width="180" align="center"></el-table-column>
            <el-table-column prop="brand" label="商品店铺" width="180" align="center"></el-table-column>
            <el-table-column prop="category" label="商品分类" width="180" align="center"></el-table-column>
            <el-table-column label="商品图片" prop="img1" width="180" align="center">
                <template v-slot="{ row }">
                    <el-image class="showImg" :src="row.img1" :preview-src-list="[row.img1, row.img2, row.img3, row.img4]"
                        alt=""></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="originprice" label="商品原价" width="180" align="center"></el-table-column>
            <el-table-column prop="nowprice" label="商品现价" width="180" align="center">
                <template v-slot="{row}">
                    <span v-if="row.discount < 10">{{((row.originprice * row.discount)/10).toFixed(2)}}</span>
                    <span v-else>暂无折扣</span>  
                </template>
            </el-table-column>
            <el-table-column prop="stock" label="商品库存" width="180" align="center"></el-table-column>
            <el-table-column prop="sales" label="商品销量" width="180" align="center"></el-table-column>
            <el-table-column fixed="right" prop="isrecommend" label="开启推荐" width="100" align="center">
                <template v-slot="{row}">
                    <el-switch
                        v-model="row.isrecommend"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                        @change="updateRecommendHandler">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="开启秒杀" prop="isseckill" width="100" align="center">
                <template v-slot="{ row }">
                    <el-switch v-model="row.isseckill" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                        :inactive-value="0" @change="updateSeckillHandler"></el-switch>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="查看详情" prop="isseckill" width="100" align="center">
                <template v-slot="{row}">
                    <el-button type="primary" size="small" @click="detailHandler(row.proid)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-box">
            <el-pagination 
                background 
                layout="prev, pager, next,total,sizes,jumper" 
                :total="total"
                :current-page.sync="pageParams.count"
                :page-size.sync="pageParams.limitNum"
                :page-sizes="[5,10,20,50]"
                prev-text="上一页"
                next-text="下一页">
            </el-pagination>
        </div>
        <el-drawer title="商品详情" :visible.sync="drawer" :direction="direction">
            <el-main>
                <el-descriptions title="商品详情" direction="vertical" :column="1" border v-for="(item,index) in detailList" :key="index" >
                    <el-descriptions-item label="商品名称">{{item.proname}}</el-descriptions-item>
                    <el-descriptions-item label="商品简介">{{item.desc}}</el-descriptions-item>
                    <el-descriptions-item label="商品原价" :span="2">{{item.originprice}}</el-descriptions-item>
                    <el-descriptions-item label="商品现价">{{((item.originprice * item.discount)/10).toFixed(2)}}
                    </el-descriptions-item>
                    <el-descriptions-item label="商品店铺">{{item.brand}}</el-descriptions-item>
                </el-descriptions>
            </el-main>
        </el-drawer>
    </div>
</template>

<script>
import {getpeoListAPI,updateIsSecondkillAPI,updateIsrecommendkillAPI } from '@/api/proList'
import {getdetailListAPI} from '@/api/proList'
export default {
    name:'ProductListView',
    data() {
        return {
            pageParams:{
                count:1,
                limitNum:10,
            },
            list:[],
            total:null,
            detailList:[],
            drawer: false,  
           direction: 'rtl', 

        }
    },
    methods: {
        getproList(){
            getpeoListAPI(this.pageParams).then(res=>{
                let {data} = res;
                this.list = data;
                this.total = res.total;
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
        updateRecommendHandler(flag,proid){
            console.log("updateRecommendHandler", flag,proid);
            updateIsrecommendkillAPI({
                proid,
                flag:!!flag,
            }).then((res)=>{
                console.log("更新秒杀",res);
            }).catch(err=>{
                this.$message.error(err.message);
            })
        },
        updateSeckillHandler(flag,proid){
            console.log("updateRecommendHandler", flag);
            updateIsSecondkillAPI({
                proid,
                flag:!!flag,
            }).then((res)=>{
                console.log("更新秒杀",res);
            }).catch(err=>{
                this.$message.error(err.message);
            })
        },
        detailHandler(proid){
            this.drawer = true;
            getdetailListAPI({proid:proid}).then(res=>{
                this.detailList = res.data
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
    },
    watch:{
        pageParams:{
            handler(newVal){
                console.log('pageParams改变了',newVal);
                this.getproList();
            },
            deep:true,
        }
    },
    mounted() {
        this.getproList()
    },

}
</script>

<style>
.showImg{
    width: 50px;
    height: 50px;
}

</style>
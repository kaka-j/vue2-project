<template>
    <div class="product-seach">
        <el-form label-width="80px" inline size="small">
            <el-form-item label="搜索">
                <el-input v-model="searchParams.search"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="searchParams.category" placeholder="分类">
                    <el-option label="全部" value="">
                    </el-option>
                    <el-option
                    v-for="(item,index) in categoryList"
                    :key="index"
                    :label="item.trim()"
                    :value="item.trim()">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="SearchList">搜索</el-button>
                <el-button type="primary" @click="restinput">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data=" searchList"  height="520px"  border>
            <el-table-column prop="proid" label="商品编号" width="180" align="center"></el-table-column>
            <el-table-column prop="brand" label="商品店铺" width="180" align="center"></el-table-column>
            <el-table-column prop="category" label="商品分类" width="180" align="center"></el-table-column>
            <el-table-column label="商品图片" prop="img1" width="180" align="center">
                <template v-slot="{ row }">
                    <el-image class="showImg" :src="row.img1" :preview-src-list="[row.img1, row.img2, row.img3, row.img4]"
                        alt=""></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="originprice" label="商品原件" width="180" align="center"></el-table-column>
            <el-table-column prop="nowprice" label="商品现件" width="180" align="center">
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
import {getSearchProListAPI,SearchKeywordListAPI} from '@/api/SearchList'
import {getdetailListAPI} from '@/api/proList'

export default {
    name:'ProductSeachView',
    data() {
        return {
           searchParams:{
            search:'',
            category:'',
           },
           categoryList:[],
           searchList:[],
           drawer: false,  
           direction: 'rtl', 
           detailList:[],
        }
    },
    methods: {
        getSearchKeywordList(){
            SearchKeywordListAPI({
                search:this.searchParams.search,
                category:this.searchParams.category
                }).then(res=>{
                  this.searchList = res.data
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
        getSearchList(){
            getSearchProListAPI().then(res=>{
                this.categoryList = res.data
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
        SearchList(){
            this.getSearchKeywordList()
        },
        restinput(){
           this.searchParams.search = '',
           this.searchParams.category = '全部'
        },
        updateRecommendHandler(flag){
            console.log("updateRecommendHandler", flag);
        },
        updateSeckillHandler(flag){
            console.log("updateRecommendHandler", flag);
        },
        detailHandler(proid){
            this.drawer = true;
            getdetailListAPI({proid:proid}).then(res=>{
                console.log(res.data);
                this.detailList = res.data
            }).catch(err=>{
                this.$message.error(err.message)
            })
        },
       
    },
    mounted() {
        this.getSearchList();
        this.getSearchKeywordList()
    },
   

}
</script>

<style>

</style>
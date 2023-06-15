<template>
    <div class="admin-list">
        
        <el-table :data="list" v-if="list.length" height="600px"  border>
            <el-table-column prop="adminid" label="管理员id" width="180" align="center" ></el-table-column>
            <el-table-column prop="adminname" label="管理员名称" width="180" align="center"></el-table-column>
            <el-table-column prop="role" label="管理员等级" width="180" align="center"></el-table-column>
            <el-table-column prop="password" label="管理员密码" width="180" align="center"></el-table-column>
            <el-table-column align="center" label="删除管理员">
                <template v-slot="{row}">
                   <el-button type="primary" size="small" @click="deleteAdmin(row.adminid)" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table> 

    </div>
</template>

<script>
import {getAdminListAPI,deleteAdminAPI} from '@/api/admin'
export default {
    name:'AdminListView',
    data() {
        return {
            list:[],
           
        }
    },
    methods: {
        async getAdminList(){
            try{
                var res = await getAdminListAPI();
                this.list = res.data;
            }catch(err){
                this.$message.error(err.message)
            }
        },
        deleteAdmin(adminid){
            deleteAdminAPI({adminid:adminid}).then(res=>{
                console.log(res);
                this.getAdminList()
            }).catch(err=>{
                this.$message.error(err.message)
            })
        }
    },
    mounted() {
        this.getAdminList()
    },

}
</script>

<style>

</style>
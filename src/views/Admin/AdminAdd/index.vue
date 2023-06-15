<template>
    <div class="admin-add">
        
        <el-form label-width="100px" size="small" ref="adminForm" :model="  adminParams" class="adminForm">
      <el-form-item  label="管理员名称" prop="adminname">
        <el-input v-model=" adminParams.adminname"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="password">
    <el-input  v-model="adminParams.password" show-password></el-input>
      </el-form-item>
      <el-form-item  label="管理员等级" prop="role">
                <el-select v-model="adminParams.role" placeholder="请选择" clearable @change="roleChangeHandler">
                    <el-option label="超级管理员" value="1"></el-option>
                    <el-option label="普通管理员" value="2"></el-option>
                    <el-option label="普通用户" value="3"></el-option>
                </el-select>
            </el-form-item>
      <el-form-item label="权限菜单" prop="checkedkeys">
        <el-tree :data="menus" :props="defaultProps" show-checkbox ref="tree" node-key="path"  default-expand-all></el-tree>
      </el-form-item>

      <el-form-item>
          <el-button type="primary" @click="submitHanler">添加</el-button>
          <el-button type="primary" @click="resetHander">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
import {menus} from '@/router/router'
import {addAdminAPI} from '@/api/admin'
export default {
    name:'AdminAddView',
    data() {
        return {
            adminParams:{
                adminname:'',
                password:'',
                role:'',
                checkedKeys:[],
            },
            menus,
            defaultProps:{
                    label:"label",
                    children:"children",
            },
            rules:{
                adminname:[
                    {required:true,message:"请输入管理员名称",trigger:"blur"},
                    {pattern:/^[a-zA-Z_]\w{4,5}$/,message:"管理员名称由字母 数字 下划线组成,5-6位",trigger:"blur"}
                ],
                password:[
                    {required:true,message:"请输入管理员密码",trigger:"blur"},
                    {pattern:/^\w{4,12}$/,message:"密码由字母 数字 下划线组成,4-12位",trigger:"blur"}
                ],
                role:[
                    {required:true,message:"请选择管理员等级",trigger:"blur"},
                    {pattern:/^[012]$/,message:"请选择管理员等级",trigger:"change"}
                ],
                checkedKeys:[
                    {type:"array",required:true,message:"请选择管理员权限",trigger:"blur"},
                ]
            }
        }
    }, 
    methods: {
        async addAdmin(){
            try{
                var res = await addAdminAPI(this.adminParams);
                this.list = res.data;
                this.$message.success('添加管理员成功')
            }catch(err){
                this.$message.error(err.message)
            }
        },
        roleChangeHandler(role){
            switch(role){
                case '':
                    this.$refs.tree.setCheckedKeys([]);
                    break;
                case '3': //普通用户
                    this.$refs.tree.setCheckedKeys(['/content','/product/productList','/banner/bannerList','/plugins']);
                    break;
                case '1'://超级管理员
                    this.$refs.tree.setCheckedKeys(['/content','/admin','/product','/banner','/plugins']);
                    break;
                case '2'://普通管理员
                    this.$refs.tree.setCheckedKeys(['/content','/product','/banner','/plugins']);
                    break;
            }   
            this. adminParams.checkedKeys = this.$refs.tree.getCheckedKeys();
        },
        submitHanler(){
            this.$refs.adminForm.validate((bool)=>{
                console.log("bool",bool);
                this.addAdmin().then(()=>{
                    this.resetHander();
                })
            })
        },
        resetHander(){
                // 重置 表单
                this.$refs.adminForm.resetFields();
                // 重置 树状图
                this.$refs.tree.setCheckedKeys([]);
        }
    },

}
</script>

<style>
.adminForm{
    width: 40%;
}

</style>
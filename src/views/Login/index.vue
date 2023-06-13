<template>
  <div class="login">
    <div class="login-sigin">
      <el-form label-width="100px" ref="loginForm" :model="loginParams" :rules="rules" :status-icon="true">
        <h2>登录</h2>
        <el-form-item label="用户名" prop="adminname">
          <el-input v-model="loginParams.adminname" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input type="password" v-model="loginParams.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {

    let validatePass = (rule, value, callback) => {
      let reg = /^\w{5,12}$/;
      if (!value) {
        callback('密码不能为空')
      } else if (value.length < 5 || value.length > 12) {
        callback('密码长度为5到12位')
      } else if (!reg.test(value)) {
        callback('密码由字母，数字，下划线组成')
      } else {
        callback()
      }
    }
    return {
      loginParams: {
        adminname: '',
        password: '',
      },
      rules: {
        adminname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '用户名长度为5到12位', trigger: 'blur' },
          { pattern: /^[a-zA-Z_]\w{4,11}$/, message: '用户名由数字，字母，下划线组成，且不能以数字开头', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(["loginAndUpdateInfo"]),
    submitForm() {
      this.$refs.loginForm.validate((bool, failField) => {
        console.log(failField);
        if (bool) {
          this.loginAndUpdateInfo({
            adminname:this.loginParams.adminname,
            password:this.loginParams.password
          }).then(()=>{
            let {RetrunUrl} = this.$route.query;
            if(RetrunUrl){
              this.$router.replace(RetrunUrl)
            }else{
              this.$router.push('/')
            }
            this.$message({
                message:'登录成功',
                type:'success',
                duration:1000,
                showClose:true
            })
          }).catch((err)=>{
            this.$msgbox({
              title:"错误",
              type:'error',
              message:err.message
            })
          })
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/bgc-4.png) no-repeat top;
  background-size: 100% 100%;
}

.login-sigin {
  width: 500px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #fff;
}

h2{
  text-align: center;
  font-size: 28px;
  padding-top: 10px;
}
.el-form-item:nth-of-type(1) {
  margin-top: 40px;
}

.el-input {
  width: 300px;
}
</style>
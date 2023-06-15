<template>
  <div class="home">
    <el-container style="height: 750px; border: 1px solid #eee" >
      <el-header style="text-align: right;  font-size: 12px">
        <el-dropdown @command="handleCommand">
          <span>
            <span>{{userInfo.adminname}}</span>
            <i class="el-icon-s-home" style="margin-left: 15px"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item :command="1">查看</el-dropdown-item>
            <el-dropdown-item :command="2">新增</el-dropdown-item>
            <el-dropdown-item :command="3">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px"  style="background-color: rgb(238, 241, 246)">
          <aside-menu></aside-menu>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import AsideMenu from "./Aside"
export default {
  name: 'HomeView',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
    }
  },
  methods: {
    ...mapActions(['exitAndUpdateInfo', 'getAndUpdateAuthorityInfo']),
    handleCommand(command) {
      if (command == 3) {
        this.exitAndUpdateInfo();
        this.$router.push('/login');
      }
    },
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['userInfo']),
  },
  created() {
    this.getAndUpdateAuthorityInfo();
  },
  mounted() {
    if (!this.isLogin) {
      this.$message({
        message: '您还没有登录，请先登录',
        type: 'error',
        duration: 1000
      });
      this.$router.push({ name: 'login', query: { ReturnUrl: this.$route.fullPath } });
    }
  },
  components:{
    AsideMenu,
  }
}
</script>

<style scoped>
.el-header {

  background-color: #2890ff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-dropdown{
  color: #fff;
  font-size: 14px
}
</style>
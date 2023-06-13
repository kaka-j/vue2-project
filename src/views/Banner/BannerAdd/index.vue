<template>
    <div class="banneradd">   
      <el-radio-group v-model="type" size="small" class="group">
      <el-radio-button label="local">本地上传</el-radio-button>
      <el-radio-button label="online">线上图片</el-radio-button>
      </el-radio-group>


    <el-form label-width="80px" size="small" ref="uploadForm" :model=" searchParams" class="uploadForm">
     <el-form-item v-if="type == 'local'" label="图片地址" prop="img" 
      :rules="[{required: true,message:'请传入图片地址',trigger:'blur'}]">
        <el-upload
          class="upload-demo" ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          :file-list="fileList"
          :on-change="uploadChangeHandler"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
     </el-form-item>

      <el-form-item v-else label="图片地址" prop="img" :rules="[{ required: true,message:'请传入图片地址',trigger:'blur'}]">
        <el-input v-model="searchParams.img"></el-input>
      </el-form-item>
      <el-form-item label="提示信息" prop="alt" :rules="[{ required: true,message:'请传入图片提示',trigger:'blur'}]">
        <el-input v-model="searchParams.alt"></el-input>
      </el-form-item>
      <el-form-item label="图片链接" prop="link" :rules="[{ required: true,message:'请传入图片链接',trigger:'blur'}]">
        <el-input v-model="searchParams.link"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="AddbannerList">确认新增</el-button>
          <el-button type="primary" @click="resetHander">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
import {AddBannerListAPI} from '@/api/banner'
export default {
    name:'BannerAddView',
    data() {
        return {
            searchParams:{
              img:'',
              alt:'',
              link:''
            },
            type:'local',
            fileList:[],
        }
    },
    methods: {
      async AddBannerListAPI(){
        try{
          await AddBannerListAPI(this.searchParams);
          this.$message.success('上传成功')
        }catch(err){
          this.$message.error(err.message)
        }
      },
      AddbannerList(){
          this.$refs.uploadForm.validate((bool)=>{
            if(bool){
              this.AddBannerListAPI();
              this.resetHander();
              this.fileList = [];
            }
          })
      },
      uploadChangeHandler(file){
        let raw = file.raw;
        var fr = new FileReader();
        fr.readAsDataURL(raw);
        fr.onload = () =>{
          console.log("转化成功",fr);
          this.searchParams.img = fr.result;
        }
      },
      resetHander(){
          this.$refs.uploadForm.resetFields();
      }
    },



    
}

</script>

<style>
.uploadForm{
        width: 40%;
}

.group{
  margin-bottom: 20px ;
}
</style>
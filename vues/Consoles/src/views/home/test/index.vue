<template>
  <div class="test-container">
    <div class="wrap">
      <div class="introduce">生成验证码</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="验证码" prop="vaildate" required>
          <el-col :span="4">
            <el-input v-model="form.validate"></el-input>
          </el-col>
          <el-col :span="4">
            <span style="display:inline-block;width:80px;height:40px;background:red;margin-left:10px;cursor:pointer" title="点击更换验证码" @click.prevent="getValidate"></span>
            <img :src="validateImage"/>
          </el-col >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="wrap">
      <div class="introduce">测试axios下载文件</div>
      <el-button @click="testdownload">点击下载</el-button>
    </div>
    <div class="wrap">
      <div class="introduce">测试vue鼠标左键和右键</div>
      <div @click.left="left" @click.right.prevent.stop="right">
        鼠标左键和右键点击这段文字
      </div>
    </div>
  </div>
</template>

<script>
import {
  downloadfile,
  getData,
  getValidateCode
} from 'api/test'
export default {
  name: 'test',
  data: function () {
    return {
      validateImage:'http://localhost:9000/test/getValidateCode',
      form:{
        validate:''
      }
    }
  },
  mounted () {
    this.getValidate();
  },
  methods: {
    // 获取验证码图片
    async getValidate(){
      this.validateImage = `http://localhost:9000/test/getValidateCode?${Date.now()}`;
      // await getValidateCode()
      // this.$nextTick(()=>{
      //   this.validateImage='http://localhost:9000/test/getValidateCode'
      // })
    },
    async onSubmit(){

    },
    testdownload () {
      downloadfile({
        name: 'test'
      }).then(res => {
        let url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
          })
        )
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'abcd.xlsx')
        document.body.appendChild(link)
        link.onclick = function () {
          console.log('下载了，显示按钮');
        }
        link.click()
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); //释放掉blob对象
      })
    },
    left () {
      alert(1);
    },
    right () {
      alert(2);
    },
  }
}
</script>

<style scoped lang="scss">
@import "~style/base";
.wrap {
  border: 1px solid rgba(219, 66, 66, 0.5);
  padding: 40px;
  margin-bottom: 20px;
}
</style>

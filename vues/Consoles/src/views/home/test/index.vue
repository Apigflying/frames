<template>
  <div class="test-container">
    <div class="wrap">
      <div class="introduce">生成验证码</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="验证码" prop="vaildate" :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' ,validator : validateCode},
          ]">
          <el-col :span="4">
            <el-input v-model="form.validate" :maxlength='6'></el-input>
          </el-col>
          <el-col :span="4">
            <img class="validate-code" :src="validateImage" alt="验证码" title="点击更换验证码" @click.prevent="getValidate" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">验证</el-button>
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
  getValidateCode,
  testSession
} from 'api/test';
import loadingSvg from '../../../../static/image/loading.svg';
export default {
  name: 'test',
  data: function () {
    return {
      validateImage: loadingSvg,
      form: {
        validate: ''
      }
    }
  },
  mounted () {
    this.getValidate();
  },
  methods: {
    validateCode (rule, values, callback) {
      // 用户输入的验证码
      let value = this.form.validate.trim();
      if (value === '') {
        callback(new Error('请输入验证码！'));
      } else if (value.length > 6) {
        callback(new Error('输入长度不能超过6个呢！'));
      } else {
        callback();
      }
    },
    // 获取验证码图片
    async getValidate () {
      this.validateImage = loadingSvg;
      let {
        data
      } = await getValidateCode();
      this.validateImage = data;
    },
    async onSubmit () {
      this.$refs.form.validate(async (validate) => {
        if (validate) {
          let validateCode = this.form.validate.trim();
          let {
            data
          } = await testSession({
            validateCode
          });
          if (data.success) {
            this.$message({
              type: 'success',
              message: '验证成功！'
            })
          } else {
            this.getValidate();
            this.$message({
              type: 'error',
              message: '验证码有误，请重新输入！'
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })

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
.validate-code {
  display: inline-block;
  height: 40px;
  width: 100px;
  margin-left: 10px;
  cursor: pointer;
}
</style>

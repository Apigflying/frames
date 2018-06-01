<template>
  <div class="Login">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username">
        <i class="fa fa-user-o"></i>
        <el-input class="custom-input" name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" @keyup.enter.native="handleLogin"/>
      </el-form-item>
      <el-form-item prop="password">
        <i class="fa fa-key"></i>
        <el-input class="custom-input" name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
        <i class="fa  password" :class="passwordType?'fa-eye':'fa-eye-slash'" @click="changePsType"></i>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: 'login',
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      loginRules: {
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  computed:{...mapGetters(['beforeUrl'])},
  methods: {
    changePsType(){
      console.log(this.passwordType);
      this.passwordType = this.passwordType?'':'password'
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername',{
            name:this.loginForm.username
          }).then(res => {
            this.loading = false
            console.log(res);

            if (!!res.token) {
              this.$router.replace(this.beforeUrl)
            } else {
              this.$message.error(res.message);
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import "../../style/base";
.Login {
  @include wh(100%,100%);
  background: #2d3a4b;
  display: flex;
  .login-form {
    @include center;
    top: 40%;
    .title {
      text-align: center;
      margin-bottom: 20px;
    }
    .el-form-item {
      position: relative;
      width: 400px;
      margin-bottom: 20px;
      .fa {
        position: absolute;
        color: #889aa4;
        z-index: 2;
        @include center;
        left: 20px;
      }
      .password{
        left:auto;
        right:10px;
      }
      .el-input {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        .el-input__inner {
          background-color: transparent;
          outline: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding:0 40px;
        }
      }
    }
  }
}
</style>

<template>
  <header>
    <h1>标题</h1>
    <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogout">退出</el-button>
  </header>
</template>

<script>
import { setToken } from "utils/auth";
export default {
  name: 'cheader',
  data: function() {
    return {
    }
  },
  methods:{
    handleLogout(){
      setToken('');
      this.$router.push('/login')
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">

</style>

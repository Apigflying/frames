<template>
  <header>
    <h1>标题</h1>
    <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogout">退出</el-button>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: 'cheader',
  data: function() {
    return {
    }
  },
  methods:{
    ...mapMutations(['LOGO_OUT']),
    handleLogout(){
      this.LOGO_OUT();
      this.$router.push('/login')
    }
  },
  mounted() {
    // this.$message({
    //   type:'success',
    //   message:'欢迎您'
    // })
  }
}
</script>

<style scoped lang="scss">

</style>

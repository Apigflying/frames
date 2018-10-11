<template>
  <header class="header">
    <h1>{{title}}</h1>
    <el-button type="primary" @click.native.prevent="handleLogout">
      退出
    </el-button>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: 'cheader',
  props: ['title'],
  data: function () {
    return {

    }
  },
  methods: {
    ...mapMutations(['LOGO_OUT']),
    handleLogout () {
      this.LOGO_OUT();
      this.$router.push('/login')
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
@import "~style/base.scss";
.header {
  @include wh(100%, 50px);
  @include fj;
}
</style>

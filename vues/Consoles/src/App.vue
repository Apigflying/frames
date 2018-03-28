<template>
  <div id="app">
    <cHeader/>
    <cNav/>
    <router-view/>
    <cFooter/>
  </div>
</template>

<script>
//页面的公共展示组件
import cHeader from 'views/common/header'
import cFooter from 'views/common/footer'
import cNav from 'views/common/nav'
export default {
  name: 'app',
  components:{
    cHeader,cFooter,cNav
  }
}
</script>

<style lang="scss" scoped>
@import './style/base';
#app{
  width:100%;
  min-height: 100%;
  overflow: hidden;
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
//页面的公共展示组件

export default {
  name: 'app',
}
</script>

<style lang="scss" scoped>
@import "./style/base";
#app {
  width: 100%;
  height:100%;
  min-height: 100%;
}
</style>

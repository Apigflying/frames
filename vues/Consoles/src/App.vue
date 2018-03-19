<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
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

<template>
  <div class="container" style="background-color:#000;width:100%;height:100%;display:flex;">
    <img v-lazy="'../../../static/image/404.jpg'" style="display:block;margin:auto;">
  </div>
</template>

<script>
export default {
  name: '404',
  data: function () {
    return {
      imgUrl:''
    }
  },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../style/base";
</style>

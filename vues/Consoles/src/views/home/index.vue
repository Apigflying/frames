<template>
  <div class="container">
    <cHeader/>
    <cNav/>
    <img v-lazy="'../../../static/image/loading.svg'" src="" style="width:100px;height:100px;"/>
    <router-view/>
    <cFooter/>
  </div>
</template>

<script>
import cHeader from 'views/common/header'
import cFooter from 'views/common/footer'
import cNav from 'views/common/nav'
export default {
  name: 'home',
  components: {
    cHeader,
    cFooter,
    cNav
  },
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

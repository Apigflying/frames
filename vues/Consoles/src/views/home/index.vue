<template>
  <div class="container">
    <cHeader/>
    <cNav/>
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
    }
  },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../style/base";
</style>

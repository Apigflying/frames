<template>
  <div class="container">
    <cHeader :title="title"/>
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
  watch: {
    $route (to) {
      switch (to.name) {
        case 'element-ui':
          this.title = 'element-ui组件库'
          break;
        case 'pathb':
          this.title = 'pathb测试专用'
          break;
      }
    }
  },
  data: function () {
    return {
      title: 'element-ui组件库'
    }
  },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "../../style/base";
</style>

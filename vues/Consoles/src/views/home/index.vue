<template>
  <div class="container">
    <cHeader :title="title"/>
    <cNav/>
    <router-view/>
    <cFooter/>
  </div>
</template>

<script>
import cHeader from 'views/home/common/header';
import cFooter from 'views/home/common/footer';
import cNav from 'views/home/common/nav';
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
        case 'test':
          this.title = 'test'
          break;
      }
    }
  },
  data: function () {
    return {
      title: 'element-ui组件库',
      show: true
    }
  },
  mounted () { },
  methods: {

  }
}
</script>

<style scoped lang="scss">
@import "~style/base";
</style>

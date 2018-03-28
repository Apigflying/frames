<template>
  <nav>
    <router-link v-for="item,index in nav" :to="item.path||{name:item.pathName}" :key="index">{{item.name}}</router-link>
  </nav>
</template>

<script>

export default {
  name: 'cnav',
  data: function () {
    return {
      nav: [{
        name: '视图1',
        path: '/patha'
      }, {
        name: '视图2',
        pathName: 'pathb'//依据路由中定义组件的name进行跳转
      }]
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">

</style>

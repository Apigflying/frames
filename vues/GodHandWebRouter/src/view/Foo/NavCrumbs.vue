<template>
<div class="navcrumbs">
  <ul>
    <li v-for="(item,index) in NavList" :key="index" @click="toRouter(item.path)">
      {{item.name}}
    </li>
  </ul>
</div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: 'NavCrumbs',
  data: function() {	
    return {
    }
  },
  computed:{
    ...mapGetters(['NavList'])
  },
  methods: {
    ...mapActions(['ToRouter']),
    toRouter(path){
      this.$router.push(path)
      this.ToRouter(path)
    }
  },
}
</script>
<style scoped lang="less">
.navcrumbs{
  float: left;
  li{
    float:left
  }
}
</style>
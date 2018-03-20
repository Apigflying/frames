<template>
<div>
  <nav class="navs clear">
    <div v-for="item,index in navs" :key="index" :ref="'item'+item" @click="toEle(item)">
      {{item}}
    </div>
  </nav>
  <scroll class="wrapper" :data="data" :pulldown="pulldown" @pulldown="loadData">
    <ul class="content">
      <li v-for="item in data">{{item}}</li>
    </ul>
    <div class="loading-wrapper"></div>
  </scroll>
  <!-- <div class="wrap" ref="wrap">
    <ul class="content">
      <li v-for="item,index in navs" :ref="'item'+item">
        {{item}}
      </li>
    </ul>
  </div> -->
</div>
</template>
<script>
export default {
  data () {
    return {
      data: [],
      navs:[1,2,3,4,5,6],
      pulldown: true
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    toEle(val){
      console.log(this.$refs['item'+val][0]);
      this.$children[0].scrollToElement(this.$refs['item'+val][0]);
    },
    loadData () {
      this.requestData().then((res) => {
        this.data = res.concat(this.data)
      })
    },
    requestData () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([1, 2, 3, 4, 5, 6])
        }, 2000);
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../style/base';
.navs {
  @include wh(80%,40px);
  div{
    border-right:1px solid red;
    float: left;
    @include wh(40/$rem,40px);
    text-align: center;
    line-height: 40px;
    position: relative;
    z-index: 2;
  }
}
.wrapper{
  @include wh(400/$rem,200px);
  border:1px solid blue;
  overflow: hidden;
  li{
    position: relative;
    z-index: 1;
    @include wh(100%,180px);
    margin-bottom:20px;
    border:1px solid black;
  }
}
</style>


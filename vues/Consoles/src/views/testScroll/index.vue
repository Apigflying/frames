<template>
<div>
  <nav class="navs clear">
    <div v-for="item,index in navs" :key="index" @click="toEle(item)">
      {{item}}
    </div>
  </nav>
  <div class="wrap" ref="wrap">
    <ul class="content">
      <li v-for="item,index in navs" :ref="'item'+item">
        {{item}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import  BScroll from 'better-scroll'
export default {
  name: 'testScroll',
  data: function() {
    return {
      navs:[1,2,3,4,5,6,7,8,9],
      renderData: null,
      scroll:null
    }
  },
  mounted() {
    this.$nextTick(()=>{
      let wrap = this.$refs.wrap;
      this.scroll = new BScroll(wrap,{
        probeType:3,
        startX:0,
        startY:0,
        click:true
      })
    })
  },
  methods: {
    toEle(val){
      let ele = this.$refs['item'+val][0];
      this.scroll.refresh();
      this.$nextTick(()=>{
        this.scroll.scrollToElement(ele,2000);
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
.wrap{
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

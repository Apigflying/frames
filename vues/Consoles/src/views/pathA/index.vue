<template>
<div>
  abc
</div>
</template>

<script>

export default {
  name: 'pathA',
  data: function() {
    return {
      renderData: null,
      otherRender: '',
      renderData:null,
      renderList:[1,2,3,4,5]
    }
  },
  mounted() {
    var setData = this.getDatas();
    setInterval(setData,1000)
  },
  methods: {
    getDatas(){
      let n=0;
      return ()=>{
        console.log(n++);
      }
    },
    abc(){}
  }
}
</script>

<style scoped lang="scss">
@import '../../style/base';
.chartsTest {
  @include wh(500px, 500px);
  border: 1px solid red;
}

.abc {
  width: 100px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  border: 1px solid #fff;
}
</style>

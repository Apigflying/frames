<template>
<div>
  <button @click.prevent="showDialog">点击测试</button>
  <cDialog title="头部" :isDialogShow="isDialogShow" @closeDialog="closeDialog">
    <!-- <div slot="custom">
      自定义内容
    </div>
     -->
     <div>这个是公用的</div>
     <cCustom slot="custom" title="这个是自定的易容"/>
  </cDialog>
</div>
</template>

<script>
import cDialog from 'components/dialog/dialog'
import cCustom from 'components/customs'
export default {
  name: 'pathA',
  components:{
    cDialog,cCustom
  },
  data: function() {
    return {
      isDialogShow:false,
      renderData: null,
      otherRender: '',
      renderData:null,
      renderList:[1,2,3,4,5]
    }
  },
  mounted() {
  },
  methods: {
    showDialog(){
      this.isDialogShow = !this.isDialogShow;
    },
    closeDialog(val){
      this.isDialogShow = val;
    },
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

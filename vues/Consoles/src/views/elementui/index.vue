<template>
<div class="element-ui">
  <div>
    select组件
    <cSelect :options="selects.selectOptions" @select="changeSelect"/>
  </div>
</div>
</template>

<script>
import cSelect from 'components/select'
export default {
  name: 'ElementUI',
  components:{
    cSelect
  },
  data: function() {
    return {
      selects:{
        select:'',
        selectOptions:[{
          label:'选项一',
          value:'1'
        },{
          label:'选项二',
          value:'2'
        },{
          label:'选项三',
          value:'3'
        }]
      }
    }
  },
  mounted() {

  },
  methods: {
    changeSelect(select){
      this.selects.select = select;
      console.log(select);

    }
  }
}
</script>

<style scoped lang="scss">
@import '../../style/base';

</style>

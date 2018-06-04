<template>
<div class="checkbox-group-wrap">
  <el-checkbox class="isAllChecked" v-if="!!options.isAllChecked" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
    全选
  </el-checkbox>
  <el-checkbox-group class="checkbox-group" v-model="options.checked" @change="checksChange">
    <el-checkbox v-for="(item,index) in options.checkList" :key="index" :label="item" :disabled="item.disabled">
      {{item.value}}
    </el-checkbox>
  </el-checkbox-group>
</div>
</template>
<script>
/*
  options:{
    isAllCheck:true, // 控制是否有全选项
    checked:[],  // 对外输出的已选项
    // 所有的选项
    checkList:[{
      label:'1',
      value:'选项一'
    },{
      label:'4',
      value:'选项四'
    }]
  }
*/
export default {
  props: {
    options: Object,
  },
  data () {
    return {
      isIndeterminate:false, // 部分被选择 为true，展示位 - ；全部被选择或者全部没被选，应为false，即复选框置空；
      checkAll: false // 全选框是否全选
    }
  },
  methods: {
    // 选择一个选项事件
    checksChange (value) {
      let checkedCount = value.length;
      let checkList = this.options.checkList;
      this.checkAll = checkedCount === checkList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < checkList.length;
      // 触发自定义事件
      this.$emit('change', value);
    },
    // 全选事件
    handleCheckAllChange (boolean) {
      this.options.checked = boolean ? this.options.checkList : [];
      this.checksChange(this.options.checked)
    }
  }
}
</script>

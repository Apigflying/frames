<template>
  <el-select v-model="select" v-bind="$attrs" @change="change" class="selects">
    <el-option v-for="(item) in selectOptions" :key="item.value" :label="item.label" :value="item" :disabled="item.disabled">
    </el-option>
  </el-select>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value:{
      type:Object
    },
    "select-options":{
      type:Array,
      default:[]
    }
  },
  computed:{
    select:{
      get (){
        return this.value;
      },
      set (value){
        // this.change(value);
        return value;
      }
    }
  },
  methods: {
    change (item) {
      this.$emit('input',item);
    }
  }
};
</script>
<style lang="less">
// 通用组件 覆盖样式用
</style>

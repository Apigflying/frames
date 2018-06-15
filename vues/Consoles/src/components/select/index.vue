<template>
  <el-select v-model="options.select" v-bind="$attrs" @change="change" class="selects">
    <el-option v-for="(item) in options.selectOptions" :key="item.value" :label="item.label" :value="item" :disabled="item.disabled">
    </el-option>
  </el-select>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    options:{
      type:Object,
      default: {
        placeholder:'请选择',
        // 最终选择的项
        select: null,
        // 可选项
        selectOptions: []
      }
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    change (item) {
      this.$emit('change',item);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/base.scss';
// 通用组件 覆盖样式用
.selects{
  @include wh(400px,40px);
}
</style>


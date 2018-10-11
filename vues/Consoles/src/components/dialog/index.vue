<template>
<div>
  <slot name="open"></slot>
  <el-dialog v-bind="$attrs" :title="title" :visible.sync="value" width="50%" :before-close="closeDialog">
    <slot></slot>
    <slot name="footer"></slot>
  </el-dialog>
</div>
</template>

<script>
export default {
  props: ['value','title'],
  methods: {
    //关闭弹窗
    closeDialog () {
      this.$emit('input',!this.value)
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/base.scss";
</style>

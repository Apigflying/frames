<template>
<div>
  <slot name="open"></slot>
  <el-dialog :title="title" :visible.sync="isDialogShow" width="50%" :before-close="closeDialog">
    <slot></slot>
    <slot name="custom"></slot>
  </el-dialog>
</div>
</template>

<script>
export default {
  props: ['title','isDialogShow'],
  methods: {
    //关闭弹窗
    closeDialog () {
      this.$emit('closeDialog',!this.isDialogShow)
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/base.scss";
</style>

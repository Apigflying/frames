<template>
  <div>
    这个是自定义的组件
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  props: ['title'],
};
</script>
<style lang="scss" scoped>
@import "../../style/base.scss";
</style>

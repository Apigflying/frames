<template>
  <el-select v-model="value" :placeholder="placeholder" @change="change" class="selects">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" :disabled="item.disabled">
    </el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    placeholder:{
      default:'请选择'
    },
    options: {
      type: Array,
      required: true,
      default: []
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    change (item) {
      this.$emit('select',item);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/base.scss';
// 覆盖样式用
.selects{
  // @include wh(100px,200px);
}
</style>


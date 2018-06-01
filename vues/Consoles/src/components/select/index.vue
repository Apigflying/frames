<template>
  <el-select v-model="value" placeholder="请选择" @change="change">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
    </el-option>
  </el-select>
</template>
<script>
export default {
  props: {
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
    change (value) {
      console.log(value);
    }
  }
}
</script>

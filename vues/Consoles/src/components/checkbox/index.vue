<template>
<div class="checkbox-group-wrap" v-show="!!value.length">
  <el-checkbox class="isAllChecked" v-if="checkAll" :indeterminate="isIndeterminate" v-model="isCheckAll" @change="handleCheckAllChange">
    全选
  </el-checkbox>
  <el-checkbox-group class="checkbox-group" v-model="cChecks">
    <el-checkbox v-for="(item,index) in value" :key="index" :label="item.label" :disabled="item.disabled">
      {{item.value}}
    </el-checkbox>
  </el-checkbox-group>
</div>
</template>
<script>
var getChecks = (value) => {
  return value.filter(item => item.isCheck).map(item => item.label)
}
export default {
  props: {
    value: Array,
    checkAll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    // 初始化（为了兼容初始选项）
    let checkList = this.value;
    let checks = getChecks(checkList);
    let checkedCount = checks.length;
    let isIndeterminate = checkedCount > 0 && checkedCount < checkList.length;
    let isCheckAll = checkedCount === checkList.length;
    return {
      checks,
      isIndeterminate, // 部分被选择 为true，展示位 - ；全部被选择或者全部没被选，应为false，即复选框置空；
      isCheckAll, // 全选框是否全选
    }
  },
  computed: {
    cChecks: {
      get () {
        return getChecks(this.value);
      },
      set (checks) {
        let checkList = this.value;
        let checkedCount = checks.length;
        if (this.checkAll) {
          this.isCheckAll = checkedCount === checkList.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < checkList.length;
        }
        this.$emit('input', checkList.map(item => {
          return Object.assign(item, {
            isCheck: checks.includes(item.label)
          })
        }))
      }
    }
  },
  methods: {
    // 全选事件
    handleCheckAllChange (boolean) {
      let checkList = this.value;
      this.cChecks = boolean ? checkList.map(item => item.label) : [];
    }
  }
}
</script>

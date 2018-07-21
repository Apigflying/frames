<template>
  <el-table :data="tableData" v-bind="$attrs" @row-click="rowClick">
    <el-table-column v-for="(column,key) in tabelFormater" :key="key" :label="column.label" :sortable="!!column.sortable" :align="column.align || 'center'">
      <template slot-scope="props">
        <slot name="main-text" :props="{props,column}"></slot>
        <slot name="child-text" :props="{props,column}"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  inheritAttrs: false,
  props: ['tabelFormater', 'tableData'],
  methods:{
    rowClick(val){
      // 自定义事件无法直接触发状态的改变，所以需要挂载一层
      this.$emit('row-click',val)
    }
  }
};
</script>

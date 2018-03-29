<template>
  <div class="table-wrap">
    <el-table :data="detailTableData"  style="width: 100%" border>
      <el-table-column v-for="(item,index) in dataFormats" :key="index" :prop="item[0]" :label="item[1].text" :min-width="item[1].width"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync ="dialogPages.currentPage"
      :page-sizes="dialogPages.pageSizes"
      :page-size="dialogPages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dialogPages.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['dataFormat', 'dataTable', 'pagination'],
  data () {
    return {
      detailTableData: null,
    };
  },
  computed: {
    dataFormats () {
      return Object.entries(this.dataFormat);
    },
    dialogPages () {
      return Object.assign({//初始配置
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1,
        total: 0
      }, this.pagination);
    }
  },
  methods: {
    //弹窗内分页插件的事件
    handleSizeChange (val) {
      this.$emit('handleSizeChange', val);
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/base.scss";
</style>

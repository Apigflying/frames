<!-- table组件 -->
<template>
  <div class="custom_table" ref="tableparent">
    <slot name="custom"></slot>
    <el-table :data="options.tableData" style="width: 100%" @row-click="rowClick">
      <el-table-column v-for="(format,key) in options.tableFormat" :key="key" :prop="key" :label="format.value" :fixed="format.isFixed" :min-width="format.minWidth" :width="format.width">
        <!-- 如果tableFormat中value的格式是字符串，那么渲染字符串，否则是对象，渲染对象的value -->
        <!-- 如果value是object格式，会在里面定义width百分比，即当前列的宽度占比 -->
        <template slot-scope="scope">
          <!-- 详情 -->
          <span v-if="key==='detail'" @click="handleClick(scope.row)" class="detailBtn">{{scope.row.detail}}</span>
          <!-- 级别 -->
          <span v-else-if="key==='customrank'" :style="{color:setColorByRank(scope.row.customrank)}">
            {{scope.row.customrank}}
          </span>
          <!-- 状态 -->
          <span v-else-if="key==='status'" :style="{color:setColorByStatus(scope.row.status)}">
            {{scope.row.status}}
          </span>
          <!-- 开关 -->
          <span v-else-if="key==='setSwitch'">
            <el-switch on-color="#0090FF" off-color="#414373" active-icon-class="el-icon-check" on-text="" off-text="" v-model="scope.row.setSwitch" class="isScale" @change="changeSwitch(scope.row)"></el-switch>
          </span>
          <span v-else>
            {{ scope.row[key] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination class="paginations" ref="paginations" v-if="!!options.tablePagination&&!!options.tablePagination.pagination&&!!pageInfo.total" @size-change="_pageSizeChange" @current-change="_pageCurrentChange" :current-page.sync="pageInfo.currentPage" :page-sizes="pageInfo.pageSizes" :page-size="pageInfo.pageSize" :layout="pageInfo.layout" :total="pageInfo.total">
      <el-input v-model="currentPage" class="inputPage" @change="pagechange"></el-input>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    options: {
      type: Object,
      default: {
        isResRowClick: false,
        isHavePages: '',
        tableFormat: {},
        tableData: [],
      }
    }
  },
  data () {
    return {
      currentPage: 1,
      pageInfo: { //分页器配置
        pageSize: 10, //每页显示条数
        pageSizes: [10, 20, 50, 100],
        layout: 'prev,slot,total,next,sizes', // sizes: 显示共 400 条文字 ; total:
        total: 200, // 总数
        currentPage: 1, // 当前页
        params: {}
      }
    }
  },
  watch: {
    "options.tablePagination": {
      deep: true,
      handler (tablePagination) {
        if (!!tablePagination && tablePagination.pagination) {
          this.$nextTick(() => {
            this.pageInfo = Object.assign(this.pageInfo, tablePagination.pagination);
          })
        }
      }
    }
  },
  methods: {
    /*--------------------*\
          分页器事件
    \*--------------------*/
    _pageSizeChange (size) {
      // console.log(`每页显示${ size }条`);
      this.$emit('tableSizeChange', {
        size
      });
    },
    _pageCurrentChange (current) {
      // console.log(`当前是第${ current }页,类型是${type}`);
      let type = this.options.tablePagination.type;
      this.currentPage = current;
      this.$emit('tablePageChange', {
        type,
        current
      });
    },
    pagechange (current) {
      this._pageCurrentChange(current);
    },



    _setTableHeigth () {
      //如果有分页器，那么就将高度减去40
      // const pagination = !!this.options.isHavePages ? 26 : 0
      // this.tableHeight = this.$refs.tableparent.getBoundingClientRect().height - pagination
    },
    //-----------------------------------------------------
    //定制事件
    changeSwitch (val) { //开关改变状态
      this.$emit('changeSwitch', val)
    },
    rowClick (val) { //列表项点击查看详情
      if (!this.isResRowClick) {
        return false
      }
      console.log(val)
      this.$emit('columnVal', val)
    },
    //可以在pageChange中获取数据
    handleClick (row) {
      this.$emit('detailShow', row)
    }
  }
}
</script>

<style lang="scss">
@import '../../style/base';
.custom_table {
  width: 400px;
}
// 分页的样式
// .paginations {
//   display: flex;
//   align-items: center;
//   .inputPage {
//     width: 30px;
//     margin-right: 10px;
//     .el-input__inner {
//       // input输入框的圆角
//       width: 30px;
//       border-radius: 0;
//       padding: 0 5px;
//       vertical-align: baseline;
//     }
//   }
}
</style>

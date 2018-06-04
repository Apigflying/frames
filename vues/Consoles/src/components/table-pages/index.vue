<template>
<div class="custom_table" ref="tableparent">
   <!-- :show-header="!isShowHead" -->
  <el-table :data="tableData" style="width: 100%" :height="tableHeight" @row-click="rowClick">
    <el-table-column v-for="(value,key) in tableFormat" :key="key" :prop="key" :label="typeof value == 'string'?value:value.value" :fixed="isFixed(key)" :min-width="typeof value=='object'?value.width:''">
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
  <base-pagination v-if="!!isHavePages&&!!setPageInfo&&pageInfo.total&&showPageInfo" class="paginations" ref="changeBtns" @pageChanged="pageChange" :customconfig="pageInfo" :currentPages="pageInfo.currentPage" v-changeIconPage
  ></base-pagination>
</div>
</template>

<script>
import {
  mapActions
} from 'vuex';
export default {
  name: 'Table',
  /*
    tableData - 表格数据
    tableFormat - 表格格式
    isHavePages - 是否展示page切换
    isResRowClick - 是否响应鼠标单击事件，默认不响应
    setPageInfo - page信息对象
  */
  props: ['tableData', 'tableFormat', 'border', 'fixed', 'isHavePages', 'isResRowClick', 'setPageInfo'],
  data: function() {
    return {
      tableHeight: 0, //表格高度设置
      showPageInfo:true,
      pageInfo: { //分页器配置
        pageSize: 10, //每页显示条数
        layout: 'total, prev, pager, next',
        total: 0,
        currentPage: 1,
        params: {}
      },
    }
  },
  watch: {
    setPageInfo: {
      deep: true,
      handler(val) {
        if(val){
          this.showPageInfo = false
          this.$nextTick(()=>{
            this.showPageInfo = true
            this.pageInfo = Object.assign(this.pageInfo, val)
            this._setTableHeigth()
          })
        }
      }
    },
  },
  directives: {
    changeIconPage: {
      bind(el, binding) {
        var prevBtn = el.querySelector('.btn-prev').firstElementChild
        var nextBtn = el.querySelector('.btn-next').firstElementChild
        if (!!prevBtn && !!nextBtn) {
          prevBtn.classList.remove('el-icon-arrow-left')
          prevBtn.classList.add('el-icon-caret-left')
          nextBtn.classList.remove('el-icon-arrow-right')
          nextBtn.classList.add('el-icon-caret-right')
        }
      }
    }
  },
  methods: {
    _setTableHeigth(){
      //如果有分页器，那么就将高度减去40
        const pagination = !!this.isHavePages ? 26 : 0
        this.tableHeight = this.$refs.tableparent.getBoundingClientRect().height - pagination
    },
    //-----------------------------------------------------
    //定制事件
    changeSwitch(val) { //开关改变状态
      this.$emit('changeSwitch', val)
    },
    rowClick(val) { //列表项点击查看详情
      if (!this.isResRowClick) {
        return false
      }
      console.log(val)
      this.$emit('columnVal', val)
    },
    //可以在pageChange中获取数据
    pageChange(page) {
      this.pageInfo.currentPage = page
      const currentTable = this.isHavePages
      switch (currentTable) {
        case 'rgfw':
          break;
        case 'fjgp':
          console.log('fjgp' + page)
          break;
        case 'xfjsbh':
          console.log('xfjsbh' + page)
          break;
          //报警设置
        case 'bjsz':
          console.log('bjsz' + page)
          break;
      }
      this.$emit('tablePageChange', {
        page,
        type: currentTable
      })
    },
    handleClick(row) {
      this.$emit('detailShow', row)
    },
    //-----------------------------------------------------
    //改变文字样式（颜色）
    setColorByStatus(val) {
      if (val === '报警') {
        return '#E34156 '
      } else {
        return '#0090FF'
      }
    },
    setColorByRank(val) { //根据不同文字设置不同的样式颜色
      if (val === 'S' || val === 'A') {
        return '#E34156 '
      } else if (val === 'B') {
        return '#FD9055'
      } else if (val === 'D') {
        return '#D6AF11'
      }

    },
    isFixed(key) {
      let fixed = this.fixed
      if (!fixed) return false
      if (typeof fixed === 'string') {
        return key === fixed
      } else {
        const len = fixed.filter(item => {
          return item == key
        }).length
        return !!len
      }
    }
  },
  mounted(){
    this._setTableHeigth()
  }
}
</script>

<style lang="scss">
@import '../../style/base';
.custom_table {

}
</style>

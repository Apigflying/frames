<template>
<div class="echarts_test">
  <!-- <charts class="charts" id="line1" key="line1" :renderData="renderLine1"/> -->
</div>
</template>

<script>
// 引入封装的echarts的组件
import Charts from 'components/echarts'
// 在没有数据的时候，默认的数据展示（只能把坐标系或部分默认数据展示出来）
import renderScatter1 from './scatter1'
// 折线图
import renderLine1 from './line1'
export default {
  name: 'echarts_test',
  components: {
    Charts
  },
  data: function () {
    return {
      renderLine1,
      renderScatter1, // 需要在这指定，不能直接用import的数据
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
@import "~style/base";
.echarts_test {
  .charts {
    @include wh(500px, 500px);
    border: 1px solid red;
  }
}
</style>
